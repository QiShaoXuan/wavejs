<a href="https://github.com/QiShaoXuan/wavejs/blob/master/README.md">中文</a>

<a href="https://github.com/QiShaoXuan/wavejs/blob/master/README_en.md">English</a>

# 波浪动画

一个灵活的可配置的波浪动画

<a href="https://qishaoxuan.github.io/wavejs/">简单的展示</a>

<a href="https://qishaoxuan.github.io/css_tricks/notCSS/wave.html">附代码的展示</a>

<a href="https://juejin.im/post/5c64ce6ef265da2d8c7db0df">教程</a>

## 使用

在实例化时接收两个参数

第一个参数：动画容器的选择器

第二个参数（可选）：[options](#options)

#### 引用 `/dist/wave.es.js`
```js
import Wave from './dist/wave.es.js'
  
const wave = new Wave('body')
```
#### 引用 `/dist/wave.js`
```html
<script src="./dist/wave.js"></script>
<script >
  const wave = new Wave('body')
</script>
```

## 配置参数

### container
类型：string

默认值：--

说明：动画容器的选择器

### options
### options.number 
类型： number

默认值：3

说明：波浪个数（层数）
### options.smooth 
类型： number

默认值：50

说明：平滑程度

### options.velocity  
类型： number

默认值：1

说明：速度
### options.height 
类型： number

默认值：.3

说明：波浪高度，可以是百分比，也可以是具体的高度
### options.colors
类型： Array<{ hex: string, rgba: string }> 

默认值：`['#ff7657']`

说明：每个波浪的颜色
### options.opacity 
类型： number 

默认值：.5

说明：波浪的透明度
### options.border.show
类型： boolean

默认值：true

说明：是否显示边框
### options.border.width
类型： number

默认值：2

说明：边框宽度
### options.border.color
类型： string[] 

默认值：`['']`

说明：边框颜色，默认为波浪颜色相同
### options.position
类型： 'top' | 'bottom' | 'left' | 'right' 

默认值：`"bottom"`

说明：波浪的位置

## 方法

### `animate`
开始动画
### `pause`
暂停动画
### `setOptions`
设置参数，接收值与上述 `options` 相同
### `reset`
重置动画，当容器大小变化时可用

## TODO
增加多个波浪（多个贝塞尔曲线连接）

