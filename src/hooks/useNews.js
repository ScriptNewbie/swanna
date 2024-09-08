import { useQuery } from "react-query";
import ApiClient from "../services/apiClient";

const useNews = () => {
  const apiClient = new ApiClient("/api/news");

  return useQuery({
    queryKey: ["news"],
    queryFn: apiClient.get,
  });
};

export default useNews;
