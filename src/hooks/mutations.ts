import {
  useMutation,
  QueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";
import { createActivity } from "../api/activityInterface";
import { createEducation } from "../api/educationInterface";
import { createExperience } from "../api/experienceInterface";
import { createHeading } from "../api/headerInterface";
import { createProject } from "../api/projectInterface";
import { createSectionHeading } from "../api/sectionHeadingInterface";
import { createSkill } from "../api/skillInterface";
import {
  createResume,
  updateResume,
  deleteResume,
} from "@/api/resumeInterface";
import { useImageCacheStore } from "./imageCache";

import { ActivitiesType } from "@/api/models/interfaces";
import { EducationType } from "@/api/models/interfaces";
import { ExperienceType } from "@/api/models/interfaces";
import { HeadingsType } from "@/api/models/interfaces";
import { ProjectsType } from "@/api/models/interfaces";
import { SectionHeadingsType } from "@/api/models/interfaces";
import { SkillsType } from "@/api/models/interfaces";
import { ResumesType } from "@/api/models/interfaces";
import { ResumesServerType } from "@/api/models/resumeModel";
import { BaseItem } from "@/api/models/interfaces";
import {
  deleteItem,
  itemUpdatedFields,
  updateItem,
} from "@/api/resumeItemInterface";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { templates } from "@/api/models/templates";

export const useAddActivity = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
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

export const useAddEducation = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
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

export const useAddExperience = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
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

export const useAddHeading = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
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

export const useAddProject = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
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

export const useAddSectionHeading = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
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

export const useAddSkill = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
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

export const useUpdateItem = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
  const invalidateItem = useImageCacheStore((state) => state.invalidateItem);

  return useMutation({
    mutationFn: async ({
      itemType,
      itemId,
	  templateId,
      updatedFields,
    }: {
      itemType: resumeItemTypes;
      itemId: string;
	  templateId: templates | undefined;
      updatedFields: itemUpdatedFields;
    }) => {
      if (token === undefined || templateId === undefined) {
        throw new Error("Token is undefined or templateId is undefined");
      }
      return await updateItem(itemType, itemId, updatedFields, token);
    },
    onSuccess: (_, { itemId, templateId }) => {
      invalidateItem(`${itemId}${templateId}`);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useAddResume = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async (resume: ResumesType) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await createResume(resume, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};

export const useUpdateResume = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async ({
      updatedFields,
      resumeId,
    }: {
      updatedFields: Partial<ResumesType>;
      resumeId: string;
    }) => {
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

export const useDeleteResume = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async (itemId: string) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await deleteResume(itemId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};

export const createCustomSetItemsInResume = (
  resumeId: string,
  mutateFn: UseMutateFunction<
    ResumesServerType,
    Error,
    {
      updatedFields: Partial<ResumesType>;
      resumeId: string;
    },
    unknown
  >,
  setItemsInResume: React.Dispatch<
    React.SetStateAction<
      | (BaseItem & {
          id: string;
        })[]
      | undefined
    >
  >,
  setSaving: () => void,
  setSaved: () => void,
): ((
  newItems: Array<
    BaseItem & {
      id: string;
    }
  >,
) => void) => {
  const customSetItemsInResume = (
    newItems: Array<BaseItem & { id: string }>,
  ) => {
    setSaving();

    const idArr = newItems.map((item) => item.id);
    const updatedFields = { itemIds: idArr };

    // console.log("Updated Fields");
    // console.log(updatedFields);

    mutateFn(
      { updatedFields, resumeId },
      {
        onSuccess: () => {
          setSaved();
        },
        onError: () => {
          setSaved(); //TODO: not great
        },
      },
    );
    setItemsInResume(newItems);
  };
  return customSetItemsInResume;
};

export const useDeleteItem = (
  queryClient: QueryClient,
  token: string | undefined,
) => {
  const invalidateItem = useImageCacheStore((state) => state.invalidateItem);

  return useMutation({
    mutationFn: async ({
      itemType,
      itemId,
    }: {
      itemType: resumeItemTypes;
      itemId: string;
    }) => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await deleteItem(itemType, itemId, token);
    },
    onSuccess: (_, { itemId }) => {
      invalidateItem(itemId);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
