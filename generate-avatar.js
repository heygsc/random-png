import { createWriteStream } from 'node:fs';
import { PNG } from 'pngjs';

const SIZE = 200;
const GRID_SIZE = 7;
const PADDING = 18;
const OUTPUT_FILE = 'avatar.png';

const CELL_SIZE = Math.floor((SIZE - PADDING * 2) / GRID_SIZE);
const DRAW_SIZE = CELL_SIZE * GRID_SIZE;
const OFFSET = Math.floor((SIZE - DRAW_SIZE) / 2);

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomColor({ min = 0, max = 255 } = {}) {
  return {
    r: min + randomInt(max - min + 1),
    g: min + randomInt(max - min + 1),
    b: min + randomInt(max - min + 1),
    a: 255,
  };
}

function setPixel(image, x, y, color) {
  const index = (image.width * y + x) << 2;
  image.data[index] = color.r;
  image.data[index + 1] = color.g;
  image.data[index + 2] = color.b;
  image.data[index + 3] = color.a;
}

function fillRect(image, startX, startY, width, height, color) {
  for (let y = startY; y < startY + height; y += 1) {
    for (let x = startX; x < startX + width; x += 1) {
      setPixel(image, x, y, color);
    }
  }
}

function createPattern() {
  const pattern = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
  const halfWidth = Math.ceil(GRID_SIZE / 2);

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < halfWidth; x += 1) {
      const enabled = Math.random() > 0.45;
      pattern[y][x] = enabled;
      pattern[y][GRID_SIZE - 1 - x] = enabled;
    }
  }

  return pattern;
}

async function writePNG(image, filename) {
  await new Promise((resolve, reject) => {
    image
      .pack()
      .pipe(createWriteStream(filename))
      .on('finish', resolve)
      .on('error', reject);
  });
}

async function generateAvatar() {
  const image = new PNG({ width: SIZE, height: SIZE });
  const background = randomColor({ min: 220, max: 255 });
  const foreground = randomColor({ min: 20, max: 180 });
  const pattern = createPattern();

  fillRect(image, 0, 0, SIZE, SIZE, background);

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if (!pattern[y][x]) continue;

      fillRect(
        image,
        OFFSET + x * CELL_SIZE,
        OFFSET + y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
        foreground,
      );
    }
  }

  await writePNG(image, OUTPUT_FILE);
  console.log(`随机像素头像生成成功: ${OUTPUT_FILE}`);
}

generateAvatar().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
