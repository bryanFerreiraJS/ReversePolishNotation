<template>
  <GridComponent
    rows="7"
    cols="4"
    gap="2"
    class="w-full sm:max-w-md h-screen sm:h-auto sm:my-10 p-3 pt-12 sm:rounded-lg bg-gray-600"
  >
    <ScreenComponent
      :text="memory"
      :error="error"
      class="col-span-4"
    />

    <ButtonComponent
      variant="red"
      class="col-span-2"
      @click="clear"
    >
      CLEAR
    </ButtonComponent>
    <ButtonComponent
      variant="yellow"
      @click="eraseLast"
    >
      DEL
    </ButtonComponent>
    <ButtonComponent
      variant="green"
      @click="addOperator('/')"
    >
      /
    </ButtonComponent>

    <ButtonComponent
      v-for="number in ['7', '8', '9']"
      :key="number"
      @click="addDigit(number)"
    >
      {{ number }}
    </ButtonComponent>
    <ButtonComponent
      variant="green"
      @click="addOperator('*')"
    >
      *
    </ButtonComponent>

    <ButtonComponent
      v-for="number in ['4', '5', '6']"
      :key="number"
      @click="addDigit(number)"
    >
      {{ number }}
    </ButtonComponent>
    <ButtonComponent
      variant="green"
      @click="addOperator('-')"
    >
      -
    </ButtonComponent>

    <ButtonComponent
      v-for="number in ['1', '2', '3']"
      :key="number"
      @click="addDigit(number)"
    >
      {{ number }}
    </ButtonComponent>
    <ButtonComponent
      variant="green"
      @click="addOperator('+')"
    >
      +
    </ButtonComponent>

    <ButtonComponent
      class="col-span-2"
      @click="addDigit('0')"
    >
      0
    </ButtonComponent>
    <ButtonComponent @click="addDigit('.')">
      .
    </ButtonComponent>
    <ButtonComponent
      variant="green"
      @click="calculateResult"
    >
      =
    </ButtonComponent>

    <ButtonComponent
      variant="yellow"
      class="col-span-2"
      @click="addSpace"
    >
      SPACE
    </ButtonComponent>
    <ButtonComponent
      variant="yellow"
      class="col-span-2"
      @click="addNegate"
    >
      NEGATE
    </ButtonComponent>
  </GridComponent>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useCalculate } from '@/compositions/useCalculate';
import ButtonComponent from './ButtonComponent.vue';
import ScreenComponent from './ScreenComponent.vue';
import GridComponent from './GridComponent.vue';

export default defineComponent({
  name: 'CalculatorComponent',
  components: { ButtonComponent, ScreenComponent, GridComponent },

  setup: () => useCalculate(),
});
</script>
