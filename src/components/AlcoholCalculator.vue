<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

interface History {
  name: string;
  volume: null | number;
  abv: null | number;
  price: null | number;
  currency: string;
  alcoholVolume: number;
  alcoholPricePerMilliliter: number;
  alcoholPricePerPercent: number;
}

const name = ref<string>('');
const volume = ref<null | number>(null);
const abv = ref<null | number>(null);
const price = ref<null | number>(null);
const currency = ref<string>('IDR');

const isShowResult = ref<boolean>(false);

const history = ref<History[]>([]);

const isButtonDisabled = computed((): boolean => {
  return !volume.value || !abv.value || !price.value || !currency.value;
});

const isCurrencyDisabled = computed((): boolean => {
  return history.value.length > 0;
});

function currencyFormatter(value: number) {
  return new Intl.NumberFormat(currency.value.toLowerCase() === 'idr' ? 'id' : 'en', {
    maximumFractionDigits: 2,
  }).format(value);
}

async function calculate() {
  isShowResult.value = true;

  const alcoholVolume = (volume.value * abv.value) / 100;
  const alcoholPricePerMilliliter = price.value / alcoholVolume;
  const alcoholPricePerPercent = (price.value / alcoholVolume) * (volume.value / 100);

  if (history.value.length > 1) {
    history.value.shift();
  }

  history.value.push({
    name: name.value,
    volume: volume.value,
    abv: abv.value,
    price: price.value,
    currency: currency.value,
    alcoholVolume: alcoholVolume,
    alcoholPricePerMilliliter: alcoholPricePerMilliliter,
    alcoholPricePerPercent: alcoholPricePerPercent,
  });

  name.value = '';
  volume.value = null;
  abv.value = null;
  price.value = null;

  await nextTick();

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth', // Optional: Add smooth scrolling effect
  });
}

function reset() {
  history.value = [];
  isShowResult.value = false;

  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Optional: Add smooth scrolling effect
  });
}

function textColor(index) {
  let alcoholVolumeColor = '';
  let alcoholPricePerMilliliterColor = '';
  let alcoholPricePerPercentColor = '';

  if (history.value.length > 1) {
    if (index === 0) {
      alcoholVolumeColor =
        history.value[0].alcoholVolume > history.value[1].alcoholVolume ? 'text-green-400' : '';
      alcoholPricePerMilliliterColor =
        history.value[0].alcoholPricePerMilliliter < history.value[1].alcoholPricePerMilliliter
          ? 'text-green-400'
          : '';
      alcoholPricePerPercentColor =
        history.value[0].alcoholPricePerPercent < history.value[1].alcoholPricePerPercent
          ? 'text-green-400'
          : '';
    }

    if (index === 1) {
      alcoholVolumeColor =
        history.value[0].alcoholVolume < history.value[1].alcoholVolume ? 'text-green-400' : '';
      alcoholPricePerMilliliterColor =
        history.value[0].alcoholPricePerMilliliter > history.value[1].alcoholPricePerMilliliter
          ? 'text-green-400'
          : '';
      alcoholPricePerPercentColor =
        history.value[0].alcoholPricePerPercent > history.value[1].alcoholPricePerPercent
          ? 'text-green-400'
          : '';
    }
  }

  return {
    alcoholVolumeColor,
    alcoholPricePerMilliliterColor,
    alcoholPricePerPercentColor,
  };
}
</script>

