import FComboBox from "@/components/ui/Input/FComboBox";
import FInput from "@/components/ui/Input/FInput";
import FInputDate from "@/components/ui/Input/FInputDate";
import FRadio from "@/components/ui/Input/FRadio";
import FToggle from "@/components/ui/Input/FToggle";
import { useSelectsData } from "@/hooks/SelectsData/useSelectsData";
import { OBSERVATIONS_OPTIONS } from "@/utils/contants";
import { UseFormReturn } from "react-hook-form";

type props = {
  form: UseFormReturn<any, any>;
};

const FormExtracts = ({ form }: props) => {
  const { contracts, drivers, vehicles } = useSelectsData();


  return (
    <div className="flex flex-col gap-8 bg-white p-5 rounded-md shadow-sm">
      <div className="flex gap-5">
        <div
          className="flex justify-start pt-5 px-5
         items-center"
        >
          <FToggle
            form={form}
            rules={{ required: true }}
            name="roundTrip"
            label="Ida y vuelta"
          />
        </div>
        <div className="flex-1">
          <FInput type="text" form={form} name="origin" label="Origen" />
        </div>
        <div className="flex-1">
          <FInput type="text" form={form} name="destination" label="Destino" />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          {contracts !== undefined && (
            <FComboBox
              dataList={contracts}
              itemValue="id"
              displayValue="noContrato"
              form={form}
              name="contract"
              label="Numero de contrato"
              rules={{ required: true }}
            />
          )}
        </div>
        <div className="flex-1">
          {vehicles !== undefined && (
            <FComboBox
              dataList={vehicles}
              itemValue="itemValue"
              displayValue="displayValue"
              form={form}
              name="vehicle"
              label="Vehiculo"
              rules={{ required: true }}
            />
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          {drivers !== undefined && (
            <FComboBox
              dataList={drivers}
              itemValue="id"
              displayValue="nombre"
              form={form}
              name="conductor1"
              label="Conductor 1"
              rules={{ required: true }}
            />
          )}
        </div>
        <div className="flex-1">
          {drivers !== undefined && (
            <FComboBox
              dataList={drivers}
              itemValue="id"
              displayValue="nombre"
              form={form}
              name="conductor2"
              label="Conductor 2"
              rules={{ required: true }}
            />
          )}
        </div>
        <div className="flex-1">
          {drivers !== undefined && (
            <FComboBox
              dataList={drivers}
              itemValue="id"
              displayValue="nombre"
              form={form}
              name="conductor3"
              label="Conductor 3"
            />
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <FInputDate form={form} name="initDate" label="Fecha inicio" />
        </div>
        <div className="flex-1">
          <FInputDate form={form} name="finishDate" label="Fecha final" />
        </div>
      </div>
      <FRadio
        optionsList={OBSERVATIONS_OPTIONS}
        form={form}
        name="observation"
        justify="justify-between"
        rules={{ required: true }}
        gap="gap-3"
        classNameLabel="flex gap-3 border p-5 rounded-md"
        label="Observacion"
      />
    </div>
  );
};

export default FormExtracts;
