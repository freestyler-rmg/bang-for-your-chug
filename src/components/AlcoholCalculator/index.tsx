/*
CHECKLIST
move input field to input fields
*/

import { useState, useMemo } from 'react';

import InputFields from './organisms/InputFields';
import InputField from './atoms/InputField';
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
  const isAbvInvalid = !abv.length || isNaN(abv);
  const isPriceInvalid = !price.length || isNaN(price);
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

  function calculate(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsShowResult(true);

    const alcoholVolume = (Number(volume) * Number(abv)) / 100;
    const alcoholPricePerMilliliter = Number(price) / alcoholVolume;
    const alcoholPricePerPercent = (Number(price) / alcoholVolume) * (Number(volume) / 100);

    if (history.length > 1) {
      setHistory(history.slice(1));
    }

    setHistory([
      ...history,
      {
        name: drinkName,
        volume: volume,
        abv: abv,
        price: price,
        currency: currency,
        alcoholVolume: alcoholVolume,
        alcoholPricePerMilliliter: alcoholPricePerMilliliter,
        alcoholPricePerPercent: alcoholPricePerPercent,
      },
    ]);

    setDrinkName('');
    setVolume('');
    setAbv('');
    setPrice('');
    setIsOnVolumeOnChange(false);
    setIsOnAbvOnChange(false);
    setIsOnPriceOnChange(false);

    // window.scrollTo({
    //   top: document.body.scrollHeight,
    //   behavior: 'smooth', // Optional: Add smooth scrolling effect
    // });
  }

  function onReset() {
    setHistory([]);
    setIsShowResult(false);

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth', // Optional: Add smooth scrolling effect
    // });
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

  return (
    <>
      <div className="flex max-w-screen min-h-screen justify-center items-center flex-col px-4 py-8">
        <WelcomeHeader />

        <form className="flex flex-col max-w-sm w-full" onSubmit={calculate}>
          {/* TODO: move these InputField into InputFields */}
          <div className="mb-8 flex flex-col items-center">
            <InputField
              title="Drink Name"
              emoji="🍶"
              value={drinkName}
              onValueChange={setDrinkName}
            />
          </div>

          <div className="mb-8 flex flex-col items-center">
            <InputField
              title="Volume (ml)"
              emoji="⚖️"
              value={volume}
              onValueChange={onSetVolume}
              isError={isVolumeInvalid}
              errorMessage="Milliliter supposed to be in number, ya know"
            />
          </div>

          <div className="mb-8 flex flex-col items-center">
            <InputField
              title="Alcohol by Volume (%)"
              emoji="🍷"
              value={abv}
              onValueChange={onSetAbv}
              errorMessage="Percentage is a number thingy"
            />
          </div>

          <div className="mb-8 flex flex-col items-center">
            <InputField
              title="Price"
              emoji="💵"
              value={price}
              onValueChange={onSetPrice}
              errorMessage="Price is...... a number, right?"
            />
          </div>

          <div className="mb-8 flex flex-col items-center">
            <InputField
              title="Currency"
              emoji="💲"
              value={currency}
              onValueChange={setCurrency}
              isDisabled={isCurrencyDisabled}
              isSmall
            />
          </div>

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
              className="bg-cyan-500 hover:bg-cyan-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded cursor-pointer"
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
            onReset={onReset}
          />
        </CurrencyContext.Provider>
      </div>
    </>
  );
}
