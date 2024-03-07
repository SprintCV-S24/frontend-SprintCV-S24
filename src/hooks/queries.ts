import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/api/resumeItemInterface";

export const useGetAllItems = (token: string | undefined) => {
	return useQuery({queryKey: ['allItems'], enabled: !!token, queryFn: async () => {
		console.log("query being ran");
		if (token === undefined) {
			throw new Error('Token is undefined');
		}
		console.log("about to call getAllActivities");
		return await getAllItems(token);
	},});
}