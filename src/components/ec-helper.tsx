import {
  HeadingsType,
  EducationType,
  ExperienceType,
  ProjectsType,
  SkillsType,
  ActivitiesType,
  SectionHeadingsType,
  BaseItem,
} from "../api/models/interfaces";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { EducationItem } from "./resume-items/education-item";
import { ExperienceItem } from "./resume-items/experience-item";
import { ExtracurricularItem } from "./resume-items/activity";
import { HeadingItem } from "./resume-items/heading-item";
import { ProjectItem } from "./resume-items/project-item";
import { SubheadingItem } from "./resume-items/subheading-item";
import { SkillItem } from "./resume-items/skill-item";
import { templates } from "@/api/models/templates";

const ECHelper: React.FC<{
  object: BaseItem;
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  itemId: string;
  templateId: templates | undefined;

}> = ({ object, setDropdownIsOpen, itemId, templateId}) => {
  switch (object.type) {
    case resumeItemTypes.EDUCATION:
      return (
        <EducationItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as EducationType}
          originalId={itemId}
          templateId={templateId}
        ></EducationItem>
      );

    case resumeItemTypes.EXPERIENCE:
      return (
        <ExperienceItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as ExperienceType}
          originalId={itemId}
          templateId={templateId}
        ></ExperienceItem>
      );

    case resumeItemTypes.ACTIVITY:
      return (
        <ExtracurricularItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as ActivitiesType}
          originalId={itemId}
          templateId={templateId}
        ></ExtracurricularItem>
      );

    case resumeItemTypes.HEADING:
      return (
        <HeadingItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as HeadingsType}
          originalId={itemId}
          templateId={templateId}
        ></HeadingItem>
      );

    case resumeItemTypes.PROJECT:
      return (
        <ProjectItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as ProjectsType}
          originalId={itemId}
          templateId={templateId}
        ></ProjectItem>
      );

    case resumeItemTypes.SECTIONHEADING:
      return (
        <SubheadingItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as SectionHeadingsType}
          originalId={itemId}
          templateId={templateId}
        ></SubheadingItem>
      );

    case resumeItemTypes.SKILL:
      return (
        <SkillItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as SkillsType}
          originalId={itemId}
          templateId={templateId}
        ></SkillItem>
      );

    default:
      return <div>Unknown type.</div>;
  }
};

export default ECHelper;
