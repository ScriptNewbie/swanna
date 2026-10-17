import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

export type NewsPost = {
  id: number;
  title: string;
  publicationDate: string;
  content: string;
};

const apiClient = new ApiClient<NewsPost[]>("/api/news");

const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: apiClient.get,
  });
};

export default useNews;
