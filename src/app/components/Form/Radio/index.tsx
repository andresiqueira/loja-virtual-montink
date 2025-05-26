"use client";

interface RadioProps {
  name: string;
  label?: string;
  option: string;
  selectedOption: string;
  onChange: (value: string) => void;
  isRadioLabelVisible?: boolean;
}

export const Radio = ({
  name,
  option,
  onChange,
  selectedOption,
  isRadioLabelVisible,
}: RadioProps) => {
  
  const handleSelect = (value: string) => {
    onChange(value);
  };

  return (
    <div className="relative" onClick={() => handleSelect(option)}>
      <input
        type="radio"
        name={name}
        value={selectedOption}
        className="hidden"
        onChange={() => handleSelect(option)}
      />
      <label
        htmlFor={`${name}-${option}`}
        className={`flex justify-center text-white text-xs items-center border border-slate-800 rounded-full cursor-pointer w-8 h-8 bg-slate-800`}
        style={{ backgroundColor: option }}
      >
        {isRadioLabelVisible ?? option}
      </label>
    </div>
  );
};
