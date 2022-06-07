import { format } from 'date-fns';
import { useQuery } from 'react-query';

import { SortState } from '@/hooks/useSort';
import { httpClient } from '@/lib/httpClient';

import { CarbonDocument, documentKeys } from '../types';

function fetchDocuments(filter: Record<string, unknown>): Promise<CarbonDocument[]> {
  const newFilter: Record<string, string> = {};
  Object.keys(filter).forEach(function (key) {
    if (typeof filter[key] === 'undefined' || filter[key] === null || filter[key] === '') {
      return;
    } else {
      newFilter[key] = filter[key] as string;
    }
  });
  console.log(newFilter);

  const params = new URLSearchParams({
    ...newFilter,
  }).toString();
  return httpClient.get(`/carbon-documents?${params}`);
}

export function useGetDocuments(userEmail: string, filter: Record<any, any>, sort: SortState) {
  const { dates, ...newFilter } = filter;
  const parsed = {
    ...newFilter,
    credit_start_lte: dates?.from ? format(dates.from, 'yyyy-MM-dd') : undefined,
    credit_end_gte: dates?.to ? format(dates.to, 'yyyy-MM-dd') : undefined,
    created_by_user: userEmail,
    _sort: !!sort.field && !!sort.order ? `${sort.field}:${sort.order}` : undefined,
  };
  return useQuery(documentKeys.search(parsed), () => fetchDocuments(parsed));
}
