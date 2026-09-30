const fs = require('fs');

const path = 'src/lib/components-catalog.ts';
let code = fs.readFileSync(path, 'utf8');

const toAdd = ["ImageIcon", "LayoutGrid", "GalleryHorizontalEnd", "Video", "Headphones", "Maximize", "Clapperboard", "Code2", "FileType2", "FileArchive"];

const importMatch = code.match(/import\s+{([^}]+)}\s+from\s+["']lucide-react["']/);
if (importMatch) {
  const existingImportsText = importMatch[1];
  const existingImports = existingImportsText.split(',').map(s => s.trim()).filter(Boolean);
  
  const finalImports = new Set([...existingImports, ...toAdd]);
  
  const newImportText = `import {\\n  ` + Array.from(finalImports).join(',\\n  ') + `\\n} from "lucide-react"`;
  
  code = code.replace(importMatch[0], newImportText);
}

const mediaCatalogEntries = `
  {
    id: "image",
    name: "Image",
    description: "Responsive image wrapper with loading and error states.",
    category: "Media & Content",
    icon: ImageIcon,
    isNew: true,
  },
  {
    id: "image-gallery",
    name: "Image Gallery",
    description: "A responsive grid layout for displaying a collection of images.",
    category: "Media & Content",
    icon: LayoutGrid,
    isNew: true,
  },
  {
    id: "carousel",
    name: "Carousel",
    description: "A simple horizontal scrolling carousel using CSS scroll snap.",
    category: "Media & Content",
    icon: GalleryHorizontalEnd,
    isNew: true,
  },
  {
    id: "video-player",
    name: "Video Player",
    description: "A responsive wrapper for HTML5 video with native controls.",
    category: "Media & Content",
    icon: Video,
    isNew: true,
  },
  {
    id: "audio-player",
    name: "Audio Player",
    description: "A styled wrapper for HTML5 audio playback.",
    category: "Media & Content",
    icon: Headphones,
    isNew: true,
  },
  {
    id: "lightbox",
    name: "Lightbox",
    description: "A modal overlay for viewing media in fullscreen mode.",
    category: "Media & Content",
    icon: Maximize,
    isNew: true,
  },
  {
    id: "media-card",
    name: "Media Card",
    description: "A specialized card designed for highlighting media content.",
    category: "Media & Content",
    icon: Clapperboard,
    isNew: true,
  },
  {
    id: "code-block",
    name: "Code Block",
    description: "Syntax highlighting wrapper with a copy to clipboard button.",
    category: "Media & Content",
    icon: Code2,
    isNew: true,
  },
  {
    id: "markdown-preview",
    name: "Markdown Preview",
    description: "A basic safe markdown renderer returning React nodes.",
    category: "Media & Content",
    icon: FileType2,
    isNew: true,
  },
  {
    id: "file-preview",
    name: "File Preview",
    description: "A component to display file metadata with an optional download action.",
    category: "Media & Content",
    icon: FileArchive,
    isNew: true,
  }
] as const;`;

code = code.replace(/\]\s*as\s+const\s*;/, mediaCatalogEntries);

fs.writeFileSync(path, code, 'utf8');
