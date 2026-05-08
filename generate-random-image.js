import { createWriteStream } from 'node:fs';
import { PNG } from 'pngjs';

// Grid size and rendered cell size. Change these values if needed.
const GRID_COLUMNS = 10;
const GRID_ROWS = 10;
const CELL_SIZE = 80;
const WIDTH = GRID_COLUMNS * CELL_SIZE;
const HEIGHT = GRID_ROWS * CELL_SIZE;
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

  for (let gridX = 0; gridX < GRID_COLUMNS; gridX += 1) {
    for (let gridY = 0; gridY < GRID_ROWS; gridY += 1) {
      const { r, g, b } = randomRGB();

      for (let cellX = 0; cellX < CELL_SIZE; cellX += 1) {
        for (let cellY = 0; cellY < CELL_SIZE; cellY += 1) {
          const x = gridX * CELL_SIZE + cellX;
          const y = gridY * CELL_SIZE + cellY;
          const index = (WIDTH * y + x) << 2;
          image.data[index] = r;
          image.data[index + 1] = g;
          image.data[index + 2] = b;
          image.data[index + 3] = 255;
        }
      }
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
