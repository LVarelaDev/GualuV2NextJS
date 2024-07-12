import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import dayjs from "dayjs";

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubr",
  "Noviembre",
  "Diciembre",
];
const DAYS = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

type FInputDateProps = {
  label?: string;
  name: string;
  form: UseFormReturn<any, any>;
};

const FInputDate = ({ label, name, form }: FInputDateProps) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState("");
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setDatepickerValue(today.toDateString());
  };

  const isToday = (date: number): boolean => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const getDateValue = (date: number) => {
    const selectedDate = new Date(year, month, date);
    setDatepickerValue(selectedDate.toISOString().split("T")[0]);
    if (dateRef.current) {
      dateRef.current.value = `${selectedDate.getFullYear()}-${(
        "0" +
        (selectedDate.getMonth() + 1)
      ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`;
    }
    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  const { register, formState, watch, setValue } = form;

  const errorInput = formState.errors[name];

  const inputValue = watch(name);
  console.log(inputValue)

  return (
    <div className="container mx-auto px-4 py-2 md:py-10">
      <div className="mb-5 w-64">
        <label
          htmlFor="datepicker"
          className="font-bold mb-1 text-gray-700 block"
        >
          {label}
        </label>
        <div className="relative">
          <input type="hidden" name="date" ref={dateRef} />
          <input
            {...register(name)}
            type="text"
            readOnly
            value={datepickerValue}
            onClick={() => setShowDatepicker(!showDatepicker)}
            onKeyDown={(e) => e.key === "Escape" && setShowDatepicker(false)}
            className="w-full pl-4 pr-10 py-3 border leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-500 font-medium"
            placeholder={label}
            name={name}
          />
          <div className="absolute top-0 right-0 px-3 py-2">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {showDatepicker && (
            <div
              className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 border transition-all duration-500 ease-in animate-slide-down"
              style={{ width: "17rem" }}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-lg font-bold text-gray-800">
                    {MONTH_NAMES[month]}
                  </span>
                  <span className="ml-1 text-lg text-gray-600 font-normal">
                    {year}
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                      month === 0 ? "cursor-not-allowed opacity-25" : ""
                    }`}
                    disabled={month === 0}
                    onClick={() => setMonth(month - 1)}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                      month === 11 ? "cursor-not-allowed opacity-25" : ""
                    }`}
                    disabled={month === 11}
                    onClick={() => setMonth(month + 1)}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap mb-3 -mx-1">
                {DAYS.map((day, index) => (
                  <div key={index} style={{ width: "14.26%" }} className="px-1">
                    <div
                      className={`text-gray-800 font-medium text-center text-xs`}
                    >
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap -mx-1">
                {blankDays.map((blankDay, index) => (
                  <div
                    key={index}
                    style={{ width: "14.28%" }}
                    className="text-center p-1 text-sm"
                  ></div>
                ))}
                {noOfDays.map((date, dateIndex) => (
                  <div
                    key={dateIndex}
                    style={{ width: "14.28%" }}
                    className={`p-2  hover:bg-purpleSmooth hover:text-white rounded-full  ${
                      isToday(date) ? "bg-primary text-white" : "text-gray-700"
                    } ${
                      date.toString() == datepickerValue.split("-")[2]
                        ? "bg-purplePrimary text-white"
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => getDateValue(date)}
                      className={`cursor-pointer text-center text-sm leading-none rounded-full transition ease-in-out duration-100`}
                    >
                      {date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FInputDate;
