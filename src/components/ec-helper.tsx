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


const ECHelper: React.FC<{ object: BaseItem, setDropdownIsOpen: Dispatch<SetStateAction<boolean>> }> = ({ object, setDropdownIsOpen }) => {
  switch (object.type) {
    case resumeItemTypes.EDUCATION:
      return <EducationItem setDropdownIsOpen={setDropdownIsOpen}></EducationItem>;

    case resumeItemTypes.EXPERIENCE:
        return <ExperienceItem setDropdownIsOpen={setDropdownIsOpen}></ExperienceItem>

    case resumeItemTypes.ACTIVITY:
        return <ExtracurricularItem setDropdownIsOpen={setDropdownIsOpen}></ExtracurricularItem>

    case resumeItemTypes.HEADING:
        return <HeadingItem setDropdownIsOpen={setDropdownIsOpen}></HeadingItem>;

    case resumeItemTypes.PROJECT:
        return <ProjectItem setDropdownIsOpen={setDropdownIsOpen}></ProjectItem>;

    case resumeItemTypes.SECTIONHEADING:
        return <SubheadingItem setDropdownIsOpen={setDropdownIsOpen}></SubheadingItem>;

    case resumeItemTypes.SKILL:
        return <div>HAHAAAA</div>;

    default:
      return <div>Unknown type.</div>;
  }
};

export default ECHelper;
