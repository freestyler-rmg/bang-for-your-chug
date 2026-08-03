import InputField from '../atoms/InputField';

interface InputFieldProps {
  drinkName: string;
  setDrinkName: (value: string) => void;
  volume: string;
  onSetVolume: (value: string) => void;
  isVolumeInvalid: boolean;
  abv: string;
  onSetAbv: (value: string) => void;
  isAbvInvalid: boolean;
  price: string;
  onSetPrice: (value: string) => void;
  isPriceInvalid: boolean;
  currency: string;
  setCurrency: (value: string) => void;
  isCurrencyDisabled: boolean;
  drinkNameRef?: React.Ref<HTMLInputElement>;
}

export default function InputFields({
  drinkName,
  setDrinkName,
  volume,
  onSetVolume,
  isVolumeInvalid,
  abv,
  onSetAbv,
  isAbvInvalid,
  price,
  onSetPrice,
  isPriceInvalid,
  currency,
  setCurrency,
  isCurrencyDisabled,
  drinkNameRef,
}: InputFieldProps) {
  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <InputField
          title="Drink Name"
          emoji="🍶"
          value={drinkName}
          ref={drinkNameRef}
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
          isError={isAbvInvalid}
          errorMessage="Percentage is a number thingy"
        />
      </div>

      <div className="mb-8 flex flex-col items-center">
        <InputField
          title="Price"
          emoji="💵"
          value={price}
          onValueChange={onSetPrice}
          isError={isPriceInvalid}
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
