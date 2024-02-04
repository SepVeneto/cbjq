import type { Shape } from './Shape'
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
export function run(_grid: number[][], collect: Collect) {
  const shapes = initShapes(collect)
  const grid = JSON.parse(JSON.stringify(_grid))
  /**
   * TODO: 回溯
   */
  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[row].length; ++col) {
      for (const shape of shapes) {
        if (tryPlace(grid, shape, [row, col])) {
          --shape.num
          break
        }
      }
    }
  }
  answers.push(JSON.parse(JSON.stringify(grid)))
  return answers
}

function initShapes(collect: Collect): Shape[] {
  const keys = Object.keys(collect) as (keyof typeof collect)[]
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

export function tryPlace(grid: number[][], shape: Shape, [row, col]: number[], count = 0) {
  if (!shape.num) return false
  let res = shape.place()
  while (res) {
    if (canPlace(grid, res, [row, col])) {
      place(grid, res, [row, col])
      return true
    } else {
      if (tryPlace(grid, shape, [row, col], count + 1)) {
        return true
      }
    }
    res = shape.place()
  }
}
