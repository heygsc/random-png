# hipng

用 Node.js 随机生成 PNG 图片和像素头像。

输出文件固定为：

```text
random.png
random-large.png
avatar.png
```

每次生成都会覆盖旧图片。

## 使用

```bash
yarn install
yarn generate
yarn generate:large
yarn avatar
```

默认随机图为 800x800，大尺寸随机图为 8000x8000。图片尺寸在脚本顶部修改：

```js
const DEFAULT_OPTIONS = {
  gridColumns: 10,
  gridRows: 10,
  cellSize: 80,
  outputFile: 'random.png',
};
```

## GitHub Actions

`Actions` 页面里可以手动运行：

```text
Generate Random Image
Generate Large Random Image
Generate Pixel Avatar
```

生成结果会自动提交。
