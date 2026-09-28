import { mountLivePreview } from "./live-preview.tsx";

const categoryOrder = ["All components", "Buttons", "Cards", "Forms & overlays", "Motion", "Effects & UI", "Templates", "Admin"];
const categoryIcons = {
  "All components": "◫",
  Buttons: "↗",
  Cards: "▤",
  "Forms & overlays": "⌘",
  Motion: "✳",
  "Effects & UI": "◉",
  Templates: "▦",
  Admin: "⌁",
};

const elements = {
  search: document.querySelector("#component-search"),
  nav: document.querySelector("#category-nav"),
  count: document.querySelector("#library-count"),
  category: document.querySelector("#breadcrumb-category"),
  selectedCategory: document.querySelector("#selected-category"),
  selectedPath: document.querySelector("#selected-path"),
  preview: document.querySelector("#component-preview"),
  previewPanel: document.querySelector("#preview-panel"),
  codePanel: document.querySelector("#code-panel"),
  previewTab: document.querySelector("#preview-tab"),
  codeTab: document.querySelector("#code-tab"),
  code: document.querySelector("#source-code"),
  codeFilename: document.querySelector("#code-filename"),
  copy: document.querySelector("#copy-code"),
  name: document.querySelector("#component-name"),
  description: document.querySelector("#component-description"),
  index: document.querySelector("#component-index"),
  grid: document.querySelector("#component-grid"),
  resultCount: document.querySelector("#results-count"),
  toast: document.querySelector("#toast"),
};

let library = [];
let activeCategory = "All components";
let selected = null;
let selectedSource = "";
let toastTimer;

const descriptions = {
  button: "A polymorphic action control with size and tone variants, focus treatment, and native disabled behavior.",
  "interactive-hover-button": "A pill-shaped action that expands its accent dot on hover, then shifts its label to reveal the arrow. Click to preview loading and success states.",
  "AuthRequiredModal": "A sign-in gate with a clear call to action and a focused overlay layout.",
  "Toast": "A concise, timed status message with optional image and logo content.",
  "SearchBox": "A component and template search field with keyboard-driven suggestions.",
  "DragDropUpload": "A file picker and drop zone with accepted types, progress, and file list feedback.",
  "OtpCodeInput": "A segmented verification code input with keyboard navigation and paste support.",
  "PasswordStrengthMeter": "A password field with live strength and criteria feedback.",
  "SignaturePad": "A canvas-based signature surface with pen width, undo, and erase controls.",
  "Skeleton": "Loading placeholders and ready-made layouts for common page sections.",
  "LiquidGlassCard": "A glass-effect card with configurable glow and elevation.",
  "CustomPricingCard": "A pricing configurator for category and plan selection.",
  "CardCascade": "A scroll-driven stack of skill cards for portfolio storytelling.",
  "RotatingText": "A split-text label that cycles through a sequence with configurable stagger.",
  "RandomLetterSwap": "An interactive letter treatment that swaps characters on hover.",
  "TextPath": "Text arranged along a path with adjustable type styling.",
};

