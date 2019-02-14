<a href="https://github.com/QiShaoXuan/wavejs/blob/master/README.md">中文</a>

<a href="https://github.com/QiShaoXuan/wavejs/blob/master/README_en.md">English</a>

# Wave animation

a flexible ,configurable animation of wave

<a href="https://qishaoxuan.github.io/wavejs/">simple demo</a>

<a href="https://qishaoxuan.github.io/css_tricks/notCSS/wave.html">demo has code</a>

<a href="https://juejin.im/post/5c64ce6ef265da2d8c7db0df">教程</a>

## How to use

Two parameters are received at instantiation time

First params：the selector for the animation container

Second parameter（optional）：[Options](#Options)

#### import `/dist/wave.es.js`
```js
import Wave from './dist/wave.es.js'
  
const wave = new Wave('body')
```
#### import `/dist/wave.js`
```html
<script src="./dist/wave.js"></script>
<script >
  const wave = new Wave('body')
</script>
```

## API

### container
Type: string

Default: --

Description: selector for the animation container

### options
### options.number 
Type: number

Default:3

Description: number of waves (number of layers)
### options.smooth 
Type: number

Default: 50

Description: smooth degree

### options.velocity  
Type: number

Default:1

Description: speed of the animation
### options.height 
Type: number

Default:.3

Description: wave height can be either a percentage or a specific height
### options.colors
Type: Array<{ hex: string, rgba: string }> 

Default:`['#ff7657']`

Description: color of every waves
### options.opacity 
Type: number 

Default:.5

Description: opacity of wave
### options.border.show
Type: boolean

Default:true

Description: whether to display border or not
### options.border.width
Type: number

Default:2

Description: border width
### options.border.color
Type: string[] 

Default:`['']`

Description: border color, the default is the same as the wave color
### options.position
Type: 'top' | 'bottom' | 'left' | 'right' 

Default:`"bottom"`

Description: position of waves

## methods

### `animate`
start animation
### `pause`
pause animation
### `setOptions`
set options
### `reset`
reset animation


