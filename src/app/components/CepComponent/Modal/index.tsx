import React, { MouseEvent } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
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
  };
}

export const Modal = ({ isOpen, onClose, data }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 text-white"
      onClick={handleOverlayClick}
    >
      <div className="bg-slate-800 box-border overflow-hidden p-12 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 z-999 text-2xl"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <h2 className="text-2xl font-bold mb-4">Detalhes do CEP</h2>
        <ul className="flex flex-col text-base gap-2">
          <li>
            <strong>CEP:</strong> {data.cep}
          </li>
          <li>
            <strong>Logradouro:</strong> {data.logradouro}
          </li>
          <li>
            <strong>Bairro:</strong> {data.bairro}
          </li>
          <li>
            <strong>Localidade:</strong> {data.localidade}
          </li>
          <li>
            <strong>Estado:</strong> {data.estado}
          </li>
          <li>
            <strong>Região:</strong> {data.regiao}
          </li>
          <li>
            <strong>DDD:</strong> {data.ddd}
          </li>
        </ul>
      </div>
    </div>
  );
};
