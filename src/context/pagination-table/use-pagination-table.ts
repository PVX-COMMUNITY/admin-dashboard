import { useContext } from 'react';
import PaginationTableContext from './pagination-table-context';

const usePaginationTable = () => {
  const context = useContext(PaginationTableContext);
  if (context === undefined) {
    throw new Error('PaginationTable must be used within a PaginationTableProvider');
  }
  return context;
};

export default usePaginationTable;
