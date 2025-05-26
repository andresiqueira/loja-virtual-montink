
import { ProductProps } from "@/app/utils/products";
import Image from "next/image";

interface ImageContainerProps {
  selectedProduct: ProductProps;
  currentProductColor: string;
}

export const ImageContainer = ({selectedProduct, currentProductColor}: ImageContainerProps) => {
  return (
    <div className="flex flex-col justify-center items-center lg:w-[35%] w-full min-h-80 relative">
      {selectedProduct.variants
        .filter((item) =>
          selectedProduct.variants.some(
            (variant) => variant.colorName.value === currentProductColor
          )
            ? item.colorName.value === currentProductColor
            : item === selectedProduct.variants[0]
        )
        .map(
          (item) =>
            item.image && (
              <Image
                key={item.image}
                src={item.image}
                alt={item.colorName.label}
                width={480}
                height={0}
                className="rounded-md"
              />
            )
        )}
    </div>
  );
};
