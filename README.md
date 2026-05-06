# hipng

用 Node.js 随机生成一张 PNG 图片。

输出文件固定为：

```text
random.png
```

每次生成都会覆盖旧图片。

## 使用

```bash
yarn install
yarn generate
```

图片尺寸在 `generate-random-image.js` 顶部修改：

```js
const WIDTH = 200;
const HEIGHT = 200;
```

## GitHub Actions

`Actions` 页面里手动运行 `Generate Random Image`，会重新生成 `random.png` 并自动提交。
