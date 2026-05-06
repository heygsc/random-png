# hipng

用 Node.js 随机生成 PNG 图片和像素头像。

输出文件固定为：

```text
random.png
avatar.png
```

每次生成都会覆盖旧图片。

## 使用

```bash
yarn install
yarn generate
yarn avatar
```

图片尺寸在脚本顶部修改：

```js
const WIDTH = 200;
const HEIGHT = 200;
```

## GitHub Actions

`Actions` 页面里可以手动运行：

```text
Generate Random Image
Generate Pixel Avatar
```

生成结果会自动提交。
