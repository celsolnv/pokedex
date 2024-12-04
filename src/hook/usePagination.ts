/* eslint-disable no-use-before-define */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

interface IUsePaginationReturn {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export function usePagination(): IUsePaginationReturn {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(getCurrentPage());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    navigate({
      search: createSearchParams({ page: String(currentPage) }).toString()
    });
  }, [currentPage]);

  function getCurrentPage(): number {
    const params = qs.parse(location.search);
    const newPage = params.page ? Number(params.page) : 1;
    return newPage;
  }

  return {
    currentPage,
    setCurrentPage
  };
}
