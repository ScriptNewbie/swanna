import { useQuery } from "react-query";
import ApiClient from "../../services/apiClient";

const apiClient = new ApiClient("/api/custom-button");

export const useAdditionalButton = () => {
  return useQuery({
    queryKey: ["additionalButton"],
    queryFn: apiClient.get,
  });
};
