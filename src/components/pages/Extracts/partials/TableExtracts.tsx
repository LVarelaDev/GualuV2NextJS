import FGrid from "@/components/ui/Grid/FGrid";
import { FGridColumn } from "@/components/ui/Grid/FGridColumn";
import { Extracts } from "@/models/Extracts/Extracts.type";
import { generateExtract } from "@/services/extractsService";
import { formattedDate } from "@/utils/helpers";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";

type props = {
  datalist: Extracts[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
};

const TableExtracts = ({
  datalist,
  setCurrentPage,
  currentPage,
  pageSize,
  totalRecords,
}: props) => {
  const renderColumnRoundTrip = (r: Extracts) => {
    if (r.idaYvuelta) {
      return (
        <div className="flex">
          <div className="flex items-center justify-center p-3 rounded-xl bg-green-300 text-green-800">
            Si
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex">
          <div className="p-3 rounded-xl bg-red-300 text-red-800">No</div>
        </div>
      );
    }
  };

  const renderOriginDestination = (r: Extracts) => {
    return (
      <div>
        {r.nmOrigen} - {r.nmDestino}
      </div>
    );
  };

  const renderDates = (r: Extracts) => {
    return (
      <div>
        {formattedDate(r.fechaInicio)} - {formattedDate(r.fechaFinal)}
      </div>
    );
  };

  const renderObservation = (r: Extracts) => {
    if (r.observacion !== null) {
      return <div>{r.observacion}</div>;
    } else {
      return <div>No hay observacion</div>;
    }
  };

  const renderDriver2 = (r: Extracts) => {
    if (r.nmConductor2 !== null) {
      return <div>{r.nmConductor2}</div>;
    } else
      return (
        <div className="flex">
          <div className="p-2 rounded-xl bg-yellow-300 text-yellow-800">
            No aplica
          </div>
        </div>
      );
  };

  const renderDriver3 = (r: Extracts) => {
    if (r.nmConductor3 !== null) {
      return <div>{r.nmConductor3}</div>;
    } else {
      return (
        <div className="flex">
          <div className="p-2 rounded-xl bg-yellow-300 text-yellow-800">
            No aplica
          </div>
        </div>
      );
    }
  };

  const renderDetail = (r: Extracts) => {
    return (
      <div className="text-center">
        <FontAwesomeIcon
          icon={faFilePdf}
          size="xl"
          className="text-green-700 cursor-pointer"
          onClick={() => {
            generateFile(r.id);
          }}
        />
      </div>
    );
  };

  const generateFile = async (id: number) => {
    const base64: string = await generateExtract(id);

    downloadFile(base64);
  };

  const downloadFile = (base64: string) => {
    const base64String = base64; // Reemplaza 'base64' por el nombre de la propiedad que contiene la cadena base64
    const mimeType = "application/pdf"; // Cambia el mimeType si no es un PDF
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // 3. Crea un enlace de descarga
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archivo.pdf"; // Cambia el nombre del archivo según sea necesario
    document.body.appendChild(a);

    // 4. Dispara la descarga y luego elimina el enlace
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <FGrid
      dataList={datalist}
      keyIdentifier="id"
      type="paginated"
      setPage={setCurrentPage}
      currentPage={currentPage}
      pageSize={pageSize}
      totalRecords={totalRecords}
    >
      <FGridColumn labelHeader="Placa" keyColumnIdentifier="placa" />
      <FGridColumn
        labelHeader="Ruta"
        colRender={(_v, r: Extracts) => renderOriginDestination(r)}
      />
      <FGridColumn
        labelHeader="Ida y vuelta"
        colRender={(_v, r: Extracts) => renderColumnRoundTrip(r)}
      />
      <FGridColumn labelHeader="Contrato" keyColumnIdentifier="noContrato" />
      <FGridColumn
        labelHeader="Conductor 1"
        keyColumnIdentifier="nmConductor1"
      />
      <FGridColumn
        labelHeader="Conductor 2"
        keyColumnIdentifier="nmConductor2"
        colRender={(_, r: Extracts) => renderDriver2(r)}
      />
      <FGridColumn
        labelHeader="Conductor 3"
        keyColumnIdentifier="nmConductor3"
        colRender={(_, r: Extracts) => renderDriver3(r)}
      />
      <FGridColumn
        labelHeader="Fechas"
        keyColumnIdentifier="fechaInicio"
        colRender={(_v, r: Extracts) => renderDates(r)}
      />
      <FGridColumn
        labelHeader="Observacion"
        keyColumnIdentifier="observacion"
        colRender={(_v, r: Extracts) => renderObservation(r)}
      />
      <FGridColumn
        labelHeader="Detalle"
        colRender={(_v, r: Extracts) => renderDetail(r)}
      />
    </FGrid>
  );
};

export default TableExtracts;
