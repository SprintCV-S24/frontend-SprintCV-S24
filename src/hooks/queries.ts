import { useQuery } from "@tanstack/react-query";
import { getAllActivities } from "@/api/activityInterface";

const useGetAllItems = (token: string) => {
	return useQuery({queryKey: ['allItems'], queryFn: async () => getAllActivities(token)});
}