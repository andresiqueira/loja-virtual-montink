"use client";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { searchCep } from "@/app/actions/action-cep";
import { InputCep } from "@/app/components/Form/InputCep";
import { Form } from "@/app/components/Form";
import { Modal } from "@/app/components/CepComponent/Modal";
import { SubmitButton } from "@/app/components/SubmitButton";

interface CepDataProps {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface ApiResponseProps {
  success?: string;
  data?: CepDataProps;
  errors?: string;
}

export const CepComponent = () => {
  const [cep, setCepChange] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseApi, setResponseApi] = useState<ApiResponseProps>();

  const handleCepChange = (value: string) => {
    setCepChange(value);
  };

  useEffect(() => {
    if (responseApi && responseApi.errors) {
      toast.error(responseApi.errors, {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: 0,
        toastId: "error",
      });
    }

    if (responseApi && responseApi.success && responseApi.data) {
      toast.success(responseApi.success, {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: 0,
        toastId: "success",
      });
      setIsModalOpen(true);
    }
  }, [responseApi]);

  const handleCepSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("cep", cep);

    const data = await searchCep(formData);
    setResponseApi(data);
    handleCepChange("");
  };

  return (
    <>
      <Form submitHandle={handleCepSubmit}>
        <InputCep
          name="cep"
          label="Consulte o prazo de entrega:"
          placeholder="insira seu CEP"
          value={cep}
          onChange={handleCepChange}
        />
        <SubmitButton type="submit" label="Buscar" />
      </Form>
      {isModalOpen && responseApi?.data && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={responseApi.data}
        />
      )}
    </>
  );
};
