// lib/axios.ts
import { DriversDto } from "@/models/DriversDto";
import { paginatorResonse } from "@/models/paginator/paginatorResponse";
import axios from "axios";

export enum DriversEndPoints {
  GetDrivers = "GetConductoresWhitOutPaginator",
  GetDriversPaginated = "GetConductores",
}

// Verifica que la URL base esté configurada
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL no está configurado");
}

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error response:", error.response);
      if (error.response.status === 401) {
        console.error("No autorizado");
      } else if (error.response.status === 500) {
        console.error("Error interno del servidor");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error in setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export const getDrivers = async () => {
  const response = await instance.get<DriversDto[]>(
    DriversEndPoints.GetDrivers
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

export default instance;
