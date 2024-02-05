<template>
  <section style="display: flex; gap: 10px; flex-wrap: wrap;">
    <div>
      <button @click="handleClick">
        click me
      </button>
      <table>
        <tbody @click="handleToggle">
          <tr
            v-for="(row, ri) in grid.grid"
            :key="`row-${ri}`"
          >
            <td
              v-for="(column, ci) in row"
              :Key="`column-${ci}`"
              :class="[column ? 'fill' : 'blank', `shape-${column}`]"
              :data-col="ci"
              :data-row="ri"
            >
              {{ column }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table
      v-for="(answer, index) in grid.answerList"
      :key="index"
    >
      <tbody>
        <tr
          v-for="(row, ri) in answer"
          :key="`row-${ri}`"
        >
          <td
            v-for="(column, ci) in row"
            :Key="`column-${ci}`"
            :class="[column ? 'fill' : 'blank', `shape-${column}`]"
            :data-col="ci"
            :data-row="ri"
          >
            {{ column }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { execute, executeUtils, run } from './detect'

const GRID = [5, 6]

const grids = ref<number[][]>([])

for (let row = 0; row < GRID[0]; ++row) {
  grids.value.push([])
  for (let column = 0; column < GRID[1]; ++column) {
    grids.value[row].push(0)
  }
}
const COLLECT = {
  one: 1,
  two: 2,
  three: 8,
  four: 6,
  five: 5,
  six: 2,
  seven: 5,
  eight: 1,
  nine: 0,
}
const grid = ref(execute(5, 6, COLLECT))
// const answers = run(grids.value, COLLECT)

function handleClick() {
  executeUtils(grid.value)
}

function handleToggle(evt: MouseEvent) {
  const target = evt.target as HTMLElement
  const { col, row } = target.dataset
  if (col == null || row == null) return

  const colIndex = Number(col)
  const rowIndex = Number(row)
  grid.value.toggle(rowIndex, colIndex)
}
</script>

<style scoped>
.fill {
  background: gray;
}
table {
  border-spacing: 0;
}
td {
  width: 60px;
  height: 60px;
  outline: 1px solid #333;
  cursor: pointer;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.shape-1 {
  background: aqua;
}
.shape-2 {
  background: red;
}
.shape-3 {
  background: blue;
}
.shape-4 {
  background:orange;
}
.shape-5 {
  background: green;
}
.shape-6 {
  background: yellow;
}
.shape-7 {
  background: burlywood;
}
.shape-8 {
  background: yellowgreen;
}
.shape-9 {
  background: crimson;
}
</style>
