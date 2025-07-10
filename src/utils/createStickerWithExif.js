const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { Image } = require("node-webpmux");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);
const TEMP_PATH = "./tmp";

async function createStickerWithExif(input, meta = {}) {
  const { author = "Zann Roderizz", pack = "mika-automate" } = meta;
  const ext = path.extname(input).toLowerCase();
  const isVideo = [".mp4", ".mov"].includes(ext);
  const webpPath = path.join(TEMP_PATH, `sticker_${Date.now()}.webp`);

  if (!fs.existsSync(TEMP_PATH)) fs.mkdirSync(TEMP_PATH);

  if (isVideo) {
    await new Promise((resolve, reject) => {
      ffmpeg(input)
        .outputOptions([
          "-vcodec",
          "libwebp",
          "-vf",
          "scale=512:512:force_original_aspect_ratio=decrease,fps=15",
          "-loop",
          "0",
          "-ss",
          "00:00:00.0",
          "-t",
          "00:00:05.0",
          "-preset",
          "default",
          "-an",
          "-vsync",
          "0",
        ])
        .output(webpPath)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });
  } else {
    await sharp(input)
      .resize(512, 512, { fit: "inside" })
      .webp({ quality: 80 })
      .toFile(webpPath);
  }

  const img = new Image();
  await img.load(webpPath);

  img.exif = {
    "Sticker-Pack-Name": pack,
    "Sticker-Pack-Publisher": author,
  };

  const finalBuffer = await img.save();
  fs.unlinkSync(webpPath);

  return finalBuffer;
}

module.exports = { createStickerWithExif };
