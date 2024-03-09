import { useMutation, QueryClient } from "@tanstack/react-query";

import { createActivity } from "../api/activityInterface";
import { createEducation } from "../api/educationInterface";
import { createExperience } from "../api/experienceInterface";
import { createHeading } from "../api/headerInterface";
import { createProject } from "../api/projectInterface";
import { createSectionHeading } from "../api/sectionHeadingInterface";
import { createSkill } from "../api/skillInterface";
import { updateResume } from "@/api/resumeInterface";

import { ActivitiesType } from "@/api/models/interfaces";
import { EducationType } from "@/api/models/interfaces";
import { ExperienceType } from "@/api/models/interfaces";
import { HeadingsType } from "@/api/models/interfaces";
import { ProjectsType } from "@/api/models/interfaces";
import { SectionHeadingsType } from "@/api/models/interfaces";
import { SkillsType } from "@/api/models/interfaces";
import { ResumesType } from "@/api/models/interfaces";

export const useAddActivity = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (activity: ActivitiesType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createActivity(activity, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useAddEducation = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (education: EducationType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createEducation(education, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useAddExperience = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (experience: ExperienceType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createExperience(experience, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useAddHeading = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (heading: HeadingsType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createHeading(heading, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useAddProject = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (project: ProjectsType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createProject(project, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useAddSectionHeading = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (sectionHeading: SectionHeadingsType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createSectionHeading(sectionHeading, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useAddSkill = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async (skill: SkillsType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createSkill(skill, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useUpdateResume = (queryClient: QueryClient, token: string | undefined) => {
  return useMutation({
    mutationFn: async ({ updatedFields, resumeId }: { updatedFields: Partial<ResumesType>; resumeId: string }) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await updateResume(updatedFields, resumeId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};
