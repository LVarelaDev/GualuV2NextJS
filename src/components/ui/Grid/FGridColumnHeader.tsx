import { ReactNode } from "react";

const FGridColumnHeader = ({
  classNameHeader,
  labelHeader,
}: {
  classNameHeader?: string;
  labelHeader: string | ReactNode;
}) => {
  return (
    <th
      className={`p-3 text-left text-sm text-white font-normal first:rounded-tl-[4px] last:rounded-tr-[4px] ${
        classNameHeader ?? ""
      }`}
    >
      {labelHeader}
    </th>
  );
};

export default FGridColumnHeader;
