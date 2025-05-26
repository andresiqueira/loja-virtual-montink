'use server'

import { z } from 'zod'
const schema = z.object({
  cep: z.string().min(8, { message: "CEP deve conter 8 caracteres" }),
})

export async function searchCep(formData: FormData) {
  const cep = formData.get("cep");

   const validatedFields = schema.safeParse({
      cep: formData.get('cep'),
    })

    if (!validatedFields.success) {
      let errorMessage = "";

      validatedFields.error.issues.forEach((issue) => {
        errorMessage += `${issue.message}. `
      })
  
      return {
        errors: errorMessage,
      }
    }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    if (data.erro) {
      return {
        errors: "CEP não encontrado.",
      }
    } else {
      return {
        success: "CEP encontrado com sucesso.",
        data: data,
      }
    }
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
  }
}