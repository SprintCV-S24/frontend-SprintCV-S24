import { SkillsType } from "./interfaces";
import { resumeItemTypes } from "./resumeItemTypes";

export interface SkillServerType extends SkillsType {
  _id: string;
  user: string;
}

export interface SkillServerExplicitType extends SkillServerType {
  type: resumeItemTypes.SKILL;
}
