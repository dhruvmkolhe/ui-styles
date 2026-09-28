export type VaultCategory =
  | "Buttons / Hover Effects" | "Text Animations" | "Visual Effects" | "Image Interaction"
  | "3D Design" | "Backgrounds" | "Interactive Background" | "Cursor Effects"
  | "Scroll Animation" | "Option Wheel Loaders" | "Navbars" | "Footers" | "Forms & Inputs";

export type VaultItem = { name: string; slug: string; category: VaultCategory; isNew: boolean; tags: string[] };

const groups: Array<[VaultCategory, string[]]> = [
  ["Buttons / Hover Effects", ["Corner Border*","Corner Button*","Creepy Button*","Radial Glow Button*","Border Beam","Glow Button","Marquee Hover","Payment Transaction","Magic Card Effect","Rainbow Button","Social Tooltip Hover Buttons","Orbit Button","Galaxy Button","Interactive Hover Button","Super Mario"]],
  ["Text Animations", ["Mesh Text Hover*","Pixel Drift*","Random Letter Swap*","Rolling Letters*","Scramble Text*","Scroll Text Highlight*","Smoky Text*","Text Carousel*","Text Path*","Text Vaporize*","Letter Pull Up*","Scale Letter*","Separate Away*","Wavy Text*","Word Pull Up*","Crossfade Typewriter*","UI HUB Wordmark*"]],
  ["Visual Effects", ["Liquid Glass","Spotlight Cards","Image Reveal","Neon Border*"]],
  ["Image Interaction", ["Spiral Images*","Infinity Image*","Card Cascade*","Image Trail","Perspective Carousel","Diagonal Carousel","Testimonials Card","Image Collage","Image Lens Magnifier*","Image Compare Slider*","Ripple Signature Ledger*","Driftwood Gallery"]],
  ["3D Design", ["3D Hero","3D Scroll Animation","3D Slider","3D Rubik's Cube","Cards Beam","Solar System"]],
  ["Backgrounds", ["Hacker Background","Beam Grid Background","Fall Beam Background","Hell Background","Interactive Grid Background","Wave Background","Star Burst*","Lines Background","Sparkles Background","Isometric Grid Background","Space Background","Black Hole Background","Mouse Gravity Background","Kinetic Grid*"]],
  ["Interactive Background", ["Gravitational Vortex","Black Hole","Blooming Flower","Chandelier","Spider Web*","Point DNA Helix","Twin Galaxy Rings","Tornado","Particle Sphere","Morphing Rings","Block Drift","Lightfall","Ascii Water*","Globe Mesh*","Reflect Shader*","Infinite Tendrils*","Ocean Swell*","Frost Glass Melt*","Sky*","Rain Storm*","Ember Husk*","Matrix Rain*","Quantum Lattice*"]],
  ["Cursor Effects", ["Target Cursor","Black Hole Cursor","Magnetic Cursor","Heart Cursor 💜","Lizard Cursor","Venom Cursor","Star Cursor ⭐","Ascii Cursor","Aura Cursor*","Confetti Cursor*","Spin Cursor*","User Cursor*"]],
  ["Scroll Animation", ["SVG Page Transition","Section Scroll","Infinite Marquee","Scroll Expand"]],
  ["Option Wheel Loaders", ["Isometric Portal*","Morphing Glow*","Gear System*","Hourglass*","Generating Orb*","Trading Candles*","Pixel Bounce*","Gradient Orb*","Aurora BPM Loader*","Particle Loader*"]],
  ["Navbars", ["Cinematic Nav*","Floating Dark Capsule Nav*","Minimal AI Capsule Nav*","Pill Navbar Nav*","Modern Dark Nav*","Split Navigation Nav*","Awwwards Nav*"]],
  ["Footers", ["HAUL!*","Omniflow*","Sōra*","AlpineFooter*","Leeuwarder Golfclub*","Community Newsletter*","Faizur Portfolio*","Sui Foundation*"]],
  ["Forms & Inputs", ["OTP Code Input*","Password Strength Meter*","Signature Pad*","Drag Drop Upload Zone*"]],
];

const slugify = (name: string) => name.toLowerCase().replace(/[💜⭐]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const tagsFor = (category: VaultCategory, name: string) => {
  const cat = category.split(" ")[0].toLowerCase();
  const words = name.toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean);
  const tag2 = words.find((w) => w !== cat) || "ui";
  return Array.from(new Set([cat, tag2, "tailwind"]));
};

export const VAULT_ITEMS: VaultItem[] = groups.flatMap(([category, names]) => names.map((raw) => {
  const isNew = raw.endsWith("*"); const name = raw.replace(/\*$/, "");
  return { name, slug: slugify(name), category, isNew, tags: tagsFor(category, name) };
}));
export const VAULT_CATEGORIES = groups.map(([category]) => category);
export const vaultBySlug = (slug: string) => VAULT_ITEMS.find((item) => item.slug === slug);
