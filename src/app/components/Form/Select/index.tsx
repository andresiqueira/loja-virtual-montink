"use client";

import { useState } from "react";

export interface SelectProps {
  currentQuantity: number;
  name: string;
  label: string;
  quantity: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const Select = ({
  name,
  label,
  quantity,
  onChange,
  currentQuantity,
  placeholder = "Selecione uma opção",
}: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option: number) => {

    onChange(option);
    setShowOptions(false);
  };

  return (
    <div className="flex flex-col gap-2 relative w-full">
      <label htmlFor={name} className="text-sm font-light">
        {label}
      </label>
      <input
        name={name}
        value={currentQuantity !== 0 ? currentQuantity : placeholder}
        className="border outline-none bg-white rounded-sm p-4 cursor-pointer font-normal text-base text-slate-600 caret-transparent"
        onClick={() => setShowOptions(!showOptions)}
        onChange={() => {}}
      />
        
      {showOptions && (
        <div className="absolute z-10 top-7 w-full bg-white border border-gray-300 rounded-sm shadow-lg">
          {Array.from({ length: quantity }, (_, index) => index + 1).map((_option, index) => (
            <div
              key={index + 1}
              className="p-2 hover:bg-gray-100 cursor-pointer text-base text-slate-600"
              onClick={() => handleSelect(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};