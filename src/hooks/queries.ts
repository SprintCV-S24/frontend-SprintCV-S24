import { useQuery } from "@tanstack/react-query";
import { getAllActivities } from "@/api/activityInterface";
import { getAllItems } from "@/api/resumeItemInterface";

export const useGetAllItems = (token: string | undefined) => {
	return useQuery({queryKey: ['allItems'], enabled: !!token, queryFn: async () => {
		if (token === undefined) {
			throw new Error('Token is undefined');
		}
		return getAllItems(token);
	},});
}