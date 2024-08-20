import {
  faChevronDown,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";

type props = {
  form: UseFormReturn<any, any>;
  dataList: any[];
  displayValue: string;
  itemValue: string;
  name: string;
  label?: string;
  rules?: RegisterOptions<any, string>;
};

const FComboBox = ({
  dataList,
  form,
  displayValue,
  itemValue,
  name,
  label,
  rules,
}: props) => {
  const { register, formState, watch, setValue } = form;

  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const [selected, setSelected] = useState("");

  const handleShowOptions = () => {
    if (showOptions) {
      setShowOptions(false);
      setInputValue("");
    } else {
      setShowOptions(true);
    }
  };

  useEffect(() => {
    register(name, rules);
  }, [name]);

  useEffect(() => {
    setValue(name, selected);
  }, [selected, name]);

  const handleCleanValue = () => {
    setValue(name, null);
    setSelected("");
  };

  return (
    <div className="w-full">
      <label
        htmlFor="inputSelect"
        className="font-bold mb-1 text-gray-700 block"
      >
        {label}
      </label>
      <div className="relative w-full">
        <div
          className="flex justify-between items-center bg-white w-full p-[0.6rem] rounded-md border cursor-pointer"
          onClick={handleShowOptions}
        >
          {selected === ""
            ? "Selecciona una opción"
            : dataList.find((x) => x[itemValue] === selected)[displayValue] ??
              ""}
          {selected !== "" ? (
            <FontAwesomeIcon
              icon={faXmark}
              className={`transition-transform duration-20`}
              onClick={() => handleCleanValue()}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform duration-20 ${
                showOptions ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
        {showOptions && dataList && (
          <ul className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
            <div className="flex gap-2 p-2 items-center border-b">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              <input
                type="text"
                className="outline-none w-full"
                placeholder={label}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            {dataList.map((item) => (
              <li
                key={item[itemValue]}
                className={`p-2 hover:bg-slate-500 transition-all duration-300 ease-out ${
                  item[displayValue]
                    ?.toLowerCase()
                    .startsWith(inputValue?.toLowerCase() ?? "")
                    ? "block"
                    : "hidden"
                }`}
              >
                <button
                  className="w-full text-left"
                  onClick={() => {
                    if (item[itemValue].toString() !== selected) {
                      setSelected(item[itemValue]);
                      handleShowOptions();
                    }
                  }}
                >
                  {item[displayValue]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FComboBox;
