import { createWriteStream } from 'node:fs';
import { PNG } from 'pngjs';

// Image size. Change these values if needed.
const WIDTH = 200;
const HEIGHT = 200;
const OUTPUT_FILE = 'random.png';

function randomRGB() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

async function generateRandomImage() {
  const image = new PNG({ width: WIDTH, height: HEIGHT });

  for (let x = 0; x < WIDTH; x += 1) {
    for (let y = 0; y < HEIGHT; y += 1) {
      const { r, g, b } = randomRGB();
      const index = (WIDTH * y + x) << 2;
      image.data[index] = r;
      image.data[index + 1] = g;
      image.data[index + 2] = b;
      image.data[index + 3] = 255;
    }
  }

  await new Promise((resolve, reject) => {
    image
      .pack()
      .pipe(createWriteStream(OUTPUT_FILE))
      .on('finish', resolve)
      .on('error', reject);
  });

  console.log(`随机图片生成成功: ${OUTPUT_FILE}`);
}

generateRandomImage().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
