import type { Shape } from './Shape'

export class Grid {
  grid: number[][]
  gridMap = new Map<string, number>()
  answerList: number[][][] = []
  constructor(row: number, col: number) {
    this.grid = new Array(row).fill('').map(_ => new Array(col).fill(0))
    // this.grid = [
    //   [4, 0, 0, 0, 0, 0],
    //   [4, 4, 0, 0, 0, 0],
    //   [0, 4, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    // ]
    this.initEmpty()
  }

  get empty() {
    return Array.from(this.gridMap.values()).filter(item => !item).length
  }

  get size() {
    return {
      r: this.grid.length,
      c: this.grid[0].length,
    }
  }

  answer() {
    this.answerList.push(JSON.parse(JSON.stringify(this.grid)))
  }

  canPlace(row: number, col: number, shape?: Shape) {
    if (!shape) {
      const coord = toCoords(row, col)
      return this.gridMap.get(coord) === 0
    }

    for (let r = 0; r < shape.size.r; r++) {
      for (let c = 0; c < shape.size.c; c++) {
        const coord = toCoords(row + r, col + c)
        const state = this.gridMap.get(coord)
        if (state == null || (state !== 0 && shape.getPos(r, c) !== 0)) return false
      }
    }
    return true
  }

  put(row: number, col: number, shape: Shape, value?: number) {
    for (let r = 0; r < shape.size.r; r++) {
      for (let c = 0; c < shape.size.c; c++) {
        const coord = toCoords(row + r, col + c)
        if (value === 0) {
          if (this.gridMap.get(coord) === shape.value && shape.getPos(r, c)) {
            this.grid[row + r][col + c] = 0
            this.gridMap.set(coord, 0)
          } else {
            continue
          }
        } else {
          if (this.gridMap.get(coord) === 0 && shape.getPos(r, c)) {
            this.grid[row + r][col + c] = shape.value
            this.gridMap.set(coord, shape.value)
          } else {
            continue
          }
        }
      }
    }
  }

  tryPut(shape: Shape, row: number, col: number) {
    // if (shape.num === 0) return []
    // let _shape = shape.place()
    // let res
    // while (_shape) {
    //   res = this.put(shape, row, col)
    //   if (res.length > 0) {
    //     return res
    //   } else {
    //     _shape = shape.place()
    //   }
    // }
    // return []
  }

  initEmpty() {
    for (let r = 0; r < this.grid.length; ++r) {
      for (let c = 0; c < this.grid[r].length; ++c) {
        this.gridMap.set(toCoords(r, c), this.grid[r][c] || 0)
      }
    }
  }
}

function toCoords(row: number, col: number) {
  return `${row},${col}`
}
