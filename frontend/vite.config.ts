import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(frontendRoot, "..");
const frontendPackage = JSON.parse(await readFile(path.join(frontendRoot, "package.json"), "utf8"));
const dependencyAliases = Object.keys(frontendPackage.dependencies).map((name) => ({
  find: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=/|$)`),
  replacement: path.resolve(frontendRoot, "node_modules", name),
}));

function componentApi(): Plugin {
  async function components(folder = "components"): Promise<Array<{id:string;name:string;category:string;group:string;source:string}>> {
    const dir = path.join(projectRoot, folder);
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return [];
    }
    const found = [];
    for (const entry of entries) {
      const rel = path.posix.join(folder.replaceAll(path.sep, "/"), entry.name);
      if (entry.isDirectory()) found.push(...await components(rel));
      else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        const file = entry.name.toLowerCase();
        let category = "Effects & UI";
        if (rel.startsWith("components/animations/")) category = "Motion";
        else if (rel.startsWith("components/templates/")) category = "Templates";
        else if (rel.startsWith("components/admin/")) category = "Admin";
        else if (/button/.test(file)) category = "Buttons";
        else if (/card|badge/.test(file)) category = "Cards";
        else if (/input|search|upload|password|otp|signature|toast|modal|cookie|notification|checkout/.test(file)) category = "Forms & overlays";
        const baseName = entry.name.replace(/\.tsx$/, "");
        const name = baseName === "index" ? rel.split("/").at(-2) || "Index" : baseName;
        found.push({ id: rel, name, category, group: rel.split("/")[1] || "ui", source: rel });
      }
    }
    return found;
  }
  return {
    name: "component-vault-local-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        if (url.pathname === "/api/components") {
          try { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(await components())); }
          catch (error) { res.statusCode = 500; res.end(String(error)); }
          return;
        }
        let filePath: string | undefined;
        if (url.pathname.startsWith("/__source/")) filePath = path.resolve(projectRoot, decodeURIComponent(url.pathname.slice("/__source/".length)));
        else if (url.pathname === "/__docs/design-system") filePath = path.join(projectRoot, "DESIGN_SYSTEM.md");
        if (filePath) {
          if (!filePath.startsWith(projectRoot + path.sep)) { res.statusCode = 403; res.end("Forbidden"); return; }
          try { res.setHeader("Content-Type", filePath.endsWith(".tsx") ? "text/plain; charset=utf-8" : "text/markdown; charset=utf-8"); res.end(await readFile(filePath)); }
          catch { res.statusCode = 404; res.end("Not found"); }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: frontendRoot,
  plugins: [react(), tailwindcss(), componentApi()],
  resolve: { alias: [{ find: /^@\//, replacement: projectRoot + "/" }, ...dependencyAliases] },
  server: { host: "127.0.0.1", fs: { allow: [projectRoot] } },
  build: { outDir: path.join(projectRoot, "dist"), emptyOutDir: true },
});
