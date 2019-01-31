import {Core, Options} from "./interface";
import {getColor, colorHex, colorRgb} from "./untils"

export default class Wave implements Core {
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
      height: .3,
      colors: ['#ff7657'],
      border: {
        show: false,
        width: 2,
        color: ['']
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
    this.draw()
  }

  private init() {
    if (this.container.querySelector('canvas') === null) {
      const canvas = document.createElement('canvas')
      this.container.appendChild(canvas)
    }

    this.canvas = this.container.querySelector('canvas')

    this.canvas.width = this.container.offsetWidth
    this.canvas.height = this.container.offsetHeight

    this.ctx = this.canvas.getContext('2d')

    this.setLines()
  }

  public animate() {
    this.status = 'animating'
    this.draw()
  }

  public pause() {
    cancelAnimationFrame(this.frame)
    this.frame = null
    this.status = 'pause'
  }

  public setOptions(options: Object) {
    this.options = Object.assign(this.options, options)
    this.setLines()
    this.reset()
    if (this.status === 'pause') {
      this.draw()
    }
  }

  public reset(){
    this.init()
  }

  private draw() {
    const canvas = this.canvas
    const ctx = this.ctx
    const height = this.getWaveHeight()

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.step += this.options.velocity

    this.lines.forEach((line, index) => {
      const angle = (this.step + index * 180 / this.lines.length) * Math.PI / 180
      const leftHeight = Math.sin(angle) * this.options.smooth
      const rightHeight = Math.cos(angle) * this.options.smooth

      const vertexs = this.getVertexs(leftHeight, rightHeight)

      ctx.fillStyle = line.rgba
      ctx.beginPath()
      ctx.moveTo(vertexs[0][0], vertexs[0][1])

      if (this.options.border.show) {
        ctx.lineWidth = this.options.border.width
        ctx.strokeStyle = this.options.border.color[index] ? this.options.border.color[index] : line.hex
      }

      if (this.options.position === 'left' || this.options.position === 'right') {
        ctx.bezierCurveTo(
          height + leftHeight - this.options.smooth,
          canvas.height / 2,
          height + rightHeight - this.options.smooth,
          canvas.width / 2,
          vertexs[1][0],
          vertexs[1][1])
      } else {
        ctx.bezierCurveTo(canvas.width / 2,
          height + leftHeight - this.options.smooth,
          canvas.width / 2,
          height + rightHeight - this.options.smooth,
          vertexs[1][0],
          vertexs[1][1])
      }

      if (this.options.border.show) {
        ctx.stroke()
      }
      ctx.lineTo(vertexs[2][0], vertexs[2][1])
      ctx.lineTo(vertexs[3][0], vertexs[3][1])
      ctx.lineTo(vertexs[0][0], vertexs[0][1])
      ctx.closePath()
      ctx.fill()
    })

    var that = this;
    if (this.status === 'animating') {
      this.frame = requestAnimationFrame(function () {
        that.draw()
      })
    }
  }

  private setLines() {
    this.lines = []
    for (let i = 0; i < this.options.number; i++) {
      const color = this.options.colors[i % this.options.colors.length]
      const line = {
        hex: colorHex((<any>color)),
        rgba: colorRgb((<any>color), this.options.opacity)
      }
      this.lines.push(line)
    }
  }

  private getVertexs(leftHeight: number, rightHeight: number): number[][] {
    const canvasHeight = this.canvas.height
    const canvasWidth = this.canvas.width

    let waveHeight = this.getWaveHeight()

    switch (this.options.position) {
      case 'bottom':
        return [
          [0, waveHeight + leftHeight],
          [canvasWidth, waveHeight + rightHeight],
          [canvasWidth, canvasHeight],
          [0, canvasHeight]
        ]
      case 'top':
        return [
          [0, waveHeight + leftHeight],
          [canvasWidth, waveHeight + rightHeight],
          [canvasWidth, 0],
          [0, 0],
        ]
      case 'left':
        return [
          [waveHeight + leftHeight, 0],
          [waveHeight + rightHeight, canvasHeight],
          [0, canvasHeight],
          [0, 0],
        ]
      case 'right':
        return [
          [waveHeight + leftHeight, 0],
          [waveHeight + rightHeight, canvasHeight],
          [canvasWidth, canvasHeight],
          [canvasWidth, 0],
        ]
    }
  }

  private getWaveHeight(): number {
    if (this.options.height > 1) {
      switch (this.options.position) {
        case 'bottom':
          return this.canvas.height - this.options.height
        case 'top':
          return this.options.height
        case 'left':
          return this.options.height
        case 'right':
          return this.canvas.width - this.options.height
      }
    } else {
      switch (this.options.position) {
        case 'bottom':
          return this.canvas.height * (1 - this.options.height)
        case 'top':
          return this.canvas.height * this.options.height
        case 'left':
          return this.canvas.width * this.options.height
        case 'right':
          return this.canvas.width * (1 - this.options.height)
      }
    }
  }
}
