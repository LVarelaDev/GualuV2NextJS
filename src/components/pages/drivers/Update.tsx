import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormDriver from "./partials/Form/Form";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import useSWR from "swr";
import { DriversEndPoints, getDriverByDocument } from "@/lib/axios";

type props = {
  document: string;
};

const UpdateDriver = ({ document }: props) => {
  const { data: driver } = useSWR(
    [DriversEndPoints.GetDriverByDocument, document],
    () => getDriverByDocument(document)
  );
  const form = useForm({
    defaultValues: {
      documento: driver?.documento,
    },
  });

  const {watch} = form;

  const value = watch("documento")
  console.log(value)

  return (
    <>
      {driver && (
        <>
          <div className="flex justify-between items-center pb-4">
            <Text weigth="font-bold" className="text-gray-900">
              Formulario para editar el conductor
            </Text>
            <Button onClick={() => {}} className="bg-purplePrimary text-white">
              Editar
            </Button>
          </div>
          <FormDriver form={form} />
        </>
      )}
    </>
  );
};

export default UpdateDriver;
