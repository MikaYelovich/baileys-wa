/// <reference types="node" />

/**
 * Creates a WhatsApp-compatible WebP sticker with EXIF metadata.
 *
 * Supports input of static images or short video clips.
 *
 * @param input - Path to the input image or video file (.png, .jpg, .mp4, etc.)
 * @param meta - Optional metadata for the sticker (author and pack name)
 * @returns Promise resolving to a Buffer containing the WebP image with EXIF
 */
export declare function createStickerWithExif(
  input: string,
  meta?: {
    author?: string;
    pack?: string;
  }
): Promise<Buffer>;
