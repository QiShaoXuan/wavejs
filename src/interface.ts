export interface Core {
  container: HTMLElement
  canvas: HTMLElement
  ctx: CanvasRenderingContext2D
  step: number
  lines: Array<{ hex: string, rgba: string }>
  frame: number | null

  init: () => void
  animate: () => void
  pause: () => void
  setOptions: (options: Object) => void
}

export interface Options {
  number: number
  smooth: number
  velocity: number
  height: number
  colors: Array<{ hex: string, rgba: string }>
  opacity: number
  border: {
    show: boolean,
    width: number,
    color: string
  }
  position: 'top' | 'bottom' | 'left' | 'right'
}
