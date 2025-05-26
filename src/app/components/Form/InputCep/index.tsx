"use client";

import { ChangeEvent } from "react";

export interface InputCepProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputCep = ({ name, label, value, onChange, placeholder }: InputCepProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, "");

    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8);
    }

    onChange(inputValue);
  };

  const formattedValueAsCep =
    value.length > 5
      ? `${value.slice(0, 5)}-${value.slice(5)}`
      : value;

  return (
    <div className="flex flex-col gap-2 w-full box-border overflow-hidden">
      <label htmlFor={name} className="text-sm font-light">{label}</label>
      <input
        name={name}
        value={formattedValueAsCep}
        onChange={handleChange}
        type="text"
        placeholder={placeholder}
        className="p-3 outline-none bg-white text-slate-600 rounded-sm w-full box-border shadow-md overflow-hidden"
      />
    </div>
  );
};