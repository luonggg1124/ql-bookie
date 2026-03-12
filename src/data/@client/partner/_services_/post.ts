
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/data/@client/auth";
import { PartnerSdk, CreatePartnerRequest } from "../_sdk_";
import { partnerKeys } from "./get";

export const useCreatePartner = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const domain = user?.domain.trim() || "";

  const mutation = useMutation({
    mutationFn: async (body: CreatePartnerRequest["body"]) => {
      const { data, error } = await PartnerSdk.create({
        params: { domain },
        body,
      });

      if (error) {
        throw new Error(error?.error || "Lỗi khi tạo đối tác");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partnerKeys.all });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};