import { format, parseISO } from "date-fns";

export const convertToCLP = (value: number) => {
  return value.toLocaleString("es-CL", {
    currency: "CLP",
    style: "currency",
  });
};

export const isValidDate = (dateString: Date | null): boolean => {
  const date = new Date(dateString ?? "");
  return !isNaN(date.getTime());
};

/**
 * this method convert any number to percentage
 * @param value should be a number between 0 and 1
 * @returns a string with the percentage vale of the number ej: "20%"
 */
export const convertToPercentage = (value: number, precission: number = 2) => {
  return value.toLocaleString("es-CL", {
    style: "percent",
    maximumFractionDigits: precission,
  });
};

export const convertToDecimal = (value: number, precission: number = 2) => {
  return value.toLocaleString("es-CL", {
    maximumFractionDigits: precission,
  });
};

/**
 * This method formats the dates
 * @param value
 * @returns a string with the date value or "Sin información" if the value is undefined
 */
export const formattedDate = (date: string) => {
  if (date === undefined) {
    return "Sin información";
  }

  let d = new Date(date);
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
};

export const formattedDateFromDateObject = (date: Date) => {
  if (date === undefined) {
    return "Sin información";
  }

  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  const year = String(date.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
};

export const formattedDateAndHours = (date: string) => {
  return format(parseISO(date), "dd/MM/yyyy - hh:mm a");
};

export const formatCurrency = (amount: number, currency: string): string => {
  switch (currency.toUpperCase()) {
    case "UTM":
      return `UTM ${amount.toLocaleString("es-CL", {
        maximumFractionDigits: 2,
      })}`;
    case "USD":
      return `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)}`;
    case "UF":
      return `UF ${amount
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace("$", "")}`;
    case "CLP":
      return `${convertToCLP(amount)}`;
    default:
      return `${amount} ${currency}`;
  }
};

/**
 * Capitaliz la primera letra de un texto.
 * @param str - The input string.
 * @returns The input string with the first letter capitalized.
 */
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Nos devuelve el mes en textp y el ayo dada una fecha.
 * @param fecha - The input date.
 * @returns An object containing the capitalized month name and the year.
 */
export function getMonthAndYear(date: Date): { month: string; year: number } {
  // Get the full month name in Spanish
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat("es-ES", dateOptions);
  const dateParts = dateFormatter.formatToParts(date);

  let monthName = "";
  let year = 0;

  for (const part of dateParts) {
    if (part.type === "month") {
      monthName = capitalizeFirstLetter(part.value);
    } else if (part.type === "year") {
      year = parseInt(part.value, 10);
    }
  }

  return { month: monthName, year };
}

/**
 * Obtiene el número de días que faltan hasta el final del mes actual.
 * @param date - La fecha de referencia.
 * @returns El número de días restantes hasta el final del mes actual o null si la fecha no es del mes actual.
 */
export function getDaysRemainingInMonth(date: Date): number | null {
  const currentDate = new Date();

  if (
    date.getMonth() !== currentDate.getMonth() ||
    date.getFullYear() !== currentDate.getFullYear()
  ) {
    return null;
  }

  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const currentDay = currentDate.getDate();

  const remainingDays = lastDayOfMonth - currentDay;

  return remainingDays;
}
/**
 *
 * @returns retorna la fecha actual con formato YYYYMM como string
 */
export function getCurrentDateWithYYYYMMFormat(): string {
  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  if (month.length === 1) {
    month = "0" + month;
  }
  return year.toString() + month;
}

export function formatDateEquifax(dateStr: string): string {
  if (!dateStr) {
    return "Sin información";
  }
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);

  const formattedDay = date.getDate().toString().padStart(2, "0");
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedYear = date.getFullYear().toString();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

export function formatRutEquifax(number?: string | null): string {
  if (!number) {
    return "Sin información";
  }
  if (number.startsWith("00")) {
    number = number.slice(2);
  }

  if (number.startsWith("0")) {
    number = number.slice(1);
  }

  const lastDigit = number.slice(-1);
  let numberWithoutDigit = number.slice(0, -1);
  let formattedRut = "";

  while (numberWithoutDigit.length > 3) {
    formattedRut = "." + numberWithoutDigit.slice(-3) + formattedRut;
    numberWithoutDigit = numberWithoutDigit.slice(0, -3);
  }

  formattedRut = numberWithoutDigit + formattedRut + "-" + lastDigit;

  return formattedRut;
}

export const formattedDateMMYYY = (date: string) => {
  if (date === undefined) {
    return "Sin información";
  }

  let d = new Date(date);
  let month = String(d.getMonth() + 1);
  const year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;

  return `${month}/${year}`;
};

// Objeto para mapear números de mes a nombres de mes
export const months: any = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
};

// Función para obtener el nombre del mes a partir de la fecha en formato yyyyMMdd
export const getMonth = (date: string) => {
  const month = date.slice(4, 6);
  return months[month];
};

// Función para obtener el año a partir de la fecha en formato yyyyMMdd
export const getYear = (date: string) => {
  return date.slice(0, 4);
};
