import { EIGHT, FIVE, FOUR, NINE, ONE, SEVEN, SIX, THREE, TWO } from './constant'
export class Shape {
  protected rotateNum = 0
  private currentRotate = 0
  private shape: number[][]
  private gen
  num: number
  constructor(shape: number[][], num = 1) {
    this.shape = shape
    this.num = num
    this.gen = this.genPlace()
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

  reset() {
    this.currentRotate = 0
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
    return this.shape
  }

  private * genPlace() {
    while (true) {
      yield this.shape
      this.rotate()
      ++this.currentRotate
    }
    return this.shape
  }

  place() {
    const { value } = this.gen.next()
    // const { next } = this.genPlace()
    // const { value, done } = next()
    if (this.currentRotate > this.rotateNum) {
      this.currentRotate = 0
      return false
    }

    return value
  }
}

export class One extends Shape {
  constructor(num = 1) {
    super(ONE, num)
    this.rotateNum = 0
  }
}

export class Two extends Shape {
  constructor(num = 1) {
    super(TWO, num)
    this.rotateNum = 1
  }
}

export class Three extends Shape {
  constructor(num = 1) {
    super(THREE, num)
    this.rotateNum = 1
  }
}

export class Four extends Shape {
  constructor(num = 1) {
    super(FOUR, num)
    this.rotateNum = 1
  }
}

export class Five extends Shape {
  constructor(num = 1) {
    super(FIVE, num)
    this.rotateNum = 3
  }
}

export class Six extends Shape {
  constructor(num = 1) {
    super(SIX, num)
    this.rotateNum = 3
  }
}

export class Seven extends Shape {
  constructor(num = 1) {
    super(SEVEN, num)
    this.rotateNum = 3
  }
}

export class Eight extends Shape {
  constructor(num = 1) {
    super(EIGHT, num)
    this.rotateNum = 0
  }
}

export class Nine extends Shape {
  constructor(num = 1) {
    super(NINE, num)
    this.rotateNum = 0
  }
}

function createMatrix(row: number, col: number) {
  return new Array(row).fill(null).map(_ => new Array(col))
}
