import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { jsonFetcher } from "@/lib/fetcher";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
export const usePagingBSUser = () => {
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
    } = useSWRInfinite(
      (index) => {
        return `/api/users/list/${index}?sortOrder=Relevance`
      },
      jsonFetcher,
      {
        keepPreviousData: true,
        revalidateFirstPage: false,
        initialSize: 2,
      }
    );
      
    const users:BSUserWithStats[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    return {
        users,
        isLoadingMore,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
    }
}