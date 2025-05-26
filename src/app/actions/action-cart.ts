"use server";

import { z } from "zod";

const schema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
  color: z.string().nonempty({ message: "A cor é obrigatória." }),
  size: z.string().nonempty({ message: "O tamanho é obrigatório." }),
  quantity: z
    .string()
    .nonempty()
    .refine((value) => parseInt(value) > 0, {
      message: "A quantidade é obrigatória.",
    }),
});

export async function storeCart(formData: FormData) {
  const validatedFields = schema.safeParse({
    productId: formData.get("productId"),
    productName: formData.get("productName"),
    color: formData.get("color"),
    size: formData.get("size"),
    quantity: formData.get("quantity"),
  });

  if (!validatedFields.success) {
    let errorMessage = "";

    validatedFields.error.issues.forEach((issue) => {
      errorMessage += `${issue.message}. `;
    });

    return {
      errors: errorMessage,
    };
  }

  const { productId, productName, color, size, quantity } =
    validatedFields.data;

  return { productId, productName, color, size, quantity };
}
