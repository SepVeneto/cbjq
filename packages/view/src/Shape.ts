import { EIGHT, FIVE, FOUR, NINE, ONE, SEVEN, SIX, THREE, TWO } from './constant'
export class Shape {
  protected rotateNum = 0
  protected union = 0
  protected unitNum = 0

  private currentRotate = 0
  private shape: number[][]
  private gen
  private init
  num: number
  constructor(shape: number[][], num = 1) {
    this.init = JSON.parse(JSON.stringify(shape))
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

  get units() {
    return this.unitNum
  }

  getPos(row: number, col: number) {
    return this.shape[row][col]
  }

  reset() {
    this.gen.return()
    this.gen = this.genPlace()
  }

  get size() {
    const rLen = this.shape.length
    const cLen = this.shape[0].length
    return { r: rLen, c: cLen }
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
    return res
  }

  get value() {
    return this.union
  }

  private * genPlace() {
    this.shape = this.init
    while (true) {
      yield this.shape
      this.rotate()
      ++this.currentRotate
    }
  }

  save() {
    return JSON.parse(JSON.stringify({
      cr: this.currentRotate,
      sp: this.shape,
    }))
  }

  reload(data: any) {
    this.shape = data.sp
    this.currentRotate = data.cr
  }

  place(init?: boolean) {
    const { value } = this.gen.next(init)
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
    this.union = 1
    this.unitNum = 4
  }
}

export class Two extends Shape {
  constructor(num = 1) {
    super(TWO, num)
    this.rotateNum = 1
    this.union = 2
    this.unitNum = 4
  }
}

export class Three extends Shape {
  constructor(num = 1) {
    super(THREE, num)
    this.rotateNum = 1
    this.union = 3
    this.unitNum = 4
  }
}

export class Four extends Shape {
  constructor(num = 1) {
    super(FOUR, num)
    this.rotateNum = 1
    this.union = 4
    this.unitNum = 4
  }
}

export class Five extends Shape {
  constructor(num = 1) {
    super(FIVE, num)
    this.rotateNum = 3
    this.union = 5
    this.unitNum = 4
  }
}

export class Six extends Shape {
  constructor(num = 1) {
    super(SIX, num)
    this.rotateNum = 3
    this.union = 6
    this.unitNum = 4
  }
}

export class Seven extends Shape {
  constructor(num = 1) {
    super(SEVEN, num)
    this.rotateNum = 3
    this.union = 7
    this.unitNum = 4
  }
}

export class Eight extends Shape {
  constructor(num = 1) {
    super(EIGHT, num)
    this.rotateNum = 0
    this.union = 8
    this.unitNum = 5
  }
}

export class Nine extends Shape {
  constructor(num = 1) {
    super(NINE, num)
    this.rotateNum = 0
    this.union = 9
    this.unitNum = 1
  }
}

function createMatrix(row: number, col: number) {
  return new Array(row).fill(null).map(_ => new Array(col))
}
