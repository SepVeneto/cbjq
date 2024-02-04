import { expect, test } from 'vitest'

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
import { EIGHT, FIVE, FOUR, NINE, ONE, SEVEN, SIX, THREE, TWO } from './constant'

test('rotate one', () => {
  const one = new One()
  const shape = one.place()
  expect(shape).toStrictEqual(ONE)

  expect(one.place()).toBe(false)
})

test('rotate tow', () => {
  const two = new Two()
  let shape = two.place()
  expect(shape).toStrictEqual(TWO)

  shape = two.place()
  expect(shape).toStrictEqual([
    [2, 2, 2, 2],
  ])

  expect(two.place()).toBe(false)
})

test('rotate three', () => {
  const three = new Three()
  let shape = three.place()
  expect(shape).toStrictEqual(THREE)

  shape = three.place()
  expect(shape).toStrictEqual([
    [0, 3],
    [3, 3],
    [3, 0],
  ])
  expect(three.place()).toBe(false)
})

test('rotate four', () => {
  const four = new Four()
  let shape = four.place()
  expect(shape).toBe(FOUR)
  shape = four.place()
  expect(shape).toStrictEqual([
    [4, 0],
    [4, 4],
    [0, 4],
  ])
  expect(four.place()).toBe(false)
})

test('rotate five', () => {
  const five = new Five()
  let shape = five.place()
  expect(shape).toStrictEqual(FIVE)
  shape = five.place()
  expect(shape).toStrictEqual([
    [5, 0, 0, 0],
    [5, 5, 5, 5],
  ])

  shape = five.place()
  expect(shape).toStrictEqual([
    [5, 5],
    [5, 0],
    [5, 0],
    [5, 0],
  ])

  shape = five.place()
  expect(shape).toStrictEqual([
    [5, 5, 5, 5],
    [0, 0, 0, 5],
  ])

  shape = five.place()
  expect(shape).toStrictEqual(false)
})

test('rotate six', () => {
  const six = new Six()
  let shape = six.place()
  expect(shape).toStrictEqual(SIX)

  shape = six.place()
  expect(shape).toStrictEqual([
    [6, 6, 6, 6],
    [6, 0, 0, 0],
  ])

  shape = six.place()
  expect(shape).toStrictEqual([
    [6, 6],
    [0, 6],
    [0, 6],
    [0, 6],
  ])

  shape = six.place()
  expect(shape).toStrictEqual([
    [0, 0, 0, 6],
    [6, 6, 6, 6],
  ])

  shape = six.place()
  expect(shape).toStrictEqual(false)
})

test('rotate seven', () => {
  const seven = new Seven()
  let shape = seven.place()
  expect(shape).toStrictEqual(SEVEN)

  shape = seven.place()
  expect(shape).toStrictEqual([
    [0, 7],
    [7, 7],
    [0, 7],
  ])

  shape = seven.place()
  expect(shape).toStrictEqual([
    [0, 7, 0],
    [7, 7, 7],
  ])

  shape = seven.place()
  expect(shape).toStrictEqual([
    [7, 0],
    [7, 7],
    [7, 0],
  ])

  shape = seven.place()
  expect(shape).toStrictEqual(false)
})

test('rotate eight', () => {
  const eight = new Eight()
  const shape = eight.place()
  expect(shape).toStrictEqual(EIGHT)

  expect(eight.place()).toBe(false)
})

test('rotate nine', () => {
  const nine = new Nine()
  const shape = nine.place()
  expect(shape).toStrictEqual(NINE)

  expect(nine.place()).toBe(false)
})
