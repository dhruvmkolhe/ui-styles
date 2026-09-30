const fs = require('fs');

const path = 'src/lib/components-catalog.ts';
let code = fs.readFileSync(path, 'utf8');

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

// Safely append imports:
const toAdd = ["ImageIcon", "GalleryHorizontalEnd", "Video", "Headphones", "Maximize", "Clapperboard", "Code2", "FileType2", "FileArchive"];
// (Note: LayoutGrid is already imported at the top!)

const insertionPoint = code.indexOf('} from "lucide-react"');
if (insertionPoint !== -1) {
  const before = code.substring(0, insertionPoint);
  const after = code.substring(insertionPoint);
  
  // ensure trailing comma
  let appended = toAdd.join(',\\n  ');
  if (!before.trim().endsWith(',')) {
    appended = ',\\n  ' + appended;
  }
  
  code = before + appended + '\\n' + after;
}

fs.writeFileSync(path, code, 'utf8');
