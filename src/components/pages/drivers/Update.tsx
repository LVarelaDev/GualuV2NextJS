import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormDriver from "./partials/Form/Form";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import useSWR from "swr";
import { DriversEndPoints, getDriverByDocument } from "@/lib/axios";
import { Link } from "next-view-transitions";

type props = {
  document: string;
};

const UpdateDriver = ({ document }: props) => {
  const form = useForm();

  const { data: driver } = useSWR(
    [DriversEndPoints.GetDriverByDocument, document],
    () => getDriverByDocument(document)
  );

  useEffect(() => {
    if (driver !== undefined) {
      form.setValue("documento", driver.documento);
    }
  }, [driver]);

  const { watch } = form;

  const value = watch("documento");

  return (
    <>
      {driver && (
        <>
          <div className="flex justify-between items-center pb-4">
            <Text weigth="font-bold" className="text-gray-900">
              Formulario para editar el conductor
            </Text>
            <div className="flex gap-3">
              <Link
                href={"/drivers"}
                className="flex justify-center items-center px-4 py-2 rounded-sm bg-slate-300 text-slate-900 shadow"
              >
                Cancelar
              </Link>
              <Button
                onClick={() => {}}
                className="bg-purplePrimary text-white"
              >
                Editar
              </Button>
            </div>
          </div>
          <FormDriver form={form} />
        </>
      )}
    </>
  );
};

export default UpdateDriver;
