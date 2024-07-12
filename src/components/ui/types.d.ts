import * as Popper from "@popperjs/core";
import { ReactNode } from "react";

type TInputPropsBase = {
  form: UseFormReturn<any, object>;
  name: string;
  disabled?: boolean;
  label?: string | ReactNode;
  maxLength?: number;
  rules?: RegisterOptions;
  onkeydown?: (e: any) => void;
};

export type TInputTypes =
  | "rut"
  | "email"
  | "password"
  | "text"
  | "number"
  | "select"
  | "multiSelect"
  | "date"
  | "textArea";

type TOtherInputProps = TInputPropsBase & {
  type: Extract<
    TInputTypes,
    "rut" | "email" | "password" | "text"
  >;
};

type TInputNumberProps = TInputPropsBase & {
  type: Extract<TInputTypes, "number">;
  mode: TNumberMode;
  allowNegatives?: boolean;
  allowZero?: boolean;
  precission?: number;
};

type TInputSelectPropsBase<T> = TInputPropsBase & {
  type: Extract<TInputTypes, "select">;
  dataList: T[];
};

type TInputSelectProps<T> = TInputSelectPropsBase<T> & {
  itemValue: keyof T;
  displayProperty: keyof T;
  showEmptyOption?: boolean;
  onChange?: (value: string) => void;
};

type TInputMultiSelectPropsBase<T> = TInputPropsBase & {
  type: Extract<TInputTypes, "multiSelect">;
  dataList: T[];
};

type TInputMultiSelectProps<T> = TInputMultiSelectPropsBase<T> & {
  itemValue: keyof T;
  displayProperty: keyof T;
};

type TInputDateProps = TInputPropsBase & {
  type: Extract<TInputTypes, "date">;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledWeekends?: boolean;
  popperPlacement?: Popper.Placement;
};

type TInputTextAreaProps = TInputPropsBase & {
  type: Extract<TInputTypes, "textArea">;
  rows: number;
  cols?: number;
};

export type TInputProps<T> =
  | TOtherInputProps
  | TInputNumberProps
  | TInputSelectProps<T>
  | TInputMultiSelectProps<T>
  | TInputDateProps
  | TInputTextAreaProps;

export type TValidationOptions = {
  formOptions: FormData.RegisterOptions;
  inputOptions?: InputHTMLAttributes<HTMLInputElement>;
};

export type TResolverOptions = {
  rut: TValidationOptions;
  email: TValidationOptions;
  password: TValidationOptions;
  text: TValidationOptions;
  number: TValidationOptions;
  select: TValidationOptions;
  date: TValidationOptions;
};

export type TNumberMode =
  | "UF"
  | "USD"
  | "CLP"
  | "int"
  | "decimal"
  | "percentage"
  | "phone";
