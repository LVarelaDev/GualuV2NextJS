import React from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";

type props = {
  form: UseFormReturn<any, any>;
  name: string;
  label?: string;
  rules?: RegisterOptions<any, string>;
};
const FToggle = ({ form, rules, name, label }: props) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        {...form.register(name, rules)}
        className="sr-only peer"
      />
      <div
        className="relative w-11 h-6
        bg-gray-200 rounded-full peer peer-focus:ring-4
        peer-focus:ring-greenSmooth dark:peer-focus:ring-greenSmooth
        dark:bg-gray-400 peer-checked:after:translate-x-full 
          rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
          after:content-[''] after:absolute after:top-0.5 after:start-[2px]
        after:bg-white after:border-gray-300 after:border after:rounded-full 
          after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900">{label}</span>
    </label>
  );
};

export default FToggle;
