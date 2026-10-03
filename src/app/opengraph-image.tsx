import { ImageResponse } from "next/og";
import { SHARE_IMAGE_ALT, SHARE_IMAGE_SIZE, ShareImageArt } from "@/lib/share-image";

export const alt = SHARE_IMAGE_ALT;
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<ShareImageArt />, { ...size });
}
