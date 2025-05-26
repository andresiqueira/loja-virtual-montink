"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { RadioContainer } from "@/app/components/RadioContainer";
import { storeCart } from "@/app/actions/action-cart";
import { useExpiringLocalStorage } from "@/app/hooks/useExpiringLocalStorage";
import { Select } from "@/app/components/Form/Select";
import { Radio } from "@/app/components/Form/Radio";
import { useSelectedProductContext } from "@/app/contexts/SelectedProduct";
import { Form } from "@/app/components/Form";
import { SubmitButton } from "@/app/components/SubmitButton";

interface ProductCustomizationContainerProps {
  onColorChange: (value: string) => void;
  currentColor: string;
}

type StoreCartSuccess = {
  productId?: string;
  productName?: string;
  color: string;
  size: string;
  quantity: string;
};

type StoreCartError = {
  errors: string;
};

export type StoreCartResponse = StoreCartSuccess | StoreCartError;

export const ProductCustomizationContainer = ({
  onColorChange,
  currentColor,
}: ProductCustomizationContainerProps) => {
  const [currentProductColor, setCurrentProductColor] = useState<string>("");
  const [currentProductSize, setCurrentProductSize] = useState<string>("");
  const [responseApi, setResponseApi] = useState<StoreCartResponse>();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  const { selectedProduct } = useSelectedProductContext();
  const { setItem } = useExpiringLocalStorage();

  const handleRadioColorsChange = (value: string) => {
    setCurrentProductColor(value);
  };

  const handleSizeChange = (value: string) => {
    setCurrentProductSize(value);
  };

  const handleQuantityChange = (selected: number) => {
    setSelectedQuantity(selected);
  };

  const isStoreCartError = (
    response: StoreCartResponse
  ): response is StoreCartError => {
    return (response as StoreCartError).errors !== undefined;
  };

  useEffect(() => {
    if (responseApi) {
      if (isStoreCartError(responseApi)) {
        toast.error(responseApi.errors, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          progress: 0,
          toastId: "error",
        });
      } else {
        toast.success("Produto adicionado ao carrinho com sucesso!", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          progress: 0,
          toastId: "success",
        });
        setItem("cart", responseApi, 15);
      }
    }
  }, [responseApi, setItem]);

  const handleCartSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productId", selectedProduct.id);
    formData.append("productName", selectedProduct.name);
    formData.append("color", currentProductColor);
    formData.append("size", currentProductSize);
    formData.append("quantity", selectedQuantity.toString());

    const result = await storeCart(formData);
    setResponseApi(result);

    setSelectedQuantity(0);
    setCurrentProductColor("");
    setCurrentProductSize("");
  };

  return (
    <Form
      submitHandle={handleCartSubmit}
      className="p-5 flex flex-col gap-6 lg:w-1/2 w-full h-full bg-slate-300"
    >
      <RadioContainer label="Selecione a cor:">
        {currentColor &&
          selectedProduct.variants.map((variant) => (
            <Radio
              key={variant.colorName.label}
              name="color"
              label={variant.colorName.label}
              option={variant.colorName.value}
              selectedOption={currentProductColor}
              onChange={(data) => {
                onColorChange(data);
                handleRadioColorsChange(data);
              }}
              isRadioLabelVisible={false}
            />
          ))}
      </RadioContainer>

      <RadioContainer label="Selecione o tamanho:">
        {currentColor &&
          selectedProduct.size.map((size) => (
            <Radio
              key={size.label}
              name="size"
              label={size.label}
              option={size.value}
              selectedOption={currentProductSize}
              onChange={handleSizeChange}
            />
          ))}
      </RadioContainer>
      {currentColor && (
        <Select
          name="quantidade"
          label="Estoque disponível:"
          quantity={selectedProduct.quantity}
          currentQuantity={selectedQuantity}
          onChange={handleQuantityChange}
        />
      )}

      <SubmitButton type="submit" label="Comprar" />
    </Form>
  );
};
