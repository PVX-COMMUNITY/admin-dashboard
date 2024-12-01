import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import PaginationTableCreateButton from "./PaginationTableCreateButton";

const PaginationTableHeader = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const searchTerm = urlParams.get("search") || "";

  const setSearchTerm = (value: string) => {
    setUrlParams({ search: value });
  };

  return (
    <div className="flex w-full justify-between">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-white my-4 w-[60%]"
      />
      <PaginationTableCreateButton />
    </div>
  );
};

export default PaginationTableHeader;
