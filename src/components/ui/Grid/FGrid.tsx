import {
  convertToCLP,
  convertToPercentage,
  formattedDate,
  formattedDateAndHours,
} from "@/utils/helpers";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FGridColumn, TFGridColumnProps } from "./FGridColumn";
import FGridColumnHeader from "./FGridColumnHeader";
import FGridDeleteConfirmation from "./FGridDeleteConfirmation";
import { FGridFooter, TFGridFooterProps } from "./FGridFooter";
import { GridPaginationSection } from "./GridPaginationSection";
import LoadingAnimationContainer from "../Loadings/LoadingAnimationContainer";

type TFGridPropsBase<T> = {
  dataList: T[];
  children: ReactNode;
  keyIdentifier: keyof T;
  handleDeleteRow?: (row: T) => void;
  buttonDeleteText?: string | ReactNode;
  /**
   * Es la plantilla que se enviara al confirmar la eliminacion de un registro debe ir concatenada con las keys que
   * quisieras mostrar de la siguiente manera {{elementKey}}
   */
  templateConfirmText?: string;
  loading?: boolean;
  scrollable?: boolean;
  scrollMaxHeight?: string;
  noDataComponent?: ReactNode;
};

type TFGridPropsDefault<T> = TFGridPropsBase<T> & {
  type: "base";
};

interface TFGridPaginatedProps<T> extends TFGridPropsBase<T> {
  type: "paginated";
  currentPage: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  totalRecords: number;
}

interface TFGridWithFiltersProps<T> extends TFGridPropsBase<T> {
  type: "filtered";
  onSubmit: (data: any) => void;
  form: UseFormReturn<any, any>;
}

type TFGridProps<T> =
  | TFGridPropsDefault<T>
  | TFGridPaginatedProps<T>
  | TFGridWithFiltersProps<T>;

type TFGridColumnPropsPrivate = {
  className?: string;
  value?: string | React.ReactNode;
};

const FGridColumnPrivate = ({ value, className }: TFGridColumnPropsPrivate) => {
  return (
    <td
      className={`px-3 py-4 border-b border-gray-200 bg-white text-sm  ${
        className ?? ""
      }`}
    >
      {value}
    </td>
  );
};

