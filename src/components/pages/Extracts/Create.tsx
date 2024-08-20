import Button from "@/components/ui/Button";
import { ExtractSaveDto, ExtractsForm } from "@/models/Extracts/Extracts.type";
import { isValidDate } from "@/utils/helpers";
import { Link } from "next-view-transitions";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormExtracts from "./partials/FormExtracts";

const FormCreateExtract = () => {
  const form = useForm<ExtractsForm>();

  const handleSaveExtract = (data: ExtractsForm) => {
    if (
      data.conductor1 == data.conductor2 ||
      data.conductor1 == data.conductor3 ||
      data.conductor2 == data.conductor3
    ) {
      toast.error("El conductor no puede ser seleccionado dos veces!");
      return;
    }
    if (data.roundTrip && !isValidDate(data.finishDate)) {
      toast.error("Debes seleccionar una fecha final!");
      return;
    }

    const payload: ExtractSaveDto = {
      origen: data.origin,
      destino: data.destination,
      idaYvuelta: data.roundTrip,
      observacion: data.observation,
      idVehiculo: data.vehicle,
      idContrato: data.contract,
      idConductor1: data.conductor1,
      idConductor2: data.conductor2,
      idConductor3: data.conductor3 === "" ? null : Number(data.conductor3),
      fechaInicio: data.initDate,
      fechaFinal: data.finishDate,
    };
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="text-slate-600 font-bold text-lg">
          Crea un nuevo extracto
        </div>
        <div className="flex gap-3">
          <Link
            className="flex justify-center items-center p-2 rounded-md bg-gray-400 text-white"
            href="/extracts"
          >
            Cancelar
          </Link>
          <Button
            onClick={form.handleSubmit(handleSaveExtract)}
            className={` ${
              form.formState.isValid
                ? "bg-purplePrimary text-white"
                : "text-purplePrimary bg-white border-purplePrimary border"
            }`}
          >
            Guardar
          </Button>
          <ToastContainer theme="dark" />
        </div>
      </div>
      <FormExtracts form={form} />
    </div>
  );
};

export default FormCreateExtract;
