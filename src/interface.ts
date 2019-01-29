export interface Core {
  container:HTMLElement
  canvas:HTMLElement
  ctx:CanvasRenderingContext2D
  step: number
  lines:Array<string>
  frame: number | null

  init: () => void
  animate: () => void
  pause: () => void
  setOptions: () => void
}

export interface Options {
  number: number
  smooth: number
  velocity: number
  height: number
  colors: Array<string>
  opacity:number
  position: 'top' | 'bottom'
}
