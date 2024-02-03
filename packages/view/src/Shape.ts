export class Shape {
  shape: number[][]
  num: number
  constructor(shape: number[][], num = 1) {
    this.shape = shape
    this.num = num
  }

  get rows() {
    return this.shape.length
  }

  get cols() {
    return this.shape[0].length
  }

  getPos(row: number, col: number) {
    return this.shape[row][col]
  }

  rotate() {
    const res = createMatrix(this.cols, this.rows)
    for (let row = 0; row < this.rows; row++) {
      const newCol = this.rows - row - 1
      for (let col = 0; col < this.cols; col++) {
        const newRow = col
        res[newRow][newCol] = this.getPos(row, col)
      }
    }
    this.shape = res
  }
}

function createMatrix(row: number, col: number) {
  return new Array(row).fill(null).map(_ => new Array(col))
}
