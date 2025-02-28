<script setup lang="ts">
import { ref, computed } from 'vue';

const volume = ref(null);
const abv = ref(null);
const price = ref(null);
const currency = ref('IDR');

const alcoholVolume = ref(0);
const alcoholPricePerMilliliter = ref(0);
const alcoholPricePerPercent = ref(0);

const isShowCalculator = ref(true);

const isButtonDisabled = computed(() => {
  return !volume.value && !abv.value && !price.value && !currency.value;
});

function calculate() {
  isShowCalculator.value = false;

  alcoholVolume.value = (volume.value * abv.value) / 100;
  alcoholPricePerMilliliter.value = price.value / alcoholVolume.value;
  alcoholPricePerPercent.value = alcoholPricePerMilliliter.value * (volume.value / 100);
}

function floatFormatter(value: number) {
  return parseFloat(value).toFixed(2);
}
</script>

<template>
  <div
    id="calculator-container"
    class="flex max-w-screen min-h-screen justify-center items-center flex-col p-4"
  >
    <h1 class="mb-8 text-3xl">Bang for Your Chug! test</h1>

    <form v-show="isShowCalculator" class="flex flex-col" @submit.prevent="calculate">
      <div class="mb-8 flex flex-col items-center">
        <label for="volume" class="text-xl mb-2">Volume (ml)</label>
        <input
          type="number"
          id="volume"
          name="volume"
          min="0"
          v-model="volume"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center"
        />
      </div>

      <div class="mb-8 flex flex-col items-center">
        <label for="alcohol" class="text-xl mb-2">Alcohol by Volume (%)</label>
        <input
          type="number"
          id="alcohol"
          name="alcohol"
          min="0"
          step=".1"
          v-model="abv"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center"
        />
      </div>

      <div class="mb-8 flex flex-col items-center">
        <label for="price" class="text-xl mb-2">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          v-model="price"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center"
        />
      </div>

      <div class="mb-12 flex flex-col items-center">
        <label for="price" class="text-xl mb-2">Currency</label>
        <input
          type="text"
          id="price"
          name="price"
          v-model="currency"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center"
        />
      </div>

      <div class="flex flex-col items-center">
        <button
          type="submit"
          class="bg-cyan-500 hover:bg-cyan-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded"
          :disabled="isButtonDisabled"
          @submit.prevent="calculate"
        >
          Calculate!
        </button>
      </div>
    </form>

    <div v-show="!isShowCalculator" class="flex flex-col items-center">
      <p>Info:</p>
      <p class="mb-6 text-xl">{{ volume }}ml, {{ abv }}%, {{ price }} {{ currency }}</p>
      <p>Total alcohol:</p>
      <p class="mb-6 text-xl font-semibold">{{ alcoholVolume }}ml</p>
      <p>Alcohol price:</p>
      <p class="text-xl">
        <span class="font-semibold"
          >{{ floatFormatter(alcoholPricePerMilliliter) }} {{ currency }}</span
        >
        per <span class="font-semibold">ml</span>
      </p>
      <p class="text-xl mb-12">
        <span class="font-semibold"
          >{{ floatFormatter(alcoholPricePerPercent) }} {{ currency }}</span
        >
        per <span class="font-semibold">1%</span>
      </p>

      <button
        type="submit"
        class="border-1 border-cyan-500 hover:border-cyan-700 text-cyan-500 hover:text-cyan-700 font-bold py-2 px-4 rounded cursor-pointer"
      >
        Calculate another bottle!
      </button>
    </div>
  </div>
</template>
