"use client";

import { FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  submitHandle: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const Form = ({ submitHandle, children, ...rest }: FormProps) => {
  return (
    <>
      <form className="flex flex-col w-full gap-4" onSubmit={submitHandle} {...rest}>
        {children}
      </form>
    </>
  );
};
