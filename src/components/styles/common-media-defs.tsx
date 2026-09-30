import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  ImagePreview,
  ImageGalleryPreview,
  CarouselPreview,
  VideoPlayerPreview,
  AudioPlayerPreview,
  LightboxPreview,
  MediaCardPreview,
  CodeBlockPreview,
  MarkdownPreviewComponent,
  FilePreviewComponent
} from "./common-media-previews"
import { getMediaCodeForStyle } from "./common-media-code"

export function getCommonMediaDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "image",
      name: "Image",
      description: "Responsive image wrapper with loading and error states.",
      Preview: ({ mode }: { mode: Mode }) => <ImagePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "image", mode),
    },
    {
      id: "image-gallery",
      name: "Image Gallery",
      description: "A responsive grid layout for displaying a collection of images.",
      Preview: ({ mode }: { mode: Mode }) => <ImageGalleryPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "image-gallery", mode),
    },
    {
      id: "carousel",
      name: "Carousel",
      description: "A simple horizontal scrolling carousel using CSS scroll snap.",
      Preview: ({ mode }: { mode: Mode }) => <CarouselPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "carousel", mode),
    },
    {
      id: "video-player",
      name: "Video Player",
      description: "A responsive wrapper for HTML5 video with native controls.",
      Preview: ({ mode }: { mode: Mode }) => <VideoPlayerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "video-player", mode),
    },
    {
      id: "audio-player",
      name: "Audio Player",
      description: "A styled wrapper for HTML5 audio playback.",
      Preview: ({ mode }: { mode: Mode }) => <AudioPlayerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "audio-player", mode),
    },
    {
      id: "lightbox",
      name: "Lightbox",
      description: "A modal overlay for viewing media in fullscreen mode.",
      Preview: ({ mode }: { mode: Mode }) => <LightboxPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "lightbox", mode),
    },
    {
      id: "media-card",
      name: "Media Card",
      description: "A specialized card designed for highlighting media content.",
      Preview: ({ mode }: { mode: Mode }) => <MediaCardPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "media-card", mode),
    },
    {
      id: "code-block",
      name: "Code Block",
      description: "Syntax highlighting wrapper with a copy to clipboard button.",
      Preview: ({ mode }: { mode: Mode }) => <CodeBlockPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "code-block", mode),
    },
    {
      id: "markdown-preview",
      name: "Markdown Preview",
      description: "A basic safe markdown renderer returning React nodes.",
      Preview: ({ mode }: { mode: Mode }) => <MarkdownPreviewComponent slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "markdown-preview", mode),
    },
    {
      id: "file-preview",
      name: "File Preview",
      description: "A component to display file metadata with an optional download action.",
      Preview: ({ mode }: { mode: Mode }) => <FilePreviewComponent slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "file-preview", mode),
    }
  ]
}
