"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ProductProps } from "@/app/utils/products";
import { useExpiringLocalStorage } from "@/app/hooks/useExpiringLocalStorage";
import { useProductContext } from "@/app/contexts/Products";

interface SelectedProductContextProps {
  selectedProduct: ProductProps;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductProps>>;
}

export interface CartItemProps {
  productId: string;
  productName: string;
  color: string;
  size: string;
  quantity: string;
}

const SelectedProductContext = createContext<
  SelectedProductContextProps | undefined
>(undefined);

export const SelectedProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { products } = useProductContext();
  const { getItem } = useExpiringLocalStorage();
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(
    products[0]
  );

  useEffect(() => {
    if (getItem("cart")) {
      const cart: CartItemProps | null = getItem("cart");
      const product = products.find(
        (product) => product.id === cart?.productId
      );
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [getItem, products]);

  return (
    <SelectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct }}
    >
      {children}
    </SelectedProductContext.Provider>
  );
};

export const useSelectedProductContext = (): SelectedProductContextProps => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error(
      "useSelectedProductContext deve ser usado dentro de um SelectedProductProvider"
    );
  }
  return context;
};
