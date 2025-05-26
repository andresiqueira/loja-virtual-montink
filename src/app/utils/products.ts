export interface SizeOptionProps {
  label: string;
  value: string;
}

export interface ColorNameProps {
  label: string;
  value: string;
}

export interface VariantProps {
  colorName: ColorNameProps;
  image: string;
}

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
  size: SizeOptionProps[];
  quantity: number;
  variants: VariantProps[];
}

export const products: ProductProps[] = [
  {
    id: "1",
    name: "Camiseta Básica",
    price: 29.99,
    description:
      "Camiseta 100% algodão, confortável e versátil. Ideal para o dia a dia, combina com diferentes estilos e ocasiões.",
    size: [
      { label: "P", value: "P" },
      { label: "G", value: "G" },
    ],
    quantity: 6,
    variants: [
      {
        colorName: { label: "Branco", value: "#FFFFFF" },
        image: "/camiseta-branca.webp",
      },
      {
        colorName: { label: "Preto", value: "#000000" },
        image: "/camiseta-preta.webp",
      },
    ],
  },
  {
    id: "2",
    name: "Calça Jeans Masculina",
    price: 89.99,
    description:
      "Calça jeans com corte reto e tecido resistente. Perfeita para um visual casual ou para ocasiões mais descontraídas.",
    size: [
      { label: "P", value: "P" },
      { label: "G", value: "G" },
    ],
    quantity: 9,
    variants: [
      {
        colorName: { label: "Azul", value: "#0000FF" },
        image: "/calca-jeans-azul.webp",
      },
      {
        colorName: { label: "Preta", value: "#000000" },
        image: "/calca-jeans-preta.webp",
      },
    ],
  },
  {
    id: "3",
    name: "Tênis Esportivo",
    price: 149.99,
    description:
      "Tênis leve e confortável, ideal para corridas, caminhadas e atividades físicas. Oferece suporte e estilo para o seu dia a dia.",
    size: [
      { label: "P", value: "P" },
      { label: "G", value: "G" },
    ],
    quantity: 7,
    variants: [
      {
        colorName: { label: "Vermelho", value: "#FF0000" },
        image: "/tenis-vermelho.webp",
      },
      {
        colorName: { label: "Verde", value: "#00FF00" },
        image: "/tenis-verde.webp",
      },
    ],
  },
];