const FGrid = <T,>(prop: TFGridProps<T>) => {
  const {
    dataList,
    children,
    keyIdentifier,
    loading,
    scrollable = false,
    scrollMaxHeight,
    noDataComponent,
  } = prop;
  const footerElements = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === FGridFooter
  );

  if (footerElements.length > 1) {
    throw new Error("FGrid can only have one FGrid.Footer child");
  }

  const columnParser = {
    CLP: (value: string | T[keyof T]) => convertToCLP(value as number),
    date: (value: string | T[keyof T]) => formattedDate(value as string),
    dateTime: (value: string | T[keyof T]) =>
      formattedDateAndHours(value as string),
    percentage: (value: string | T[keyof T]) =>
      convertToPercentage(value as number, 2),
    string: (value: string | T[keyof T]) => value,
  };
  const [confirmDeleteKey, setConfirmDeleteKey] = useState<T[keyof T] | null>(
    null
  );

  const handleDeleteConfirmation = (key: any) => {
    setConfirmDeleteKey(key);
  };

  //FILTERS

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterToggle = (filterName: string | null) => {
    if (!loading) {
      setActiveFilter(activeFilter === filterName ? null : filterName);
    }
  };

  const handleCloseFilter = () => setActiveFilter(null);

  const onSubmitAndClose = (data: any) => {
    if (prop.type === "filtered") {
      prop.onSubmit(data);
      handleCloseFilter();
    }
  };

  // SCROLL

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (dataList.length <= 5) {
      setScroll(false);
    } else {
      setScroll(scrollable);
    }
  }, [dataList, scrollable]);

  return (
    <div
      className={
        scroll
          ? ` custom-scroll-primary overflow-x-hidden scroll-smooth ${
              scrollMaxHeight ?? "max-h-[300px]"
            }`
          : ""
      }
    >
      <div className={scroll ? "pr-6" : ""}>
        <table
          className={`w-full table-auto rounded-xl rounded-tl-3xl rounded-tr-3xl border-t-0 bg-white ${
            scroll ? "relative z-0 " : ""
          }`}
        >
          <thead
            className={`z-[99999] px-5 py-3 border-b-2 border-gray-200 bg-purplePrimary text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
              scroll ? "sticky  top-0" : ""
            }`}
          >
            <tr>
              {React.Children.map(children, (gridColumn) => {
                if (
                  !React.isValidElement<TFGridColumnProps<T>>(gridColumn) ||
                  gridColumn.type !== FGridColumn
                )
                  return;
                const props: TFGridColumnProps<T> = gridColumn.props;

                return (
                  <FGridColumnHeader
                    labelHeader={props.labelHeader}
                    classNameHeader={props.classNameHeader}
                  />
                );
              })}
              {prop.handleDeleteRow && (
                <FGridColumnHeader
                  classNameHeader="text-center"
                  labelHeader="Eliminar"
                />
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={100}>
                  <LoadingAnimationContainer />
                </td>
              </tr>
            ) : dataList.length === 0 ? (
              <tr>
                <td colSpan={100}>
                  {noDataComponent ?? <div>No hay datos</div>}
                </td>
              </tr>
            ) : (
              dataList.map((element, index) => {
                // Si se está mostrando una fila de confirmación para eliminar, muestra la fila de confirmación
                if (confirmDeleteKey === element[keyIdentifier]) {
                  return (
                    <FGridDeleteConfirmation
                      element={element}
                      handleDeleteRow={prop.handleDeleteRow!}
                      setConfirmDeleteKey={setConfirmDeleteKey}
                      buttonDeleteText={prop.buttonDeleteText}
                      key={`tr-${String(element[keyIdentifier])}`}
                      templateConfirmText={prop.templateConfirmText}
                    />
                  );
                }

                return (
                  <tr
                    key={`tr-${String(element[keyIdentifier])}`}
                    className="border-b border-dashed border-b-gray-200 text-black"
                  >
                    {/* Renderiza las columnas de datos normales */}
                    {React.Children.map(children, (gridColumn) => {
                      if (
                        !React.isValidElement(gridColumn) ||
                        gridColumn.type !== FGridColumn
                      )
                        return;
                      const props: TFGridColumnProps<T> = gridColumn.props;
                      let value = props.keyColumnIdentifier
                        ? element[props.keyColumnIdentifier]
                        : "";
                      if (props.colRender)
                        return (
                          <FGridColumnPrivate
                            value={props.colRender(value, element, index)}
                          />
                        );

                      value = columnParser[props.dataType ?? "string"](value);

                      return (
                        <FGridColumnPrivate
                          className={props.className}
                          value={String(value)}
                        />
                      );
                    })}
                    {/* Agrega el botón de eliminar */}
                    {prop.handleDeleteRow && (
                      <FGridColumnPrivate
                        value={
                          <button
                            onClick={() =>
                              handleDeleteConfirmation(element[keyIdentifier])
                            }
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              style={{
                                fontSize: "20px",
                              }}
                              className="cursor-pointer text-secondary"
                            />
                          </button>
                        }
                        className="text-center"
                      />
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child) || child.type !== FGridFooter)
              return;
            const props: TFGridFooterProps = child.props;
            return <tfoot>{props.footerRender}</tfoot>;
          })}
        </table>
      </div>
      {prop.type === "paginated" && prop.totalRecords > prop.pageSize && (
        <GridPaginationSection
          currentPage={prop.currentPage}
          pageSize={prop.pageSize}
          setPage={prop.setPage}
          totalRecords={prop.totalRecords}
          setPageSize={prop.setPageSize}
          currentListLength={dataList.length}
        />
      )}
    </div>
  );
};

FGrid.Column = FGridColumn;
FGrid.Footer = FGridFooter;

export default FGrid;
