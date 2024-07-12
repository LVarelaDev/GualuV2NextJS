"use client";

import FInput from "@/components/ui/Input/FInput";
import FInputDate from "@/components/ui/Input/FInputDate";
import { useForm } from "react-hook-form";

type props = {
  idDriver: number;
};
const ModalDocuments = ({ idDriver }: props) => {
  const form = useForm();
  const { register, formState, watch, setValue } = form;

  const frutas = [
    { id: 1, name: "manzana" },
    { id: 2, name: "pera" },
    { id: 3, name: "fresa" },
    { id: 4, name: "mango" },
  ];

  const value = watch("listdata");
  return (
    <div className="flex flex-col w-full h-ful p-4 bg-white border border-gray-200 rounded-md">
      Hola Esto es un modal que quiere consultar los datos del conductor con id:{" "}
      {idDriver}
      <FInputDate name="fechaVencimiento" label = "Fecha vencimiento" form={form}/>
      <FInput type="text" form={form} name="Fecha vencimiento" />
      
    </div>
  );
};

export default ModalDocuments;
