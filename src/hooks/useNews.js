import { useQuery } from "react-query";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient("/api/news");

const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: apiClient.get,
  });
};

export default useNews;
