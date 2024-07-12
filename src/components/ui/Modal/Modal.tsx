"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Text from "../Text";

type props = {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
};
const Modal = ({ show, onClose, children, title }: props) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-[99] bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col gap-3 bg-gray-100 border-t-[5px] border-t-green-600 p-4 rounded-lg relative w-[630px] xl:max-w-[630px]">
            <div className="flex justify-between items-center">
              <Text
                size="text-base"
                className="text-gray-600"
                weigth="font-bold"
              >
                {title}
              </Text>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => onClose(false)}
                  className="cursor-pointer text-xl text-gray-400"
                />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
