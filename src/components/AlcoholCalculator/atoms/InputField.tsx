type InputFieldProps = {
  title: string;
  emoji?: string;
  value: string;
  onValueChange: (value: string) => void;
  isDisabled?: boolean;
  isSmall?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

const defaultInputStyling = `border rounded-sm border-gray-300 px-3 py-2 text-center disabled:border-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-600`;
const errorInputStyling = 'border-red-300';

function ShowErrorMessage({ isError, errorMessage }: { isError: boolean; errorMessage: string }) {
  if (isError) {
    return <p className="text-red-400 text-xs mt-2">{errorMessage}</p>;
  }
  return null;
}

export default function InputField({
  title,
  emoji,
  value,
  onValueChange,
  isDisabled = false,
  isSmall = false,
  isError = false,
  errorMessage,
}: InputFieldProps) {
  return (
    <>
      <label className="text-xl mb-2">
        {emoji} {title} {emoji}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        disabled={isDisabled}
        className={`${defaultInputStyling} ${isSmall ? 'w-25' : 'w-full'} ${isError && errorInputStyling}`}
      />
      <ShowErrorMessage isError={isError} errorMessage={errorMessage} />
    </>
  );
}
