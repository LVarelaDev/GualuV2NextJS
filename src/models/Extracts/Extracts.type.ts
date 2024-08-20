export type Extracts = {
  id: number;
  nmOrigen: string;
  nmDestino: string;
  idaYvuelta: boolean;
  idContrato: number;
  noContrato: number;
  idVehiculo: number;
  placa: string;
  idConductor1: number;
  nmConductor1: string;
  idConductor2: number | null;
  nmConductor2: string | null;
  idConductor3: number | null;
  nmConductor3: string | null;
  fechaInicio: string;
  fechaFinal: string;
  fechaCreacion: string;
  observacion: string | null;
};

export type ExtractsForm = {
  origin: string;
  destination: string;
  roundTrip: boolean;
  observation: string;
  contract: number;
  vehicle: number;
  conductor1: number;
  conductor2: number;
  conductor3?: number | string;
  initDate: Date;
  finishDate: Date | null;
};

export type ExtractSaveDto = {
  origen: string;
  destino: string;
  idaYvuelta: boolean;
  idContrato: number;
  idVehiculo: number;
  idConductor1: number;
  idConductor2: number;
  idConductor3: number | null;
  fechaInicio: Date;
  fechaFinal: Date | null;
  observacion: string;
};
