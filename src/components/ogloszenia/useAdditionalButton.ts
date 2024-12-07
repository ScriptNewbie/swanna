import { useQuery } from "react-query";

export const useAdditionalButton = () => {
  return useQuery({
    queryKey: ["additionalButton"],
    queryFn: () => {
      return new Promise((resolve) => {
        const data = {
          isEnabled: false,
          title: "Plan kolędy",
          url: "/pdf/koleda-rc1.pdf",
        };
        setTimeout(() => {
          resolve(data);
        }, 50);
      });
    },
  });
};
