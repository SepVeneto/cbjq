import type { Shape } from './Shape'
import { Grid } from './Grid'
import {
  Eight,
  Five,
  Four,
  Nine,
  One,
  Seven,
  Six,
  Three,
  Two,
} from './Shape'
import { createDebug } from './utils'
const debug = createDebug('detect')

export function canPlace(grid: number[][], shape: number[][], _start: number[]) {
  const start = [..._start]
  const originStart = [...start]
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (start[0] >= grid.length) return false

      const state = shape[row][col]
      const place = grid[start[0]][start[1]]

      if (place !== 0 && state) {
        debug('place && state exit', place, `(${start[0]}, ${start[1]})`, state, `(${row}, ${col})`)
        return false
      }
      if (place === 0 || (place > 0 && !state)) {
        start[1] += 1
        if (start[1] > grid[start[0]].length) {
          debug('bound exit', start[1], grid[start[0]])
          return false
        }
        continue
      }
    }
    start[1] = originStart[1]
    start[0] += 1
  }
  return true
}
export function place(grid: number[][], shape: number[][], _start: number[]) {
  const start = [..._start]
  const originStart = [...start]
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      const state = shape[row][col]
      const place = grid[start[0]][start[1]]
      if (place === 0) {
        grid[start[0]][start[1]] = state
      }

      ++start[1]
      if (start[1] > grid[start[0]].length) continue
    }
    start[1] = originStart[1]
    ++start[0]
    if (start[0] > grid.length) continue
  }
}

type Collect = Record<'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine', number>
const answers: number[][][] = []
// export function run(_grid: number[][], collect: Collect) {
//   const shapes = initShapes(collect)
//   const grid = JSON.parse(JSON.stringify(_grid))

//   // for (const shape of shapes) {
//   // shape.reset()
//   // tryPlace(grid, shapes, [0, 0])
//   // }
//   // answers.push(JSON.parse(JSON.stringify(grid)))
//   return answers
// }

function initShapes(collect: Collect): Shape[] {
  const keys = Object.keys(collect).filter(key => collect[key as keyof typeof collect]) as (keyof typeof collect)[]
  console.log(keys)
  return keys.map(key => {
    const num = collect[key]
    switch (key) {
      case 'one':
        return new One(num)
      case 'two':
        return new Two(num)
      case 'three':
        return new Three(num)
      case 'four':
        return new Four(num)
      case 'five':
        return new Five(num)
      case 'six':
        return new Six(num)
      case 'seven':
        return new Seven(num)
      case 'eight':
        return new Eight(num)
      default:
        return new Nine(num)
    }
  })
}
const answer: number[][][] = []
export function tryPlace(grid: number[][], shapes: Shape[], [row, col]: number[]) {
  for (const shape of shapes) {
    if (!shape.num) continue

    let res = shape.place()
    while (res) {
      if (canPlace(grid, res, [row, col])) {
        place(grid, res, [row, col])
        --shape.num
        break
      }
      res = shape.place()
    }
    let c = col + 1
    let r = row
    if (c > grid[r].length) {
      c = 0
      r += 1
    }
    if (r === grid.length) {
      answer.push(JSON.parse(JSON.stringify(grid)))
      console.log(grid)
      return
    }
    tryPlace(grid, shapes, [r, c])
  }
}

let shapes: Shape[]
export function execute(row: number, col: number, collect: any) {
  shapes = initShapes(collect)
  const grid = new Grid(row, col)
  // const shapes = initShapes(COLLECT)

  executeUtils(grid)
  if (grid.answerList.length === 0) {
    grid.answer()
  }
  return grid.answerList
}

function executeUtils(grid: Grid, count = 0) {
  if (grid.grid[0][0] === 4) debugger
  if (count === grid.size.c * grid.size.r) {
    grid.answer()
    return false
  }

  const r = Math.floor(count / grid.size.c)
  const c = count % grid.size.c

  if (!grid.canPlace(r, c)) {
    return executeUtils(grid, count + 1)
  }

  for (const shape of shapes) {
    if (!shape.num) continue

    shape.reset()

    let res = shape.place(true)
    while (res) {
      if (!grid.canPlace(r, c, shape)) {
        res = shape.place()
        continue
      }

      grid.put(r, c, shape)
      --shape.num
      const save = shape.save()

      if (executeUtils(grid, count + 1)) return true

      // 回溯
      shape.reload(save)
      ++shape.num
      grid.put(r, c, shape, 0)

      res = shape.place()
    }
  }
  return false
}
