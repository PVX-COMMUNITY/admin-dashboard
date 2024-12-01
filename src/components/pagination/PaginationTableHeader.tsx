import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import PaginationTableCreateButton from "./PaginationTableCreateButton";
import { useRef, useState } from "react";

const PaginationTableHeader = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const [term, setTerm] = useState(urlParams.get("search") || "");
  const timer = useRef<NodeJS.Timeout>();

  return (
    <div className="flex w-full justify-between">
      <Input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={(e) => {
          const value = e.target.value;
          setTerm(value);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            setUrlParams({ search: value });
          }, 500);
        }}
        className="text-white my-4 w-[60%]"
      />
      <PaginationTableCreateButton />
    </div>
  );
};

export default PaginationTableHeader;
