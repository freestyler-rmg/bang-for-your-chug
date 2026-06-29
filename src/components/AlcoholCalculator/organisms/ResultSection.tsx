import ResultItem from '../molecules/ResultItem';
import type { inputtedHistory, comparisonFlag } from '../../../types';

type ResultSectionProps = {
  isShowResult: boolean;
  history?: any;
  comparisonFlags?: any;
  onReset: () => void;
};

export default function ResultSection({
  isShowResult,
  history,
  comparisonFlags,
  onReset,
}: ResultSectionProps) {
  {
    return (
      <>
        {isShowResult && (
          <div className="w-full">
            <hr className="max-w-xl w-full pb-8 mt-8 mx-auto" />
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center mb-8">
              {history.map((item: inputtedHistory, index: number) => {
                return (
                  <ResultItem
                    key={index}
                    item={item}
                    comparisonFlag={comparisonFlags[index]}
                    index={index}
                    isHistoryItemsMoreThanOne={history.length > 1}
                  />
                );
              })}
            </div>
            <div className="text-center">
              <p className="text-sm mb-4">
                To compare with another drink,
                <br />
                fill out the form above again.
              </p>
              {/* TODO: add button to scroll to the top and focus on the drink name input */}
              <button
                onClick={(e) => onReset()}
                className="rounded cursor-pointer border border-rose-800 py-2 px-4 hover:bg-rose-800 text-neutral-50"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
