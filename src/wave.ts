import {Core, Options} from "./interface";
import {getColor, colorHex, colorRgb} from "./untils"

class Wave implements Core {
  container: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: Options
  lines: Array<{ hex: string, rgba: string }>
  step: number
  frame: number | null
  status: 'animating' | 'pause'

  constructor(container: string, options?: Options) {
    const originOption = {
      number: 3,
      smooth: 50,
      velocity: 1,
      height: .5,
      colors: ['#ff7657'],
      border: {
        show: false,
        width: 2,
        color: ''
      },
      opacity: .5,
      position: 'bottom',
    }

    this.container = document.querySelector(container)
    this.options = Object.assign(originOption, options)
    this.lines = []
    this.frame = null
    this.step = 0
    this.status = 'pause'

    this.init()
  }

  init() {
    if (this.container.querySelector('canvas') === null) {
      const canvas = document.createElement('canvas')
      canvas.width = this.container.offsetWidth
      canvas.height = this.container.offsetHeight
      this.container.appendChild(canvas)
    }

    this.canvas = this.container.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.setLines()
  }

  animate() {
    this.status = 'animating'
    const canvas = this.canvas
    const ctx = this.ctx

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.step += this.options.velocity

    this.lines.forEach((line, index) => {
      const angle = (this.step + index * 180 / this.lines.length) * Math.PI / 180
      const leftHeight = Math.sin(angle) * this.options.smooth
      const rightHeight = Math.cos(angle) * this.options.smooth

      ctx.fillStyle = line.rgba
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * this.options.height + leftHeight)

      if (this.options.border.show) {
        ctx.lineWidth = this.options.border.width
        ctx.strokeStyle = this.options.border.color ? this.options.border.color : line.hex
      }

      ctx.bezierCurveTo(canvas.width / 2,
        canvas.height * this.options.height + leftHeight - this.options.smooth,
        canvas.width / 2,
        canvas.height * this.options.height + rightHeight - this.options.smooth,
        canvas.width,
        canvas.height * this.options.height + rightHeight)

      if (this.options.border.show) {
        ctx.stroke()
      }
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.lineTo(0, canvas.height * this.options.height + leftHeight)
      ctx.closePath()
      ctx.fill()
    })

    var that = this;
    this.frame = requestAnimationFrame(function () {
      that.animate()
    })

  }

  pause() {
    cancelAnimationFrame(this.frame)
    this.frame = null
    this.status = 'pause'
  }

  setOptions() {

    this.setLines()
  }

  setLines() {
    for (let i = 0; i < this.options.number; i++) {
      const color = this.options.colors[i % this.options.colors.length]
      const line = {
        hex: colorHex((<any>color)),
        rgba: colorRgb((<any>color), this.options.opacity)
      }
      this.lines.push(line)
    }
  }
}

(<any>window).Wave = Wave

export default Wave
