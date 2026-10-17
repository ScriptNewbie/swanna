import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/apiClient";

type AdditionalButton = {
  enabled: boolean;
  url: string;
  name: string;
};

const apiClient = new ApiClient<AdditionalButton>("/api/custom-button");

export const useAdditionalButton = () => {
  return useQuery({
    queryKey: ["additionalButton"],
    queryFn: apiClient.get,
  });
};
