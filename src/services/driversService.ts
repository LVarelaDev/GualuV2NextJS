import instance from "@/lib/axios";
import { DriversDto } from "@/models/DriversDto";
import { paginatorResonse } from "@/models/paginator/paginatorResponse";

export enum DriversEndPoints {
  GetDrivers = "GetConductoresWhitOutPaginator",
  GetDriversPaginated = "GetConductores",
  GetDriverByDocument = "GetConductor",
}

export const GetDrivers = async (): Promise<DriversDto[]> => {
  const response = await instance.get<DriversDto[]>(
    `${DriversEndPoints.GetDrivers}`
  );
  return response.data;
};

export const getDriverByDocument = async (document: string) => {
  const response = await instance.get<DriversDto>(
    `${DriversEndPoints.GetDriverByDocument}?id=${encodeURIComponent(document)}`
  );
  return response.data;
};

export const getDriversPaginated = async (
  pageNumber: number,
  pageSize: number
) => {
  const response = await instance.get<paginatorResonse<DriversDto>>(
    `${DriversEndPoints.GetDriversPaginated}?pageNumber=${encodeURIComponent(
      pageNumber.toString()
    )}&pageSize=${encodeURIComponent(pageSize.toString())}`
  );
  return response.data;
};
