const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src/lib/components-catalog.ts');
let content = fs.readFileSync(catalogPath, 'utf8');

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

content = content.replace('] as const;', mediaCatalogEntries);

// Inject missing imports manually
const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+["']lucide-react["']/s);
if (importMatch) {
  const existing = importMatch[1];
  const toAdd = ["ImageIcon", "LayoutGrid", "GalleryHorizontalEnd", "Video", "Headphones", "Maximize", "Clapperboard", "Code2", "FileType2", "FileArchive"];
  
  let updatedImports = existing;
  for (const icon of toAdd) {
    if (!existing.includes(icon)) {
      updatedImports += `,\\n  \${icon}`;
    }
  }
  
  content = content.replace(importMatch[1], updatedImports);
}

fs.writeFileSync(catalogPath, content, 'utf8');
