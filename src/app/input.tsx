interface InputProps {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Input({
  value,
  setValue,
  min = 1,
  max = 20,
}: InputProps) {
  const onChange = (value: number) => {
    value = Math.max(min, Math.min(max, value));
    setValue(value);
  };

  return (
    <div className="flex shrink grow">
      <button
        className="w-10 shrink-0 rounded-bl-md rounded-tl-md border border-gray-400 transition-colors duration-200 hover:border-gray-600 disabled:border-gray-400"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        -
      </button>
      <input
        className="w-0 min-w-8 flex-shrink flex-grow border-y border-gray-400 p-2 text-center transition-colors duration-200 hover:border-gray-600"
        type="text"
        value={value}
        onChange={({ target: { value } }) => onChange(+value)}
      />
      <button
        className="w-10 shrink-0 rounded-br-md rounded-tr-md border border-gray-400 transition-colors duration-200 hover:border-gray-600 disabled:border-gray-400"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
