<script setup lang="ts">
import GradualBlur, { type GradualBlurProps } from './GradualBlur.vue';

const props = defineProps<GradualBlurProps>();
const emit = defineEmits<{
  (e: 'animationComplete'): void;
}>();
</script>

<template>
  <GradualBlur v-bind="props" @animation-complete="emit('animationComplete')">
    <slot />
  </GradualBlur>
</template>
