import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
type CustomDateInputProps = {
  form: UseFormReturn<any, any>;
  name: string;
};
const FInputDate = ({ name, form }: CustomDateInputProps) => {
  const { register, setValue } = form;

  useEffect(() => {
    register(name);
  }, [register, name]);

  const handleChange = (date: dayjs.Dayjs | null) => {
    setValue(name, date?.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label={name} onChange={(date) => handleChange(date)} className="rounded-full border-none" />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default FInputDate;
