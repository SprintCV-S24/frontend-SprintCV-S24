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

const ECHelper: React.FC<{
  object: BaseItem;
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  itemId: string;
}> = ({ object, setDropdownIsOpen, itemId}) => {
  switch (object.type) {
    case resumeItemTypes.EDUCATION:
      return (
        <EducationItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as EducationType}
          originalId={itemId}
        ></EducationItem>
      );

    case resumeItemTypes.EXPERIENCE:
      return (
        <ExperienceItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as ExperienceType}
          originalId={itemId}
        ></ExperienceItem>
      );

    case resumeItemTypes.ACTIVITY:
      return (
        <ExtracurricularItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as ActivitiesType}
          originalId={itemId}
        ></ExtracurricularItem>
      );

    case resumeItemTypes.HEADING:
      return (
        <HeadingItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as HeadingsType}
          originalId={itemId}
        ></HeadingItem>
      );

    case resumeItemTypes.PROJECT:
      return (
        <ProjectItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as ProjectsType}
          originalId={itemId}
        ></ProjectItem>
      );

    case resumeItemTypes.SECTIONHEADING:
      return (
        <SubheadingItem
          setDropdownIsOpen={setDropdownIsOpen}
          original={object as SectionHeadingsType}
          originalId={itemId}
        ></SubheadingItem>
      );

    case resumeItemTypes.SKILL:
      return <div>HAHAAAA</div>;

    default:
      return <div>Unknown type.</div>;
  }
};

export default ECHelper;
