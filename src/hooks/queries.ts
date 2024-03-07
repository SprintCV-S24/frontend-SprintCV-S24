import { useQuery } from "@tanstack/react-query";
import { getAllActivities } from "@/api/activityInterface";

export const useGetAllItems = (token: string | undefined) => {
	return useQuery({queryKey: ['allItems'], enabled: !!token, queryFn: async () => {
		if (token === undefined) {
			throw new Error('Token is undefined');
		}
		return getAllActivities(token);
	},});
}