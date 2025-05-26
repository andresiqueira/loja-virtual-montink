"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductProps, products as initialProducts } from "@/app/utils/products";

interface ProductContextProps {
  products: ProductProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductProps[]>(initialProducts);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext deve ser usado dentro de um ProductProvider");
  }
  return context;
};