<template>
  <div
    id="calculator-container"
    class="flex max-w-screen min-h-screen justify-center items-center flex-col px-4 py-8"
  >
    <div class="mb-8 text-center">
      <h1 class="mb-4 text-3xl">🍻Bang for Your Chug🍻</h1>
      <p>
        Calculate and compare your <br class="md:hidden" />alcoholic beverages of choice!
        <br class="mb-2 md:mb-0" />
        Find out which one has the highest alcohol content <br class="md:hidden" />and how expensive
        it is per ml or %.
      </p>
    </div>

    <form class="flex flex-col max-w-sm w-full" @submit.prevent="calculate">
      <div class="mb-8 flex flex-col items-center">
        <label for="volume" class="text-xl mb-2">🍶 Drink Name 🍶</label>
        <input
          type="text"
          v-model="name"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center w-full"
        />
      </div>

      <div class="mb-8 flex flex-col items-center">
        <label for="volume" class="text-xl mb-2">⚖️ Volume (ml) ⚖️</label>
        <input
          type="number"
          id="volume"
          name="volume"
          min="0"
          v-model="volume"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center w-full"
        />
      </div>

      <div class="mb-8 flex flex-col items-center">
        <label for="alcohol" class="text-xl mb-2">🍷 Alcohol by Volume (%) 🍷</label>
        <input
          type="number"
          id="alcohol"
          name="alcohol"
          min="0"
          step=".1"
          v-model="abv"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center w-full"
        />
      </div>

      <div class="mb-8 flex flex-col items-center">
        <label for="price" class="text-xl mb-2">💵 Price 💵</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          v-model="price"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center w-full"
        />
      </div>

      <div class="mb-12 flex flex-col items-center">
        <label for="price" class="text-xl mb-2">💲 Currency 💲</label>
        <input
          type="text"
          id="price"
          name="price"
          v-model="currency"
          class="border-1 rounded-sm border-gray-300 px-3 py-2 text-center disabled:border-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-600 w-25"
          :disabled="isCurrencyDisabled"
        />
      </div>

      <div class="flex flex-col items-center">
        <p class="text-sm text-center mb-4">
          Alcoholic beverage ain't cheap,<br />but that doesn't mean you can't efficiently
          <br class="md:hidden" />reap what you sip.
        </p>
        <button
          type="submit"
          class="bg-cyan-500 hover:bg-cyan-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
          :disabled="isButtonDisabled"
          @submit.prevent="calculate"
        >
          Calculate the alcohol price! 🧮
        </button>
      </div>
    </form>

    <div v-if="isShowResult" class="w-full">
      <hr class="max-w-xl w-full pb-8 mt-8 mx-auto" />
      <div class="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mb-8">
        <template v-for="(item, index) in history">
          <div
            class="text-center border-1 border-neutral-700 py-4 px-6 rounded-2xl max-w-sm w-full"
          >
            <p v-if="history.length > 1" class="font-semibold mb-4 text-2xl">
              {{ index === 0 ? '⏮️' : '🆕' }}
            </p>
            <p>Drink name:</p>
            <p class="text-2xl font-semibold capitalize">{{ item.name }}</p>
            <p class="mb-6 text-sm text-gray-400">
              {{ item.volume }}ml, abv {{ item.abv }}%, {{ currencyFormatter(item.price) }}
              {{ item.currency }}
            </p>
            <p>Total alcohol:</p>
            <p class="mb-6 text-xl font-semibold" :class="textColor(index)['alcoholVolumeColor']">
              {{ item.alcoholVolume }}ml
            </p>
            <p>Alcohol price:</p>
            <p class="text-xl">
              <span
                class="font-semibold"
                :class="textColor(index)['alcoholPricePerMilliliterColor']"
                >{{ currencyFormatter(item.alcoholPricePerMilliliter) }} {{ item.currency }}</span
              >
              per <span class="font-semibold">ml</span>
            </p>
            <p class="text-xl mb-1">
              <span class="font-semibold" :class="textColor(index)['alcoholPricePerPercentColor']"
                >{{ currencyFormatter(item.alcoholPricePerPercent) }} {{ item.currency }}</span
              >
              per <span class="font-semibold">1% ({{ item.volume / 100 }}ml)</span>
            </p>
          </div>
        </template>
      </div>

      <div class="text-center">
        <p class="text-sm mb-4">
          Psst, want to compare another drink?<br />Just fill out the form above again!
        </p>
        <button
          @click="reset"
          class="text-rose-700 rounded cursor-pointer border-1 border-rose-800 py-2 px-4 hover:bg-rose-800 hover:text-neutral-50"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
