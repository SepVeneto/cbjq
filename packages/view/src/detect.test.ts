import { expect, test } from 'vitest'
import { canPlace, tryPlace } from './detect'
import { Shape } from './Shape'
import { ONE, TWO } from './constant'

test('place shape', () => {
  expect(canPlace([
    [0, 0, 0],
    [0, 0, 0],
  ], ONE, [0, 0])).toBe(true)
})
test('place shape with others', () => {
  expect(canPlace([
    [0, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
  ], ONE, [0, 0])).toBe(false)

  expect(canPlace([
    [0, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
  ], ONE, [0, 3])).toBe(true)

  expect(canPlace([
    [0, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ], ONE, [1, 2])).toBe(true)
})

test('place bound', () => {
  expect(canPlace([
    [0, 0],
    [0],
  ], ONE, [0, 0])).toBe(false)
})

test('place failed', () => {
  expect(canPlace([
    [1, 0],
    [0, 0],
  ], ONE, [0, 0])).toBe(false)
})

test('can place two rotate', () => {
  const two = new Shape(TWO)
  two.rotate()
  expect(canPlace([
    [0, 0, 0, 0, 0, 0],
  ], two.shape, [0, 0])).toBe(true)
})

test('try place rotate', () => {
  const grid = [
    [0, 0, 0, 0, 0, 0],
  ]
  tryPlace(grid, new Shape(TWO, 1), [0, 0])
  // place(grid, ONE, [0, 0])
  expect(grid).toStrictEqual([
    [2, 2, 2, 2, 0, 0],
  ])
})
