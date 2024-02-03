import { expect, test } from 'vitest'

import { Shape } from './Shape'
import { EIGHT, FIVE, FOUR, NINE, ONE, SEVEN, SIX, THREE, TWO } from './constant'

test('rotate one', () => {
  const one = new Shape(ONE)
  one.rotate()
  expect(one.shape).toStrictEqual(ONE)
})

test('rotate tow', () => {
  const two = new Shape(TWO)
  two.rotate()
  expect(two.shape).toStrictEqual([
    [2, 2, 2, 2],
  ])

  two.rotate()
  expect(two.shape).toStrictEqual([
    [2],
    [2],
    [2],
    [2],
  ])
})

test('rotate three', () => {
  const three = new Shape(THREE)
  three.rotate()
  expect(three.shape).toStrictEqual([
    [0, 3],
    [3, 3],
    [3, 0],
  ])

  three.rotate()
  expect(three.shape).toStrictEqual(THREE)
})

test('rotate four', () => {
  const four = new Shape(FOUR)
  four.rotate()
  expect(four.shape).toStrictEqual([
    [4, 0],
    [4, 4],
    [0, 4],
  ])

  four.rotate()
  expect(four.shape).toStrictEqual(FOUR)
})

test('rotate five', () => {
  const five = new Shape(FIVE)
  five.rotate()
  expect(five.shape).toStrictEqual([
    [5, 0, 0, 0],
    [5, 5, 5, 5],
  ])

  five.rotate()
  expect(five.shape).toStrictEqual([
    [5, 5],
    [5, 0],
    [5, 0],
    [5, 0],
  ])

  five.rotate()
  expect(five.shape).toStrictEqual([
    [5, 5, 5, 5],
    [0, 0, 0, 5],
  ])

  five.rotate()
  expect(five.shape).toStrictEqual(FIVE)
})

test('rotate six', () => {
  const six = new Shape(SIX)
  six.rotate()
  expect(six.shape).toStrictEqual([
    [6, 6, 6, 6],
    [6, 0, 0, 0],
  ])

  six.rotate()
  expect(six.shape).toStrictEqual([
    [6, 6],
    [0, 6],
    [0, 6],
    [0, 6],
  ])

  six.rotate()
  expect(six.shape).toStrictEqual([
    [0, 0, 0, 6],
    [6, 6, 6, 6],
  ])

  six.rotate()
  expect(six.shape).toStrictEqual(SIX)
})

test('rotate seven', () => {
  const seven = new Shape(SEVEN)
  seven.rotate()
  expect(seven.shape).toStrictEqual([
    [0, 7],
    [7, 7],
    [0, 7],
  ])

  seven.rotate()
  expect(seven.shape).toStrictEqual([
    [0, 7, 0],
    [7, 7, 7],
  ])

  seven.rotate()
  expect(seven.shape).toStrictEqual([
    [7, 0],
    [7, 7],
    [7, 0],
  ])

  seven.rotate()
  expect(seven.shape).toStrictEqual(SEVEN)
})

test('rotate eight', () => {
  const eight = new Shape(EIGHT)
  eight.rotate()
  expect(eight.shape).toStrictEqual(EIGHT)
})

test('rotate nine', () => {
  const nine = new Shape(NINE)
  nine.rotate()
  expect(nine.shape).toStrictEqual(NINE)
})
