import { useMutation, QueryClient } from "@tanstack/react-query";

import { createActivity } from "../api/activityInterface";
import { createEducation } from "../api/educationInterface";
import { createExperience } from "../api/experienceInterface";
import { createHeading } from "../api/headerInterface";
import { createProject } from "../api/projectInterface";
import { createSectionHeading } from "../api/sectionHeadingInterface";
import { createSkill } from "../api/skillInterface";

import { ActivitiesType } from "@/api/models/interfaces";

export const useAddActivity = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (activity: ActivitiesType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createActivity(activity, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allItems"] });
    },
  });
};
