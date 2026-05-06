# hipng

一个用 Node.js 生成随机像素 PNG 图片的小项目。

每次运行脚本都会重新生成并覆盖固定文件：

```text
random.png
```

## 本地使用

安装依赖：

```bash
yarn install
```

生成图片：

```bash
yarn generate
```

脚本入口是：

```text
generate-random-image.js
```

默认图片尺寸是 `200 x 200`，可以在脚本顶部修改：

```js
const WIDTH = 200;
const HEIGHT = 200;
```

## GitHub Actions

仓库包含一个手动触发的 GitHub Action：

```text
.github/workflows/generate-image.yml
```

使用方式：

1. 进入 GitHub 仓库的 `Actions` 页面。
2. 选择 `Generate Random Image`。
3. 点击 `Run workflow`。

Action 会自动：

1. 安装依赖。
2. 运行 `yarn generate`。
3. 覆盖生成 `random.png`。
4. 如果图片有变化，自动提交到仓库。

## 依赖

图片生成使用轻量 PNG 库：

```text
pngjs
```
