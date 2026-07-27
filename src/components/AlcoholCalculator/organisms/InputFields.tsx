import InputField from '../atoms/InputField';

interface InputFieldProps {
  drinkName: string;
  setDrinkName: string;
  volume: string;
  onSetVolume: () => void;
  isVolumeInvalid: boolean;
  abv: string;
  onSetAbv: () => void;
  price: string;
  onSetPrice: () => void;
  currency: string;
  setCurrency: () => void;
  isCurrencyDisabled: boolean;
}

export default function InputFields({
  drinkName,
  setDrinkName,
  volume,
  onSetVolume,
  isVolumeInvalid,
  abv,
  onSetAbv,
  price,
  onSetPrice,
  currency,
  setCurrency,
  isCurrencyDisabled,
}: InputFieldProps) {
  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <InputField title="Drink Name" emoji="🍶" value={drinkName} onValueChange={setDrinkName} />
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
    </>
  );
}
