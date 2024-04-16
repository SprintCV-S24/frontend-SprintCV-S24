import { generateLatex, generateFullResume } from "./latexString";
import { generateLatexT2, generateFullResumeT2 } from "./latexStringTwo";
import { templates } from "@/api/models/templates";
import { BaseItem } from "@/api/models/interfaces";

export const generateLatexGeneric = (resumeItem: BaseItem, template: templates | undefined) => {
	switch(template){
		case templates.JAKES:
			return generateLatex(resumeItem);
		case templates.BLUE:
			return generateLatexT2(resumeItem);
		case undefined:
			return undefined;
	}
}

export const generateFullResumeGeneric = (resumeItems: BaseItem[], template: templates | undefined) => {
	switch(template){
		case templates.JAKES:
			return generateFullResume(resumeItems);
		case templates.BLUE:
			return generateFullResumeT2(resumeItems);
		case undefined:
			return undefined;
	}
}