import React, { ReactNode } from "react";
import Button from "../Button";
import Text from "../Text";

type TFGridDeleteConfirmation<T> = {
  element: T;
  templateConfirmText?: string;
  buttonDeleteText?: string | ReactNode;
  setConfirmDeleteKey: React.Dispatch<React.SetStateAction<T[keyof T] | null>>;
  handleDeleteRow: (row: T) => void;
};

const FGridDeleteConfirmation = <T,>({
  element,
  templateConfirmText,
  buttonDeleteText,
  setConfirmDeleteKey,
  handleDeleteRow,
}: TFGridDeleteConfirmation<T>) => {
  const replaceTemplate = <T,>(template: string, element: T) => {
    let templateText = template.replaceAll(
      /\{\{(.*?)\}\}/g,
      function (_, p1: keyof T) {
        return element[p1] as string;
      }
    );

    return templateText;
  };

  return (
    <tr className="bg-gray-1 transition-all duration-1000 ease-linear">
      <td className="border border-primary" colSpan={100}>
        <div className="mx-3 flex justify-between">
          <div>
            <Text weigth="font-bold" color="secondary" size="text-base">
              {templateConfirmText
                ? replaceTemplate(templateConfirmText, element)
                : "¿Estás seguro que deseas eliminar este elemento?"}
            </Text>
          </div>
          <div className="flex gap-5">
            <Button
              className="w-80"
              padding="px-4 py-0"
              color="bg-purplePrimary"
              outline
              onClick={() => setConfirmDeleteKey(null)}
            >
              Cancelar
            </Button>

            <Button
              className="w-80"
              padding="px-4 py-0"
              color="bg-red-500"
              onClick={() => handleDeleteRow(element)}
            >
              {buttonDeleteText ?? "Confirmar"}
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FGridDeleteConfirmation;
