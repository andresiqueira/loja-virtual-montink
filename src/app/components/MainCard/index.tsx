"use client";

import { useState, useEffect } from "react";

import { useSelectedProductContext } from "@/app/contexts/SelectedProduct";
import { ProductCustomizationContainer } from "@/app/components/ProductCustomizationContainer";
import { ImageContainer } from "@/app/components/ImageContainer";
import { ProductDetailsContainer } from "@/app/components/ProductDetailsContainer";

export const LoadingMainCard = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 w-[85%] max-w-[1600px] bg-slate-100 min-h-[700px] rounded-md shadow-md p-5 box-border">
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-lg font-semibold">Carregando...</p>
      </div>
    </div>
  );
};

export const MainCard = () => {
  const { selectedProduct } = useSelectedProductContext();
  const [currentProductColor, setCurrentProductColor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const data = localStorage.getItem("cart");

    if (data) {
      setCurrentProductColor(JSON.parse(data).value.color);
    } else {
      setCurrentProductColor(selectedProduct.variants[0].colorName.value);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedProduct]);

  const handleRadioColorsChange = (value: string) => {
    setCurrentProductColor(value);
  };

  if (loading) {
    return <LoadingMainCard />;
  }

  return (
    <div className="flex flex-wrap lg:flex-row flex-col justify-center gap-8 w-[85%] max-w-[1600px] bg-slate-100 min-h-[700px] rounded-md shadow-md p-5 box-border">
      <ImageContainer
        selectedProduct={selectedProduct}
        currentProductColor={currentProductColor}
      />

      <div className="flex lg:flex-row flex-col bg-white lg:gap-0 gap-4 lg:w-[60%] w-full min-h-80">
        <ProductCustomizationContainer
          onColorChange={handleRadioColorsChange}
          currentColor={currentProductColor}
        />

        <ProductDetailsContainer
          currentProductColor={currentProductColor}
          selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
};
