"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const SubmitButton = ({ label, ...rest }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      className="bg-red-400 w-full mt-auto h-12 rounded-sm text-white"
      aria-disabled={pending}
      disabled={pending}
    >
      {label}
    </button>
  );
};
