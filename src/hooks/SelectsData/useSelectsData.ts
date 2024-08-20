import { ContractEndPoints, getContracts } from "@/services/contractsService";
import { DriversEndPoints, GetDrivers } from "@/services/driversService";
import {
  getVehiculosFromComboBox,
  VechiclesEndpoints,
} from "@/services/vechiclesService";
import useSWR from "swr";

export const useSelectsData = () => {
  const { data: contracts } = useSWR([ContractEndPoints.GetContracts], () =>
    getContracts()
  );

  const { data: vehicles } = useSWR(
    [VechiclesEndpoints.GetVehiculosFromComboBox],
    () => getVehiculosFromComboBox()
  );

  const { data: drivers } = useSWR([DriversEndPoints.GetDrivers], () =>
    GetDrivers()
  );

  return {
    contracts,
    vehicles,
    drivers,
  };
};
