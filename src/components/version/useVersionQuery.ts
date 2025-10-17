import { useQuery } from "react-query";
import ApiClient from "../../services/apiClient";
const apiClient = new ApiClient("/api/app-version");
export const useVersionQuery = () =>
  useQuery({
    queryKey: ["version"],
    queryFn: async () => (await apiClient.get()).version,
  });