function humanize(name) {
  return name
    .replace(/([a-z])(\d+[A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
    .replace(/\bUi\b/g, "UI")
    .replace(/\bOtp\b/g, "OTP")
    .replace(/\bSvg\b/g, "SVG")
    .replace(/\b3 D\b/g, "3D");
}

function describe(item) {
  if (descriptions[item.name]) return descriptions[item.name];
  const categoryDescriptions = {
    Buttons: "An expressive button pattern for focused actions and interaction states.",
    Cards: "A self-contained card pattern with a distinct composition and visual treatment.",
    "Forms & overlays": "An interaction pattern for collecting input or surfacing important information.",
    Motion: "A focused motion example with typed options in the source file.",
    "Effects & UI": "A visual effect or interface pattern that can be composed into a larger experience.",
    Templates: "A complete page or section composition intended as a starting point.",
    Admin: "A dashboard or admin interface building block.",
  };
  return categoryDescriptions[item.category] || "A reusable interface building block from the Component Vault.";
}

function visibleItems() {
  const normalize = (value) => value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().replace(/[-_.\\/]+/g, " ").replace(/\s+/g, " ").trim();
  const query = normalize(elements.search.value);
  return library.filter((item) => {
    const matchesCategory = activeCategory === "All components" || item.category === activeCategory;
    const matchesSearch = !query || normalize(`${item.name} ${item.source} ${item.category}`).includes(query);
    return matchesCategory && matchesSearch;
  });
}

function renderNavigation() {
  const counts = new Map(categoryOrder.map((category) => [category, 0]));
  counts.set("All components", library.length);
  for (const item of library) counts.set(item.category, (counts.get(item.category) || 0) + 1);

  elements.nav.replaceChildren();
  for (const category of categoryOrder) {
    if (category !== "All components" && counts.get(category) === 0) continue;
    const button = document.createElement("button");
    button.className = `category-button${activeCategory === category ? " is-active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-current", activeCategory === category ? "page" : "false");
    button.innerHTML = `<span class="category-icon" aria-hidden="true">${categoryIcons[category]}</span><span>${category}</span><span class="category-count">${counts.get(category)}</span>`;
    button.addEventListener("click", () => {
      activeCategory = category;
      elements.category.textContent = category === "All components" ? "Components" : category;
      renderNavigation();
      renderGrid();
    });
    elements.nav.append(button);
  }
}

function renderGrid() {
  const items = visibleItems();
  elements.resultCount.textContent = `${items.length} ${items.length === 1 ? "result" : "results"}`;
  elements.grid.replaceChildren();

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No components match that search. Try another name or category.";
    elements.grid.append(empty);
    return;
  }

  for (const [index, item] of items.entries()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `component-card${selected?.id === item.id ? " is-selected" : ""}`;
    button.setAttribute("aria-pressed", selected?.id === item.id ? "true" : "false");
    button.innerHTML = `<span class="card-preview ${previewKind(item)}">${miniPreview(item)}</span><span class="card-meta"><span><strong>${humanize(item.name)}</strong><small>${item.category}</small></span><span class="card-arrow" aria-hidden="true">↗</span></span>`;
    button.addEventListener("click", () => selectComponent(item));
    elements.grid.append(button);
    if (index > 40 && items.length > 80) button.classList.add("card-lazy");
  }
}

function previewKind(item) {
  if (item.category === "Buttons") return "mini-button";
  if (item.category === "Cards") return "mini-card";
  if (item.category === "Forms & overlays") return "mini-form";
  if (item.category === "Motion") return "mini-motion";
  if (item.category === "Templates") return "mini-template";
  if (item.category === "Admin") return "mini-admin";
  return "mini-effect";
}

function miniPreview(item) {
  if (item.category === "Buttons") return `<span class="mini-button-shape">${humanize(item.name).split(" ")[0]}</span>`;
  if (item.category === "Cards") return '<span class="mini-card-shape"><i></i><i></i><i></i></span>';
  if (item.category === "Forms & overlays") return '<span class="mini-input-shape"></span><span class="mini-input-shape short"></span>';
  if (item.category === "Motion") return '<span class="mini-orbit"><i></i><i></i><i></i></span>';
  if (item.category === "Templates") return '<span class="mini-template-shape"><i></i><i></i></span>';
  if (item.category === "Admin") return '<span class="mini-bars"><i></i><i></i><i></i><i></i><i></i></span>';
  return '<span class="mini-glow"></span><span class="mini-grid"></span>';
}

function demoContent(item) {
  if (item.name === "interactive-hover-button") {
    return `<div class="demo demo-interactive-button"><span class="demo-eyebrow">INTERACTIVE HOVER BUTTON</span><h3>One action. A little <span>momentum.</span></h3><p>Hover to watch the accent bloom. Click to play the loading and success states.</p><div class="interactive-stage" data-variant="default"><button class="interactive-hover-demo" type="button" data-component-action="submit" aria-label="Button; click to preview loading and success states"><span class="ih-dot" aria-hidden="true"></span><span class="ih-rest">Button</span><span class="ih-hover"><span class="ih-label">Button</span><span class="ih-icon" aria-hidden="true">→</span></span><span class="ih-feedback" aria-live="polite"></span></button></div><div class="variant-switcher" role="group" aria-label="Button color variant"><button type="button" data-ih-variant="default" aria-pressed="true">Default</button><button type="button" data-ih-variant="neon" aria-pressed="false">Neon</button><button type="button" data-ih-variant="dark" aria-pressed="false">Dark</button><button type="button" data-ih-variant="sparkle" aria-pressed="false">Sparkle</button></div><div class="demo-caption interaction-hints"><span>HOVER OR FOCUS TO REVEAL</span><span>CLICK TO PLAY STATUS</span></div></div>`;
  }
  if (item.category === "Buttons") {
    const key = item.name.toLowerCase();
    const style = key.includes("liquid") ? "liquid" : key.includes("galaxy") || key.includes("orbit") ? "cosmic" : key.includes("rainbow") || key.includes("glow") || key.includes("radial") ? "glow" : key.includes("corner") ? "corner" : key.includes("creepy") ? "creepy" : key.includes("payment") ? "payment" : key.includes("marquee") ? "marquee" : "classic";
    const label = key.includes("payment") ? "Pay $24.00" : key.includes("marquee") ? "DISCOVER THE COLLECTION ↗" : key.includes("creepy") ? "DON'T LOOK AWAY" : key.includes("orbit") ? "EXPLORE ORBIT" : key.includes("liquid") ? "Get started" : "Get started";
    return `<div class="demo demo-button-study" data-button-style="${style}"><span class="demo-eyebrow">LIVE BUTTON STUDY · HOVER / PRESS</span><div class="button-showcase"><button class="showcase-button" data-demo-action><span class="button-sheen"></span><span class="button-label">${label}</span><span class="button-trail" aria-hidden="true">↗</span></button><div class="button-orbit" aria-hidden="true"><i></i><i></i><i></i></div></div><div class="button-specimen"><div><span>RESTING</span><button class="spec-button" data-demo-action>${label}</button></div><div><span>FOCUS</span><button class="spec-button focused" data-demo-action>Explore <b>↗</b></button></div><div><span>DISABLED</span><button class="spec-button" disabled>Unavailable</button></div></div></div>`;
  }
  if (item.category === "Cards") {
    const name = item.name.toLowerCase();
    const theme = name.includes("pricing") ? "pricing" : name.includes("testimonial") ? "quote" : name.includes("cascade") ? "cascade" : name.includes("beam") ? "beam" : "feature";
    return `<div class="demo-card-stage" data-card-style="${theme}"><article class="visual-card"><div class="visual-card-art" aria-hidden="true"><i></i><i></i><i></i><span></span></div><div class="visual-card-content"><span class="demo-eyebrow">${humanize(item.name).toUpperCase()} · STUDIO SERIES</span><h3>${theme === "pricing" ? "One plan. Room to grow." : theme === "quote" ? "“Make the complex feel effortless.”" : theme === "cascade" ? "A little more<br>perspective." : "Make room for<br>the good ideas."}</h3><p>${theme === "pricing" ? "Everything you need to get started." : theme === "quote" ? "— Alex Morgan, Creative Director" : "Thoughtful details. Built to be remembered."}</p></div><div class="visual-card-bottom"><span>${theme === "pricing" ? "$24 <small>/ month</small>" : "FIELD NOTES · 04"}</span><button type="button" data-demo-action aria-label="Open card">↗</button></div></article>${theme === "cascade" ? `<div class="cascade-back"></div><div class="cascade-front"></div>` : ""}</div>`;
  }
  if (item.category === "Forms & overlays") {
    const key = item.name.toLowerCase();
    const variant = key.includes("otp") ? "otp" : key.includes("password") ? "password" : key.includes("upload") ? "upload" : key.includes("signature") ? "signature" : key.includes("modal") || key.includes("overlay") ? "modal" : key.includes("cookie") ? "cookie" : key.includes("search") ? "search" : key.includes("toast") || key.includes("notification") ? "notice" : "form";
    const content = variant === "otp" ? `<label class="sample-label">Verification code</label><div class="otp-row">${[4, 8, 2, 1, 0, 6].map((n, i) => `<span class="otp-cell ${i === 2 ? "active" : ""}">${n}</span>`).join("")}</div><div class="field-hint"><span class="hint-check">✓</span> Code sent to d•••@mail.com</div>` : variant === "password" ? `<label class="sample-label">Create password</label><div class="password-field">••••••••••••<span>◉</span></div><div class="strength-meter"><i></i><i></i><i></i><i></i></div><div class="field-hint">Strong password · 3 of 3 checks</div>` : variant === "upload" ? `<div class="drop-zone"><span>↑</span><strong>Drop your files here</strong><small>or browse · PNG, JPG, PDF · max 20 MB</small></div>` : variant === "signature" ? `<div class="signature-area"><span>Sign here</span><b>Alex Morgan</b></div><small class="sign-hint">DRAW YOUR SIGNATURE</small>` : variant === "search" ? `<div class="search-field"><span>⌕</span>Search components, templates...<kbd>⌘ K</kbd></div><div class="search-result"><span>↗</span><div><b>Gradient Orb</b><small>Effects & UI · components/ui</small></div><kbd>↵</kbd></div>` : variant === "notice" ? `<div class="notice-card"><span>✓</span><div><b>All changes saved</b><small>Your workspace is up to date.</small></div><button data-demo-action aria-label="Dismiss">×</button></div>` : variant === "cookie" ? `<div class="cookie-card"><b>We value your privacy</b><p>Cookies help us improve your experience.</p><button data-demo-action>Accept all</button><a>Manage</a></div>` : `<label class="sample-label">Email address</label><input class="sample-input" type="email" value="maker@example.com" aria-label="Email address"/><div class="field-hint"><span class="hint-check">✓</span> Looks good. You’re all set.</div><button class="demo-button primary form-submit" data-demo-action>Continue <span aria-hidden="true">→</span></button>`;
    return `<div class="demo-form-shell" data-form-style="${variant}"><div class="form-heading"><span class="form-icon">${variant === "upload" ? "↑" : variant === "otp" ? "⌑" : variant === "search" ? "⌕" : "✳"}</span><span class="demo-eyebrow">${humanize(item.name).toUpperCase()}</span></div><h3>${variant === "otp" ? "Check your inbox." : variant === "upload" ? "Add your files." : variant === "password" ? "Secure your account." : variant === "signature" ? "Make it official." : variant === "search" ? "Find your next idea." : variant === "notice" ? "A little peace of mind." : variant === "cookie" ? "Your privacy, your choice." : "Welcome back."}</h3><p>${variant === "otp" ? "Enter the six digit code we just sent." : variant === "upload" ? "Keep everything in one place." : variant === "search" ? "Jump straight to a component." : "A focused, comfortable interaction."}</p><div class="form-body">${content}</div></div>`;
  }
  if (item.category === "Motion") {
    const key = item.name.toLowerCase();
    const mode = key.includes("path") ? "path" : key.includes("pixel") ? "pixel" : key.includes("swap") || key.includes("scramble") ? "scramble" : key.includes("smoky") || key.includes("vapor") ? "smoke" : key.includes("scroll") ? "scroll" : key.includes("social") ? "social" : key.includes("rolling") ? "rolling" : "rotate";
    const art = mode === "path" ? `<svg class="type-path" viewBox="0 0 420 130" aria-label="Text following a curve"><defs><path id="arc" d="M25 110 C100 -10 320 -10 395 110"/></defs><text><textPath href="#arc" startOffset="50%" text-anchor="middle">FOLLOW YOUR CURIOSITY · FOLLOW YOUR CURIOSITY ·</textPath></text></svg>` : mode === "pixel" ? `<div class="pixel-word">PIXEL<span>DRIFT</span></div>` : mode === "scramble" ? `<div class="scramble-word">D<span>ESIGN</span><i>_</i></div>` : mode === "smoke" ? `<div class="smoke-word">Breathe<span> in.</span></div>` : mode === "scroll" ? `<div class="scroll-copy">Create with <strong>intention</strong><br>and let the details <strong>shine</strong><span>SCROLL TO EXPLORE ↓</span></div>` : mode === "social" ? `<div class="social-pills"><span>in</span><span>◎</span><span>𝕏</span><span>↗</span></div>` : mode === "rolling" ? `<div class="rolling-stack"><span>Good ideas</span><span>move <b>forward</b></span><span>one detail at a time.</span></div>` : `<div class="rotate-lockup">Make it <b>matter.</b><i>Good design · Better motion · Less noise</i></div>`;
    return `<div class="motion-stage" data-motion-style="${mode}"><span class="demo-eyebrow">ANIMATED TYPE STUDY · ${humanize(item.name).toUpperCase()}</span><div class="motion-art">${art}</div><div class="motion-footer"><span>HOVER TO REPLAY</span><span>STAGGER · 32MS&nbsp;&nbsp; / &nbsp;&nbsp;EASE OUT</span></div></div>`;
  }
  if (item.category === "Templates") {
    return templatePreview(item);
  }
  if (item.category === "Admin") {
    return `<div class="demo demo-admin"><div><span class="demo-eyebrow">OVERVIEW · LAST 7 DAYS</span><h3>Everything’s moving.</h3></div><div class="chart-stats"><div><small>Requests</small><strong>24,891</strong><em>↑ 12.8%</em></div><div><small>Success rate</small><strong>99.4%</strong><em>↑ 0.6%</em></div></div><div class="chart-bars" aria-label="Requests over the last week">${[28, 42, 35, 63, 47, 78, 56, 92, 68, 84, 50, 71].map((height, index) => `<i style="--bar:${height}%;--bar-index:${index}"></i>`).join("")}</div><div class="chart-labels"><span>MON</span><span>WED</span><span>FRI</span><span>SUN</span></div></div>`;
  }
  return effectPreview(item);
}

function templatePreview(item) {
  const key = item.name.toLowerCase();
  const kind = key.includes("poster") ? "poster" : key.includes("portfolio") ? "portfolio" : key.includes("interior") ? "interior" : key.includes("footer") ? "footer" : key.includes("agency") ? "agency" : key.includes("love") || key.includes("app") ? "app" : key.includes("lumos") ? "lumos" : key.includes("arena") ? "arena" : "hero";
  return `<div class="template-stage" data-template-style="${kind}"><div class="landing-preview"><div class="landing-nav"><b>${kind === "lumos" ? "LUMOS®" : kind === "interior" ? "FORM / FIELD" : kind === "app" ? "loveable" : "STUDIO NORTH"}</b><span>WORK&nbsp;&nbsp;&nbsp; ABOUT&nbsp;&nbsp;&nbsp; CONTACT</span><button data-demo-action aria-label="Open menu">↗</button></div><div class="landing-body"><span class="demo-eyebrow">${humanize(item.name).toUpperCase()} · 2025</span><h3>${kind === "poster" ? "THE NIGHT<br><em>IS YOUNG.</em>" : kind === "interior" ? "Spaces that<br><em>feel like home.</em>" : kind === "app" ? "Make room for<br><em>what matters.</em>" : kind === "arena" ? "MAKE SOME<br><em>NOISE.</em>" : kind === "footer" ? "A good ending<br><em>starts here.</em>" : kind === "lumos" ? "ILLUMINATE<br><em>WHAT'S NEXT.</em>" : "Design for<br><em>what's next.</em>"}</h3><p>Independent creative studio<br>for ideas with a point of view.</p><button class="landing-cta" data-demo-action>Explore the work <span>↗</span></button></div><div class="landing-art" aria-hidden="true"><i></i><i></i><i></i><span>01</span></div><div class="landing-foot"><span>NEW YORK · EVERYWHERE</span><span>SCROLL TO EXPLORE ↓</span></div></div></div>`;
}

function effectPreview(item) {
  const key = item.name.toLowerCase();
  const groups = [
    [/black.?hole|vortex|gravity/, "gravity"], [/galaxy|solar|star|space|cosmic|orbit|planet/, "cosmos"], [/ocean|water|rain|storm|swell|wave/, "water"], [/cursor|mouse|target|heart|lizard|venom|magic/, "cursor"], [/grid|matrix|beam|lattice|isometric|kinetic/, "grid"], [/orb|aura|glow|bloom|morph|glass|nebula|aurora/, "orb"], [/cube|3d|carousel|slider|scroll|portal/, "depth"], [/loader|progress|hourglass|particle/, "particles"], [/image|gallery|collage|tendril|spiral/, "gallery"], [/footer|navbar|logo|header|badge/, "surface"], [/toast|modal|upload|input|search|auth|cookie|notification|password|otp|signature/, "interface"], [/ascii|pixel|hacker|smoke|ember|hell|fire/, "texture"]
  ];
  const kind = (groups.find(([pattern]) => pattern.test(key)) || [null, "light"]).at(1);
  const dots = Array.from({ length: kind === "particles" || kind === "cosmos" ? 24 : 16 }, (_, i) => `<i style="--i:${i};--x:${(i * 37 + 11) % 100}%;--y:${(i * 61 + 7) % 100}%"></i>`).join("");
  return `<div class="effect-stage" data-effect-style="${kind}"><div class="effect-label"><span class="demo-eyebrow">${humanize(item.name).toUpperCase()}</span><span class="effect-live"><i></i> CSS STUDY</span></div><div class="effect-scene" aria-label="Animated visual preview"><div class="effect-grid"></div><div class="effect-graphic"><div class="effect-core"></div><div class="effect-ring one"></div><div class="effect-ring two"></div><div class="effect-ring three"></div><div class="effect-landscape"></div><div class="effect-cursor">↗</div>${dots}</div><div class="effect-sidecopy"><strong>${kind === "gravity" ? "01" : kind === "water" ? "02" : kind === "cursor" ? "03" : "0" + (item.name.length % 8 + 1)}</strong><span>VISUAL<br>EXPERIMENT</span></div></div><div class="effect-footer"><span>HOVER TO REPLAY</span><span>ANIMATED SAMPLE</span></div></div>`;
}

async function selectComponent(item) {
  selected = item;
  selectedSource = "";
  const position = visibleItems().findIndex((candidate) => candidate.id === item.id) + 1;
  elements.selectedCategory.textContent = item.category.toUpperCase();
  elements.selectedPath.textContent = item.source;
  elements.name.textContent = humanize(item.name);
  elements.description.textContent = describe(item);
  elements.index.textContent = `${String(position).padStart(2, "0")} / ${library.length}`;
  elements.preview.innerHTML = demoContent(item);
  const fallback = elements.preview.innerHTML;
  const isLive = await mountLivePreview(elements.preview, item.source, fallback);
  elements.previewPanel.querySelector(".preview-caption").textContent = isLive ? "LIVE COMPONENT" : `VISUAL STUDY · ${elements.preview.dataset.previewError || "not live"}`;
  elements.code.textContent = "Loading source…";
  elements.codeFilename.textContent = item.source.split("/").at(-1);
  elements.preview.setAttribute("aria-label", `${humanize(item.name)} preview sample`);
  renderGrid();

  try {
    const response = await fetch(`/__source/${item.source.split("/").map(encodeURIComponent).join("/")}`);
    if (!response.ok) throw new Error(`Source request returned ${response.status}`);
    selectedSource = await response.text();
    if (selected?.id === item.id) elements.code.textContent = selectedSource;
  } catch {
    if (selected?.id === item.id) elements.code.textContent = "Could not load this source file.";
  }
}

function setView(view) {
  const code = view === "code";
  elements.previewPanel.hidden = code;
  elements.codePanel.hidden = !code;
  elements.previewTab.classList.toggle("is-active", !code);
  elements.codeTab.classList.toggle("is-active", code);
  elements.previewTab.setAttribute("aria-selected", String(!code));
  elements.codeTab.setAttribute("aria-selected", String(code));
  (code ? elements.codeTab : elements.previewTab).focus();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { elements.toast.hidden = true; }, 2400);
}

elements.previewTab.addEventListener("click", () => setView("preview"));
elements.codeTab.addEventListener("click", () => setView("code"));
elements.preview.addEventListener("live-preview-error", (event) => {
  if (selected) elements.previewPanel.querySelector(".preview-caption").textContent = `VISUAL STUDY · ${event.detail}`;
});
elements.search.addEventListener("input", renderGrid);
elements.preview.addEventListener("click", (event) => {
  const variant = event.target.closest("[data-ih-variant]");
  if (variant) {
    const stage = elements.preview.querySelector(".interactive-stage");
    stage.dataset.variant = variant.dataset.ihVariant;
    elements.preview.querySelectorAll("[data-ih-variant]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button === variant));
    });
    return;
  }
  const interactiveButton = event.target.closest("[data-component-action='submit']");
  if (interactiveButton && !interactiveButton.classList.contains("is-loading")) {
    const label = interactiveButton.querySelector(".ih-label");
    const feedback = interactiveButton.querySelector(".ih-feedback");
    interactiveButton.classList.add("is-loading");
    label.textContent = "Processing…";
    const loadingTimer = setTimeout(() => {
      if (!interactiveButton.isConnected) return;
      interactiveButton.classList.remove("is-loading");
      interactiveButton.classList.add("is-success");
      label.textContent = "Complete!";
      feedback.textContent = "Complete!";
      setTimeout(() => {
        if (!interactiveButton.isConnected) return;
        interactiveButton.classList.remove("is-success");
        label.textContent = "Button";
        feedback.textContent = "";
      }, 3000);
    }, 900);
    interactiveButton.dataset.timer = String(loadingTimer);
    return;
  }
  if (event.target.closest("[data-demo-action]")) showToast("Preview interaction — open Source code to make it yours.");
});
elements.preview.addEventListener("mouseover", (event) => {
  const button = event.target.closest("[data-demo-action]");
  if (button) button.classList.add("is-hover");
});
elements.preview.addEventListener("mouseout", (event) => {
  const button = event.target.closest("[data-demo-action]");
  if (button && !button.contains(event.relatedTarget)) button.classList.remove("is-hover");
});
elements.copy.addEventListener("click", async () => {
  if (!selectedSource) return;
  try {
    await navigator.clipboard.writeText(selectedSource);
    showToast("Component source copied to clipboard.");
  } catch {
    showToast("Clipboard access is unavailable in this browser.");
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    elements.search.focus();
  }
  if (event.key === "Escape" && document.activeElement === elements.search) {
    elements.search.value = "";
    renderGrid();
    elements.search.blur();
  }
});

(async function initializeLibrary() {
  try {
    const response = await fetch("/api/components");
    if (!response.ok) throw new Error(`Library request returned ${response.status}`);
    library = await response.json();
    library.sort((a, b) => a.name.localeCompare(b.name));
    const preferred = library.find((item) => item.source === "components/ui/interactive-hover-button.tsx") || library.find((item) => item.source === "components/ui/button.tsx") || library[0];
    elements.count.textContent = `${library.length} components · ${new Set(library.map((item) => item.category)).size} collections`;
    renderNavigation();
    renderGrid();
    if (preferred) selectComponent(preferred);
  } catch (error) {
    elements.count.textContent = "Library could not be loaded";
    elements.grid.innerHTML = '<p class="empty-state">The component index is unavailable. Restart the local server and refresh.</p>';
    console.error(error);
  }
})();

