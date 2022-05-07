<template>
  <Grid
    rows='7'
    cols='4'
    gap='2'
    class='w-full sm:max-w-md h-screen sm:h-auto sm:my-10 p-3 pt-12 sm:rounded-lg bg-gray-600'
  >
    <Screen :text='memory' :error='error' class='col-span-4' />

    <Button variant='red' class='col-span-2' @click='clear'>CLEAR</Button>
    <Button variant='yellow' @click='eraseLast'>DEL</Button>
    <Button variant='green' @click='addOperator("/")'>/</Button>

    <Button v-for='number in ["7", "8", "9"]' :key='number' @click='addDigit(number)'>
      {{ number }}
    </Button>
    <Button variant='green' @click='addOperator("*")'>*</Button>

    <Button v-for='number in ["4", "5", "6"]' :key='number' @click='addDigit(number)'>
      {{ number }}
    </Button>
    <Button variant='green' @click='addOperator("-")'>-</Button>

    <Button v-for='number in ["1", "2", "3"]' :key='number' @click='addDigit(number)'>
      {{ number }}
    </Button>
    <Button variant='green' @click='addOperator("+")'>+</Button>

    <Button class='col-span-2' @click='addDigit("0")'>0</Button>
    <Button @click="addDigit('.')">.</Button>
    <Button variant='green' @click='calculateResult'>=</Button>

    <Button variant='yellow' class='col-span-2' @click='addSpace'>SPACE</Button>
    <Button variant='yellow' class='col-span-2' @click='addNegate'>NEGATE</Button>
  </Grid>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useCalculate } from '../compositions/useCalculate';
import Button from './Button.vue';
import Screen from './Screen.vue';
import Grid from './Grid.vue';

export default defineComponent({
  name: 'Calculator',
  components: { Button, Screen, Grid },

  setup: () => useCalculate(),
});
</script>
