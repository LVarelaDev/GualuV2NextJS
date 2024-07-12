type ColumnType = "string" | "CLP" | "date" | "percentage" | "dateTime";

export type TFGridColumnProps<T> = {
  colRender?: (value: unknown, row: T, index?: number) => React.ReactNode;
  labelHeader: string | React.ReactNode;
  value?: string | React.ReactNode;
  keyColumnIdentifier?: keyof T;
  dataType?: ColumnType;
  className?: string;
  classNameHeader?: string;
  filter?: any;
  direction?: "ltr" | "rtl";
};

export const FGridColumn = <T,>({
  colRender,
  labelHeader,
  value,
  keyColumnIdentifier,
  dataType,
  className,
  classNameHeader,
  filter,
  direction,
}: TFGridColumnProps<T>) => {
  return null;
};
