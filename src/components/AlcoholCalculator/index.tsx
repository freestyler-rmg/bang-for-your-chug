/*
CHECKLIST
- auto focus on drink name input on load
- auto focus on drink name input on function onAddNewDrink
*/

import { useState, useMemo, useEffect } from 'react';

import InputFields from './organisms/InputFields';
import WelcomeHeader from './organisms/WelcomeHeader';
import ResultSection from './organisms/ResultSection';

import { CurrencyContext } from './contexts/CurrencyContext';

import type { inputtedHistory } from '../../types';

export default function AlcoholCalculator() {
  const [drinkName, setDrinkName] = useState<string>('');
  const [volume, setVolume] = useState<string>('');
  const [abv, setAbv] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [currency, setCurrency] = useState('IDR');

  const [isVolumeOnChange, setIsOnVolumeOnChange] = useState<boolean>(false);
  const [isAbvOnChange, setIsOnAbvOnChange] = useState<boolean>(false);
  const [isPriceOnChange, setIsOnPriceOnChange] = useState<boolean>(false);

  // TODO: add different error message for abv > 100 and abv < 1
  const isVolumeInvalid = (isVolumeOnChange && !volume.length) || isNaN(volume);
  const isAbvInvalid = (isAbvOnChange && !abv.length) || isNaN(abv);
  const isPriceInvalid = (isPriceOnChange && !price.length) || isNaN(price);
  const isButtonDisabled = isVolumeInvalid || isAbvInvalid || isPriceInvalid || !currency;

  function onSetVolume(value: string) {
    setVolume(value);
    if (!isVolumeOnChange) {
      setIsOnVolumeOnChange(true);
    }
  }

  function onSetAbv(value: string) {
    setAbv(value);
    if (!isAbvOnChange) {
      setIsOnAbvOnChange(true);
    }
  }

  function onSetPrice(value: string) {
    setPrice(value);
    if (!isPriceOnChange) {
      setIsOnPriceOnChange(true);
    }
  }

  // 📜 CODE BLOCK - calculate
  const [history, setHistory] = useState<inputtedHistory[]>([]);
  const [isShowResult, setIsShowResult] = useState(false);

  const isCurrencyDisabled = history.length > 0;

  function calculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsShowResult(true);

    const alcoholVolume = (Number(volume) * Number(abv)) / 100;
    const alcoholPricePerMilliliter = Number(price) / alcoholVolume;
    const alcoholPricePerPercent = (Number(price) / alcoholVolume) * (Number(volume) / 100);

    const newEntry = {
      name: drinkName,
      volume: volume,
      abv: abv,
      price: price,
      currency: currency,
      alcoholVolume: alcoholVolume,
      alcoholPricePerMilliliter: alcoholPricePerMilliliter,
      alcoholPricePerPercent: alcoholPricePerPercent,
    };

    setHistory((prev) => {
      console.log('prev', prev);
      const updated = [...prev, newEntry];
      return updated.length > 2 ? updated.slice(1) : updated;
    });

    setDrinkName('');
    setVolume('');
    setAbv('');
    setPrice('');
    setIsOnVolumeOnChange(false);
    setIsOnAbvOnChange(false);
    setIsOnPriceOnChange(false);
  }

  useEffect(() => {
    if (isShowResult) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]); // runs after history updates and the DOM reflects it

  // 📜 CODE BLOCK - button interaction
  function onAddNewDrink() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function onReset() {
    setHistory([]);
    setIsShowResult(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // 📜 CODE BLOCK - add green text color to the cheaper drink
  const comparisonFlags = useMemo(() => {
    if (history.length === 2) {
      return history.map((item, index) => {
        const otherItem = history[1 - index];

        return {
          isMoreAlcoholVolume: item.alcoholVolume > otherItem.alcoholVolume,
          isAlcoholPricePerMlCheaper:
            item.alcoholPricePerMilliliter < otherItem.alcoholPricePerMilliliter,
          isAlcoholPricePerPercentCheaper:
            item.alcoholPricePerPercent < otherItem.alcoholPricePerPercent,
        };
      });
    }

    return history.map((item) => ({
      isMoreAlcoholVolume: false,
      isAlcoholPricePerMlCheaper: false,
      isAlcoholPricePerPercentCheaper: false,
    }));
  }, [history]);

  // 🖨️ - Render
  return (
    <>
      <div className="flex max-w-screen min-h-screen justify-center items-center flex-col px-4 py-8">
        <WelcomeHeader />

        <form className="flex flex-col max-w-sm w-full" onSubmit={calculate}>
          <InputFields
            drinkName={drinkName}
            setDrinkName={setDrinkName}
            volume={volume}
            onSetVolume={onSetVolume}
            isVolumeInvalid={isVolumeInvalid}
            abv={abv}
            onSetAbv={onSetAbv}
            isAbvInvalid={isAbvInvalid}
            price={price}
            onSetPrice={onSetPrice}
            isPriceInvalid={isPriceInvalid}
            currency={currency}
            setCurrency={setCurrency}
            isCurrencyDisabled={isCurrencyDisabled}
          />

          <div className="flex flex-col items-center">
            <p className="text-sm text-center mb-4">
              Alcoholic beverage ain't cheap,
              <br />
              but that doesn't mean you can't efficiently
              <br className="md:hidden" />
              reap what you sip.
            </p>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
              disabled={isButtonDisabled}
            >
              Calculate the alcohol price! 🧮
            </button>
          </div>
        </form>

        <CurrencyContext.Provider value={currency}>
          <ResultSection
            isShowResult={isShowResult}
            history={history}
            comparisonFlags={comparisonFlags}
            onAddNewDrink={onAddNewDrink}
            onReset={onReset}
          />
        </CurrencyContext.Provider>
      </div>
    </>
  );
}
