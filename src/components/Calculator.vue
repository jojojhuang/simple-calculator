<script setup lang="ts">
  import CalculatorButton from '@/components/CalculatorButton.vue'
  import CalculatorScreen from '@/components/CalculatorScreen.vue'
  import { useCalculateStore } from '@/store/calculateStore'
  import { OPERATORS, DIGITS } from '@/utils'

  const emit = defineEmits(['toggle'])

  const { addDigit, addOperator, eraseLast, cacluteResult, clear } = useCalculateStore()
</script>

<template>
  <div
    class="cacl relative w-full max-w-[450px] grid grid-cols-4 gap-4 bg-gradient-to-br from-[#b8bfcc] via-[#8d99ae] to-[#6a7383] grid-flow-row-dense p-5 rounded-3xl"
  >
    <div
      class="absolute decoration transform bottom-1 left-3/5 rotate-90 md:(rotate-0 bottom-auto left-auto top-19 right-0) cursor-pointer"
      @click="emit('toggle')"
    >
      <i class="block bg-btn-blue w-10 h-2" />
      <i class="block bg-btn-red w-10 h-2 my-1" />
      <i class="block bg-btn-blue w-10 h-2" />
    </div>
    <calculator-screen class="aspect-8/3 col-span-4 m-2" />
    <calculator-button class="aspect-square" color="red" @click="clear">AC</calculator-button>
    <calculator-button class="aspect-square" color="yellow" @click="eraseLast">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
        />
      </svg>
    </calculator-button>
    <calculator-button class="aspect-square" color="blue" @click="addDigit('%')"
      >%</calculator-button
    >
    <calculator-button
      color="blue"
      class="aspect-square col-start-4"
      v-for="i in OPERATORS"
      @click="addOperator(i)"
    >
      {{ i }}
    </calculator-button>
    <calculator-button class="aspect-square" v-for="i in DIGITS.slice(7, 10)" @click="addDigit(i)"
      >{{ i }}
    </calculator-button>
    <calculator-button class="aspect-square" v-for="i in DIGITS.slice(4, 7)" @click="addDigit(i)"
      >{{ i }}
    </calculator-button>
    <calculator-button class="aspect-square" v-for="i in DIGITS.slice(1, 4)" @click="addDigit(i)"
      >{{ i }}
    </calculator-button>
    <calculator-button class="aspect-square" @click="addDigit('0')"> 0 </calculator-button>
    <calculator-button class="aspect-square" @click="addDigit('.')"> . </calculator-button>
    <calculator-button class="aspect-272/125 col-span-2" @click="cacluteResult">
      =
    </calculator-button>
  </div>
</template>
