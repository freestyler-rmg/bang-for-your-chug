<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

const volume = ref<null | number>(null);
const abv = ref<null | number>(null);
const price = ref<null | number>(null);
const currency = ref<string>('IDR');

const alcoholVolume = ref<number>(0);
const alcoholPricePerMilliliter = ref<number>(0);
const alcoholPricePerPercent = ref<number>(0);

const isShowResult = ref<boolean>(false);

const isButtonDisabled = computed((): boolean => {
  return !volume.value || !abv.value || !price.value || !currency.value;
});

interface History {
  volume: number;
  abv: number;
  price: number;
  currency: string;
  alcoholVolume: number;
  alcoholPricePerMilliliter: string;
  alcoholPricePerPercent: string;
}

const history = ref<History[]>([]);

function currencyFormatter(value: number) {
  return new Intl.NumberFormat(currency.value.toLowerCase() === 'idr' ? 'id' : 'en', {
    maximumFractionDigits: 2,
  }).format(value);
}

async function calculate() {
  isShowResult.value = true;

  const alcoholVolume = (volume.value * abv.value) / 100;
  const alcoholPricePerMilliliter = currencyFormatter(price.value / alcoholVolume);
  const alcoholPricePerPercent = currencyFormatter(
    (price.value / alcoholVolume) * (volume.value / 100),
  );

  if (history.value.length > 1) {
    history.value.shift();
  }

  history.value.push({
    volume: volume.value,
    abv: abv.value,
    price: price.value,
    currency: currency.value,
    alcoholVolume: alcoholVolume,
    alcoholPricePerMilliliter: alcoholPricePerMilliliter,
    alcoholPricePerPercent: alcoholPricePerPercent,
  });

  await nextTick();

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth', // Optional: Add smooth scrolling effect
  });
}
</script>

<template>
  <div
    id="calculator-container"
    class="flex max-w-screen min-h-screen justify-center items-center flex-col px-4 py-8"
  >
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-3xl">Bang for Your Chug!</h1>
      <p class="text-sm">
        Alcoholic beverage ain't cheap,<br />but doesn't mean you can't efficiently reap what you
        sip.
      </p>
    </div>

    <form class="flex flex-col" @submit.prevent="calculate">
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
          class="bg-cyan-500 hover:bg-cyan-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
          :disabled="isButtonDisabled"
          @submit.prevent="calculate"
        >
          Calculate the alcohol price!
        </button>
      </div>
    </form>

    <div v-if="isShowResult">
      <hr class="w-md pb-8 mt-8 mx-auto" />
      <div class="flex flex-row gap-12 justify-center items-center">
        <template v-for="(item, index) in history">
          <div class="text-center">
            <p class="font-semibold text-sm mb-4">{{ index === 0 ? 'Prev' : 'New' }}</p>
            <p>Total alcohol:</p>
            <p class="mb-6 text-xl font-semibold">{{ item.alcoholVolume }}ml</p>
            <p>Alcohol price:</p>
            <p class="text-xl">
              <span class="font-semibold"
                >{{ item.alcoholPricePerMilliliter }} {{ item.currency }}</span
              >
              per <span class="font-semibold">ml</span>
            </p>
            <p class="text-xl mb-12">
              <span class="font-semibold"
                >{{ item.alcoholPricePerPercent }} {{ item.currency }}</span
              >
              per <span class="font-semibold">1% ({{ item.volume / 100 }}ml)</span>
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
