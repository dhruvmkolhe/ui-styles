import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(frontendRoot, "..");
const port = Number(process.env.PORT || 5173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ts": "text/plain; charset=utf-8",
  ".tsx": "text/plain; charset=utf-8",
};

function categoryFor(filePath) {
  const normalized = filePath.toLowerCase();
  const file = path.basename(normalized);
  if (normalized.startsWith("components/animations/")) return "Motion";
  if (normalized.startsWith("components/templates/")) return "Templates";
  if (normalized.startsWith("components/admin/")) return "Admin";
  if (/button/.test(file)) return "Buttons";
  if (/card|badge/.test(file)) return "Cards";
  if (/input|search|upload|password|otp|signature|toast|modal|cookie|notification|checkout/.test(file)) return "Forms & overlays";
  return "Effects & UI";
}

async function collectComponents(folder = "components") {
  const absoluteFolder = path.join(projectRoot, folder);
  const entries = await readdir(absoluteFolder, { withFileTypes: true });
  const components = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(folder.replaceAll(path.sep, "/"), entry.name);
    if (entry.isDirectory()) {
      components.push(...(await collectComponents(relativePath)));
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".tsx")) continue;
    const sourcePath = relativePath.replaceAll(path.sep, "/");
    const displayName = entry.name.replace(/\.tsx$/, "");
    components.push({
      id: sourcePath,
      name: displayName === "index" ? path.posix.basename(path.posix.dirname(sourcePath)) : displayName,
      category: categoryFor(sourcePath),
      group: sourcePath.split("/")[1] || "ui",
      source: sourcePath,
    });
  }

  return components;
}

function send(response, status, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
  });
  response.end(body);
}

function resolveProjectFile(relativePath) {
  const absolutePath = path.resolve(projectRoot, relativePath);
  const rootPrefix = `${projectRoot}${path.sep}`;
  if (absolutePath !== projectRoot && !absolutePath.startsWith(rootPrefix)) return null;
  return absolutePath;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    if (request.method !== "GET" && request.method !== "HEAD") {
      send(response, 405, "Method not allowed");
      return;
    }

    if (url.pathname === "/api/components") {
      const components = await collectComponents();
      send(response, 200, JSON.stringify(components), "application/json; charset=utf-8");
      return;
    }

    let relativePath;
    if (url.pathname === "/" || url.pathname === "/index.html") {
      relativePath = "frontend/index.html";
    } else if (url.pathname.startsWith("/frontend/") || url.pathname.startsWith("/components/")) {
      relativePath = decodeURIComponent(url.pathname.slice(1));
    } else if (url.pathname === "/DESIGN_SYSTEM.md") {
      relativePath = "DESIGN_SYSTEM.md";
    } else {
      send(response, 404, "Not found");
      return;
    }

    const absolutePath = resolveProjectFile(relativePath);
    if (!absolutePath) {
      send(response, 403, "Forbidden");
      return;
    }
    const fileStat = await stat(absolutePath).catch(() => null);
    if (!fileStat?.isFile()) {
      send(response, 404, "Not found");
      return;
    }
    const extension = path.extname(absolutePath).toLowerCase();
    if (!mimeTypes[extension]) {
      send(response, 403, "File type not served");
      return;
    }
    const body = request.method === "HEAD" ? "" : await readFile(absolutePath);
    send(response, 200, body, mimeTypes[extension]);
  } catch (error) {
    send(response, 500, error instanceof Error ? error.message : "Server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Component Vault ready at http://localhost:${port}\n`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
