import { ExtractsEndPoints, getExtracts } from "@/services/extractsService";
import { PAGE_INDEX, PAGE_SIZE } from "@/utils/contants";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next-view-transitions";
import { useState } from "react";
import useSWR from "swr";
import TableExtracts from "./partials/TableExtracts";

const ExtractsComponent = () => {
  const [currentPage, setCurrentPage] = useState(PAGE_INDEX);
  const { data: extracts, isLoading: loading } = useSWR(
    [ExtractsEndPoints.GetExtracts, currentPage],
    () => getExtracts(currentPage, PAGE_SIZE)
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center gap-5">
        <Link
          href={`/extracts/create`}
          className="bg-purplePrimary text-white rounded-md p-3"
        >
          Nuevo extracto
        </Link>
      </div>
      <div className="flex flex-col  gap-5 bg-white p-5 rounded-md">
        <div className="text-gray-700 text-xl font-bold">
          Gestion de extractos
        </div>
        <div className="flex-1 overflow-auto">
          {!loading && extracts !== undefined ? (
            <TableExtracts
              datalist={extracts.items}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={extracts.pageSize}
              totalRecords={extracts.totalCount}
            />
          ) : (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtractsComponent;
