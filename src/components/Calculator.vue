<template>
  <Grid
    rows="7"
    cols="4"
    gap="2"
    class="w-full sm:max-w-md h-screen sm:h-auto sm:my-10 p-3 pt-12 sm:rounded-lg bg-gray-600"
  >
    <Screen text="Hello World" :error="error" class="col-span-4" />

    <Button variant="red" class="col-span-2">CLEAR</Button>
    <Button variant="yellow">DEL</Button>
    <Button variant="green">/</Button>

    <Button v-for="number in ['7', '8', '9']" :key="number">
      {{ number }}
    </Button>
    <Button variant="green">*</Button>

    <Button v-for="number in ['4', '5', '6']" :key="number">
      {{ number }}
    </Button>
    <Button variant="green">-</Button>

    <Button v-for="number in ['1', '2', '3']" :key="number">
      {{ number }}
    </Button>
    <Button variant="green">+</Button>

    <Button class="col-span-2">0</Button>
    <Button>.</Button>
    <Button variant="green">=</Button>

    <Button variant="yellow" class="col-span-2">SPACE</Button>
    <Button variant="yellow" class="col-span-2">NEGATE</Button>
  </Grid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCalculate } from "../compositions/useCalculate";
import Button from "./Button.vue";
import Screen from "./Screen.vue";
import Grid from "./Grid.vue";

export default defineComponent({
  name: "Calculator",
  components: { Button, Screen, Grid },

  setup: () => {
    const calculate = useCalculate();

    return calculate;
  },
});
</script>
