import { useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyContext';
import { currencyFormatter } from '../../../utils/formatter';
import type { inputtedHistory, comparisonFlag } from '../../../types';

type ResultItemProps = {
  item: inputtedHistory;
  index: number;
  comparisonFlag?: comparisonFlag;
  isHistoryItemsMoreThanOne: boolean;
};

export default function ResultItem({
  item,
  index,
  comparisonFlag,
  isHistoryItemsMoreThanOne,
}: ResultItemProps) {
  const currency = useContext(CurrencyContext);

  return (
    <>
      <div className="text-center border border-neutral-700 py-4 px-6 rounded-2xl max-w-sm w-full">
        {isHistoryItemsMoreThanOne && (
          <p className="font-semibold mb-4 text-2xl">{index === 0 ? '⏮️' : '🆕'}</p>
        )}
        <p>Drink name:</p>
        <p className="text-2xl font-semibold capitalize">{item.name}</p>
        <p className="mb-6 text-sm text-gray-400">
          {item.volume}ml, abv {item.abv}%, {currencyFormatter(Number(item.price), currency)}
          {item.currency}
        </p>
        <p>Total alcohol:</p>
        <p
          className={`mb-6 text-xl font-semibold ${comparisonFlag.isMoreAlcoholVolume ? 'text-green-400' : ''}`}
        >
          {item.alcoholVolume}ml
        </p>
        <p>Alcohol price:</p>
        <p className="text-xl">
          <span
            className={`font-semibold ${comparisonFlag.isAlcoholPricePerMlCheaper ? 'text-green-400' : ''}`}
          >
            {currencyFormatter(item.alcoholPricePerMilliliter, currency)} {item.currency}
          </span>
          &nbsp;per <span className="font-semibold">ml</span>
        </p>
        <p className="text-xl mb-1">
          <span
            className={`font-semibold ${comparisonFlag.isAlcoholPricePerPercentCheaper ? 'text-green-400' : ''}`}
          >
            {currencyFormatter(item.alcoholPricePerPercent, currency)} {item.currency}
          </span>
          &nbsp;per <span className="font-semibold">1% ({Number(item.volume) / 100}ml)</span>
        </p>
      </div>
    </>
  );
}
