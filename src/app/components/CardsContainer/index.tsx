import { ReactNode } from "react";

export const CardsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-start gap-11 w-[85%] max-w-[1600px]">
      {children}
    </div>
  );
};
