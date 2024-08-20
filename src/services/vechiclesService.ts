import instance from "@/lib/axios";
import { vehiclesFromComboBox } from "@/models/Vehicles/VehicleDTO";

export enum VechiclesEndpoints {
  GetVehiculosFromComboBox = "GetVehiculosFromComboBox",
}

export const getVehiculosFromComboBox = async (): Promise<
  vehiclesFromComboBox[]
> => {
  try {
    const response = await instance.get<vehiclesFromComboBox[]>(
      VechiclesEndpoints.GetVehiculosFromComboBox
    );

    return response.data;
  } catch (error) {
    throw "error in GetVehiculosFromComboBox";
  }
};
