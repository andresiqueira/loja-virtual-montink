import { Card } from "@/app/components/Card";
import { CardsContainer } from "@/app/components/CardsContainer";
import { MainCard } from "@/app/components/MainCard";
import { products, ProductProps } from "@/app/utils/products";
import { ProductProvider } from "@/app/contexts/Products";
import { SelectedProductProvider } from "@/app/contexts/SelectedProduct";
import { Menu } from "@/app/components/Menu";

export default function Home() {
  const productList: ProductProps[] = products;

  return (
    <ProductProvider>
      <SelectedProductProvider>
        <div className="min-h-screen items-center pb-20 font-[family-name:var(--font-geist-sans)] flex flex-col gap-16">
          <Menu />

          <MainCard />

          <CardsContainer>
            {productList.map((item) => (
              <Card
                id={item.id}
                key={item.id}
                name={item.name}
                image={item.variants[0].image}
                description={item.description}
                price={item.price}
                size={item.size}
                quantity={item.quantity}
                variants={item.variants}
              />
            ))}
          </CardsContainer>
        </div>
      </SelectedProductProvider>
    </ProductProvider>
  );
}
