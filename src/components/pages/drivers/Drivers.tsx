import Button from "@/components/ui/Button";
import FGrid from "@/components/ui/Grid/FGrid";
import { FGridColumn } from "@/components/ui/Grid/FGridColumn";
import Modal from "@/components/ui/Modal/Modal";
import Text from "@/components/ui/Text";
import { DriversEndPoints, getDriversPaginated } from "@/lib/axios";
import { DriversDto } from "@/models/DriversDto";
import { PAGE_INDEX, PAGE_SIZE } from "@/utils/contants";
import {
  faFile,
  faMagnifyingGlass,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ModalDocuments from "./partials/ModalDocuments";

const Drivers = () => {
  const form = useForm();

  const { register, watch } = form;

  const searchDriverWatch = watch("searchDriver");

  const [currentPage, setCurrentPage] = useState(PAGE_INDEX);
  const [showModal, setShowModal] = useState(false);
  const [idDriverSelected, setIdDriverSelected] = useState(0);

  const data = [
    { id: 1, name: "Luis Varela", edad: 20 },
    { id: 2, name: "Luis Varela", edad: 20 },
    { id: 3, name: "Luis Varela", edad: 20 },
  ];

  const { data: drivers } = useSWR(
    [DriversEndPoints.GetDriversPaginated, currentPage],
    () => getDriversPaginated(currentPage, PAGE_SIZE)
  );

  const renderStatusDriver = (driver: DriversDto) => {
    return (
      <div className="flex justify-center items-center">
        <div
          className={`flex text-xs rounded-full ${
            driver.estado === "INCOMPLETO"
              ? "bg-yellow-300 text-yellow-600"
              : "bg-green-300 text-green-600"
          } py-1 px-2`}
        >
          {driver.estado}
        </div>
      </div>
    );
  };

  const handleConsole = (r: DriversDto) => {
    setIdDriverSelected(r.id);
    setShowModal(true);
  };

  const renderButtonsActions = (r: DriversDto) => {
    return (
      <div className="flex gap-2 justify-center items-center">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="cursor-pointer text-blue-600"
        />
        <button
          onClick={() => {
            handleConsole(r);
          }}
        >
          <FontAwesomeIcon
            icon={faFile}
            className="cursor-pointer"
            style={{ color: "#FFD43B" }}
          />
        </button>
        <FontAwesomeIcon
          icon={faTrashCan}
          className="cursor-pointer text-red-600"
          onClick={() => setShowModal(true)}
        />
      </div>
    );
  };

  return (
    <>
    <div className="h-[592px] w-full overflow-y-auto custom-scroll p-5">
      <div className="flex flex-col gap-5 pb-5">
        <div className="flex justify-between items-center gap-5">
          <Button className="bg-purplePrimary text-white" onClick={() => {}}>
            Crear nuevo
          </Button>
        </div>
        <div className="flex flex-col rounded-md bg-white shadow-sm p-4 gap-3 h-[calc(100%-30px)] border-gray-300 overflow-hidden">
          <div className="flex justify-between items-center px-2">
            <Text color="text-gray-600" weigth="font-bold">
              Listado de conductores
            </Text>
            <div className="flex items-center md:w-[40%] lg:w-[30%] xl:w-[20%]">
              <div className="relative ltr:mr-2 rtl:mr-0 rtl:ml-2 hidden lg:mr- md:block lg:block w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-gray-400"
                  />
                </div>
                <input
                  {...register("searchDriver")}
                  name="searchDriver"
                  type="text"
                  className="block rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-200/10 p-2 pl-10 text-slate-600 dark:text-slate-400 outline-none focus:border-slate-300 focus:ring-slate-300 dark:bg-slate-800/20 sm:text-sm"
                  placeholder="Buscar..."
                />
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <FGrid
              dataList={drivers?.items ?? []}
              keyIdentifier="id"
              type="paginated"
              currentPage={currentPage}
              pageSize={drivers?.pageSize ?? 0}
              setPage={setCurrentPage}
              totalRecords={drivers?.totalCount ?? 0}
            >
              <FGridColumn
                labelHeader="Nombre"
                dataType="string"
                keyColumnIdentifier="nombre"
              />
              <FGridColumn
                labelHeader="Documento"
                dataType="string"
                keyColumnIdentifier="documento"
              />
              <FGridColumn
                labelHeader="Fecha nacimiento"
                dataType="date"
                className="text-center"
                classNameHeader="text-center"
                keyColumnIdentifier="fechaNacimiento"
              />
              <FGridColumn
                labelHeader="Tipo licencia"
                dataType="string"
                className="text-center"
                classNameHeader="text-center"
                keyColumnIdentifier="tipoLicencia"
              />
              <FGridColumn
                labelHeader="Estado"
                classNameHeader="text-center"
                dataType="string"
                keyColumnIdentifier="estado"
                colRender={(_v, r: DriversDto) => renderStatusDriver(r)}
              />
              <FGridColumn
                labelHeader="Acciones"
                classNameHeader="text-center"
                colRender={(_v, r: DriversDto) => renderButtonsActions(r)}
              />
            </FGrid>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title="Gestión de documentos"
      >
        <ModalDocuments idDriver={idDriverSelected} />
      </Modal>
    </div>
    </>
  );
};

export default Drivers;
