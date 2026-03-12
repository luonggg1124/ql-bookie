import { useQuery } from "@tanstack/react-query";
import {
  AdministrativeBoundarySdk,
  AdministrativeBoundaryType,
} from "../_sdk_";

export const administrativeBoundaryKeys = {
  all: ["administrative-boundary"] as const,
  list: (request: {
    query?: {
      newData?: boolean;
      type?: AdministrativeBoundaryType;
      idParent?: string;
    };
  }) => [...administrativeBoundaryKeys.all, "list", request] as const,
};

export const useAdministrativeBoundary = (query?: {
  newData?: boolean;
  type?: AdministrativeBoundaryType;
  idParent?: string;
}) => {
  const queryRequest = {
    query,
  };
  const queryKey = { query };

  const queryResult = useQuery({
    queryKey: administrativeBoundaryKeys.list(queryKey),
    queryFn: async () => {
      const response =
        await AdministrativeBoundarySdk.getAdministrativeBoundary(queryRequest);

      if (response.error) {
        throw new Error(response.error.error || "Lỗi khi lấy dữ liệu");
      }

      return response?.data?.data || [];
    },
    enabled: query?.type !== "XaPhuong" || !!query?.idParent,
  });

  return {
    loading: queryResult.isLoading,
    data: queryResult.data,
    error: queryResult.error,
    refetch: queryResult.refetch,
    isFetching: queryResult.isFetching,
  };
};

