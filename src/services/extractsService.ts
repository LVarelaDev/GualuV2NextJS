import instance from "@/lib/axios";
import { Extracts } from "@/models/Extracts/Extracts.type";
import { paginatorResonse } from "@/models/paginator/paginatorResponse";

export enum ExtractsEndPoints {
  GetExtracts = "GetExtractos",
  GenerateExtract = "GenerarReporte",
}

export const getExtracts = async (
  pageNumber: number,
  pageSize: number
): Promise<paginatorResonse<Extracts>> => {
  try {
    const response = await instance.get<paginatorResonse<Extracts>>(
      `${ExtractsEndPoints.GetExtracts}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    return response.data;
  } catch (error) {
    throw "error in Fetch getExtracts";
  }
};

export const generateExtract = async (id: number): Promise<string> => {
  try {
    const response = await instance.get<string>(
      `${ExtractsEndPoints.GenerateExtract}?id=${id}`
    );

    return response.data;
  } catch (error) {
    throw "error in Fetch generateExtract";
  }
};
