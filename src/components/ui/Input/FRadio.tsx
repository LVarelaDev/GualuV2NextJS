import React from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";

export type TOptions = {
  value: number | string;
  label: string;
};

type props = {
  optionsList: TOptions[];
  column?: boolean;
  justify?:
    | "justify-between"
    | "justify-center"
    | "justify-start"
    | "justify-end";
  form: UseFormReturn<any, any>;
  name: string;
  rules: RegisterOptions<any, string>;
  gap?: string;
  classNameLabel: string;
  label?: string;
};

const FRadio = ({
  optionsList,
  column = false,
  justify = "justify-between",
  form,
  name,
  rules,
  gap,
  classNameLabel,
  label = undefined,
}: props) => {
  const { register } = form;
  return (
    <div className="gap-1">
      {label !== undefined && <label htmlFor="options" className="font-bold mb-1 text-gray-700 block">{label}</label>}
      <div className={`flex ${column && "flex-col"} ${justify} ${gap}`}>
        {optionsList.map((item, i) => (
          <div key={i}>
            <label className={classNameLabel}>
              <input
                type="radio"
                value={item.value}
                {...register(name, rules)}
              />
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FRadio;
