import instance from "@/lib/axios";
import { ContractsDTO } from "@/models/Contracts/ContractsDTO";

export enum ContractEndPoints {
  GetContracts = "GetContratos",
}

export const getContracts = async (): Promise<ContractsDTO[]> => {
  try {
    const response = await instance.get(ContractEndPoints.GetContracts);

    return response.data;
  } catch (error) {
    throw "Error fetching contracts";
  }
};
