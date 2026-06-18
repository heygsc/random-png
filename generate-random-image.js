import { createWriteStream } from 'node:fs';
import { PNG } from 'pngjs';

const DEFAULT_OPTIONS = {
  gridColumns: 10,
  gridRows: 10,
  cellSize: 80,
  outputFile: 'random.png',
};

const LARGE_OPTIONS = {
  gridColumns: 160,
  gridRows: 160,
  cellSize: 100,
  outputFile: 'random-large.png',
};

function getOptions() {
  if (process.argv.includes('--large')) {
    return LARGE_OPTIONS;
  }

  return DEFAULT_OPTIONS;
}

function randomRGB() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

async function generateRandomImage() {
  const { gridColumns, gridRows, cellSize, outputFile } = getOptions();
  const width = gridColumns * cellSize;
  const height = gridRows * cellSize;
  const image = new PNG({ width, height });

  for (let gridX = 0; gridX < gridColumns; gridX += 1) {
    for (let gridY = 0; gridY < gridRows; gridY += 1) {
      const { r, g, b } = randomRGB();

      for (let cellX = 0; cellX < cellSize; cellX += 1) {
        for (let cellY = 0; cellY < cellSize; cellY += 1) {
          const x = gridX * cellSize + cellX;
          const y = gridY * cellSize + cellY;
          const index = (width * y + x) << 2;
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
      .pipe(createWriteStream(outputFile))
      .on('finish', resolve)
      .on('error', reject);
  });

  console.log(`随机图片生成成功: ${outputFile} (${width}x${height})`);
}

generateRandomImage().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
