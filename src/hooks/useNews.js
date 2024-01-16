import { useQuery } from "react-query";
import ApiClient from "../services/apiClient";

const useNews = () => {
  const apiClient = new ApiClient("/backend/news.php");

  return useQuery({
    queryKey: ["news"],
    queryFn: apiClient.get,
  });
};

export default useNews;
