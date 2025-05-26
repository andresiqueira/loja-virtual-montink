"use client";

import { useState, useEffect } from "react";
import { useSelectedProductContext } from "@/app/contexts/SelectedProduct";
import { ProductProps } from "@/app/utils/products";
import Image from "next/image";

export interface CardProps extends ProductProps {
  image: string;
}

export const LoadingCard = () => {
  return (
    <div className="min-w-80 min-h-96 w-72 flex justify-center items-center bg-slate-100 rounded-md shadow-md">
      <p className="text-lg font-semibold">Carregando...</p>
    </div>
  );
};

export const Card = ({
  id,
  name,
  description,
  image,
  price,
  size,
  quantity,
  variants,
}: CardProps) => {
  const { setSelectedProduct } = useSelectedProductContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  let serializedTitle: string | undefined = "";
  let serializedDescription: string | undefined = "";
  serializedTitle = name.length > 30 ? `${name.slice(0, 30)}...` : name;
  serializedDescription =
    description.length > 90 ? `${description?.slice(0, 90)}...` : description;

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <div
      className="min-w-80 min-h-96 w-72 flex flex-col gap-5 p-5 box-border overflow-hidden bg-slate-100 rounded-md shadow-md cursor-pointer"
      onClick={() => {
        setSelectedProduct({
          id,
          name: name,
          price,
          description,
          size,
          quantity,
          variants,
        });
      }}
    >
      <h4 className="text-xl font-semibold">{serializedTitle}</h4>
      {image && (
        <div className="w-full h-72 overflow-hidden">
          <Image src={image} alt={name} width={280} height={0} />
        </div>
      )}
      <p className="text-sm">{serializedDescription}</p>
      <h5 className="text-2xl">R$ {price}</h5>
    </div>
  );
};
