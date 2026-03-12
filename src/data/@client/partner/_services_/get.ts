import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/data/@client/auth";
import { PartnerSdk } from "../_sdk_";
import { IPartner } from "@/data/models/partner";

export const partnerKeys = {
    all: ['partner'] as const,
    lists: () => [...partnerKeys.all, 'list'] as const,
    list: (params: GetPartnerRequest) => [...partnerKeys.lists(), params] as const,
}

type GetPartnerRequest = {
    page: number;
    pageSize: number;
    typeOfBusiness: string;
    search: string;
    typeOfFilterDate: string;
    from: string;
    to: string;
    active: string;
    warningQuota: string;
}

 export const UsePartnerInfinite = (request: GetPartnerRequest) => {
   const {user} = useAuth();
   const queryClient = useQueryClient();

   const domain = user?.domain.trim() || "";
   const enabled = domain.length > 0 ;

   const queryKey = partnerKeys.list({
    page: request?.page || 1,
    pageSize: request?.pageSize || 10,
    typeOfBusiness: request?.typeOfBusiness || "",
    search: request?.search || "",
    typeOfFilterDate: request?.typeOfFilterDate || "",
    from: request?.from || "",
    to: request?.to || "",
    active: request?.active || "",
    warningQuota: request?.warningQuota || "",
   });
   
   const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
        const {data, error} = await PartnerSdk.get({
            params: { domain },
            queries: {
                ...request,
                page: pageParam as number,
            }
        });
        if (error) {
            throw new Error(error.error || "Lỗi khi lấy danh sách đối tác");
        }
        return data;
    },
    getNextPageParam: (lastPage, allPages) => {
        if(!lastPage) return undefined;
        const total = Number(lastPage.total ?? 0);
        const currentPageSize = Number(request?.pageSize ?? (Array.isArray(lastPage.data) ? lastPage.data.length : 0)) || 0;

        if(!Number.isFinite(currentPageSize) || currentPageSize <= 0) return undefined;

        const loadedCount = allPages.reduce (
            (sum, page) => sum + (Array.isArray(page?.data) ? page.data.length : 0), 0 
        );

        if(total > 0 && loadedCount >= total) return undefined;

        if(!Array.isArray(lastPage.data) || lastPage.data.length < currentPageSize) return undefined;

        const currentPage = allPages.length;
        return currentPage + 1;
    },
    initialPageParam: 1,
    enabled,
   });

   const allData: IPartner[] = query.data?.pages.flatMap((page) => page.data ?? []) ?? [];

   const mutate = () => {
    query.refetch();
   };

   return {
    loading: query.isLoading,
    fetching: query.isFetching,
    fetchingNextPage: query.isFetchingNextPage,
    data: allData,
    pages: query.data?.pages ?? [],
    error: query.error,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    mutate,
    refetch: query.refetch,
    invalidate: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  };
}