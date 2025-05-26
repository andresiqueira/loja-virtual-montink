import { ReactNode } from "react";

interface RadioContainerProps {
  label: string;
  children: ReactNode;
}

export const RadioContainer = ({ children, label }: RadioContainerProps) => {
  return (
    <div className="flex flex-col gap-2 w-full box-border overflow-hidden">
      <span className="text-sm font-light">{label}</span>
      <div className="flex flex-row gap-4">{children}</div>
    </div>
  );
};
