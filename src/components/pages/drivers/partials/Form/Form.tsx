import FComboBox from "@/components/ui/Input/FComboBox";
import FInput from "@/components/ui/Input/FInput";
import FInputDate from "@/components/ui/Input/FInputDate";

import React from "react";
import { UseFormReturn } from "react-hook-form";

type props = {
  form: UseFormReturn<any, any>;
};

const typeDocs = [
  { id: 1, name: "CEDULA CIUDADANA" },
  { id: 2, name: "CEDULA EXTRANGERA" },
  { id: 3, name: "NIT" },
];

const FormDriver = ({ form }: props) => {
  return (
    <div className="grid grid-cols-3 rounded-md bg-white shadow-sm p-10 gap-6 border-gray-300">
      <FComboBox
        dataList={typeDocs}
        displayValue="name"
        itemValue="id"
        form={form}
        name="tipoDocumento"
        label="Tipo documento"
      />
      <FInput
        form={form}
        type="number"
        name="documento"
        label="Numero documento"
        mode="int"
      />
      <FInput
        form={form}
        type="number"
        name="documento"
        label="Numero documento"
        mode="int"
      />
      <FInput
        form={form}
        type="number"
        name="documento"
        label="Numero documento"
        mode="int"
      />
      <FInputDate form={form} name="fechaNacimiento" label="Fecha nacimiento" />
      <FInput
        form={form}
        type="number"
        name="documento"
        label="Numero documento"
        mode="int"
      />
      <FInput
        form={form}
        type="number"
        name="documento"
        label="Numero documento"
        mode="int"
      />
      <FInput
        form={form}
        type="number"
        name="documento"
        label="Numero documento"
        mode="int"
      />
    </div>
  );
};

export default FormDriver;
