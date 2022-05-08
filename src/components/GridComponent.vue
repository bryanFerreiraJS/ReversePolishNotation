<template>
  <div :class="`grid grid-rows-${rows} grid-cols-${cols} gap-${gap}`">
    <slot />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GridComponent',
  props: {
    rows: { type: [String, Number], required: true },
    cols: { type: [String, Number], required: true },
    gap: { type: [String, Number], default: 0 },
  },
});
</script>
