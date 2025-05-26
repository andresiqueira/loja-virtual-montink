import { CepComponent } from "@/app/components/CepComponent";
import { ProductProps } from "@/app/utils/products";

interface ProductDetailsContainerProps {
  selectedProduct: ProductProps;
  currentProductColor: string;
}

export const ProductDetailsContainer = ({currentProductColor, selectedProduct}: ProductDetailsContainerProps) => {

  return (
    <div className="p-5 flex flex-col gap-6 lg:w-1/2 w-full h-full bg-slate-800 text-white">
      <h4 className="text-2xl font-semibold">
        {currentProductColor && selectedProduct.name}
      </h4>
      <h5 className="text-3xl">{`R$ ${
        currentProductColor && selectedProduct.price
      }`}</h5>
      <p className="text-md">
        {currentProductColor && selectedProduct.description}
      </p>
      <span className="mt-auto">
        <CepComponent />
      </span>
    </div>
  );
};
