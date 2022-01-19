<script setup lang="ts">
  type ButtonColor = 'white' | 'yellow' | 'red' | 'blue'
  // button color depends on props.color
  // default: white

  const props = withDefaults(defineProps<{ color?: ButtonColor }>(), {
    color: 'white'
  })

  const btnColorClass = {
    front: `bg-btn-${props.color} group-active:bg-btn-${props.color}-active text-btn-${props.color}-font`,
    edge: `bg-btn-${props.color}-shadow`
  }
</script>

<template>
  <button class="btn relative cursor-pointer select-none group outline-none text-black group">
    <span
      class="shadow absolute inset-0 w-full h-full rounded-3xl bg-black/25 will-change-transform transform translate-x-[2px] translate-y-[2px] transition-transform duration-600 btn-in"
      group-hover="transform translate-x-[4px] translate-y-[4px] transition-transform duration-250 btn-out"
      group-active="transform translate-x-[1px] translate-y-[1px] transition-transform duration-34"
    ></span>
    <span class="absolute inset-0 w-full h-full rounded-3xl" :class="btnColorClass.edge"></span>
    <span
      class="front relative block w-full h-full rounded-3xl text-4xl font-viga flex justify-center items-center will-change-transform transform -translate-x-[4px] -translate-y-[4px] transition-transform duration-600 btn-in"
      group-hover="transform -translate-x-[6px] -translate-y-[6px] transition-transform duration-250 btn-out"
      group-active="transform -translate-x-[3px] -translate-y-[3px] transition-transform duration-34"
      :class="btnColorClass.front"
    >
      <slot></slot>
    </span>
  </button>
</template>
