import { start } from "repl";
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
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { sanitize } from "./latexString";

// Step 1: Set up the bforasic structure

export function getLatexPreambleT2(): string {
  return `\\documentclass[letterpaper,11pt]{article}
  
  \\usepackage{latexsym}
  \\usepackage[empty]{fullpage}
  \\usepackage{titlesec}
  \\usepackage{marvosym}
  \\usepackage[usenames,dvipsnames]{color}
  \\usepackage{verbatim}
  \\usepackage{enumitem}
  \\usepackage[hidelinks]{hyperref}
  \\usepackage[english]{babel}
  \\usepackage{tabularx}
  \\usepackage{fontawesome5}
  \\usepackage{multicol}
  \\usepackage{graphicx}%\\setmainfont{Times New Roman}
  \\setlength{\\multicolsep}{-3.0pt}
  \\setlength{\\columnsep}{-1pt}
  \\input{glyphtounicode}
  
  \\RequirePackage{tikz}
  \\RequirePackage{xcolor}
  
  \\definecolor{cvblue}{HTML}{0E5484}
  \\definecolor{black}{HTML}{130810}
  \\definecolor{darkcolor}{HTML}{0F4539}
  \\definecolor{cvgreen}{HTML}{3BD80D}
  \\definecolor{taggreen}{HTML}{00E278}
  \\definecolor{SlateGrey}{HTML}{2E2E2E}
  \\definecolor{LightGrey}{HTML}{666666}
  \\colorlet{name}{black}
  \\colorlet{tagline}{darkcolor}
  \\colorlet{heading}{darkcolor}
  \\colorlet{headingrule}{cvblue}
  \\colorlet{accent}{darkcolor}
  \\colorlet{emphasis}{SlateGrey}
  \\colorlet{body}{LightGrey}

  \\usepackage{CormorantGaramond}
  \\usepackage{charter}
  

  \\addtolength{\\oddsidemargin}{-0.6in}
  \\addtolength{\\evensidemargin}{-0.5in}
  \\addtolength{\\textwidth}{1.19in}
  \\addtolength{\\topmargin}{-.7in}
  \\addtolength{\\textheight}{1.4in}
  \\urlstyle{same}
  
  \\definecolor{airforceblue}{rgb}{0.36, 0.54, 0.66}
  
  \\raggedbottom
  \\raggedright
  \\setlength{\\tabcolsep}{0in}
  
  \\titleformat{\\section}{
    \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
  }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
  
  \\pdfgentounicode=1
  
  \\newcommand{\\resumeItem}[1]{
    \\item\\small{
      {#1 \\vspace{-1pt}}
    }
  }
  
  \\newcommand{\\classesList}[4]{
      \\item\\small{
          {#1 #2 #3 #4 \\vspace{-2pt}}
    }
  }
  
  \\newcommand{\\resumeSubheading}[4]{
    \\vspace{-2pt}\\item
      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{\\large#1} & \\textbf{\\small#2}  \\\\
          \\textit{\\large#3} &  \\textit{\\small #4} \\\\
        
      \\end{tabular*}\\vspace{-7pt}
  }
  
  \\newcommand{\\resumeSubheadingTwo}[4]{
    \\vspace{-2pt}\\item
      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{\\large#1} & \\textbf{\\small#2}  \\\\
          \\textit{\\small#3} &  \\textit{\\small #4} \\\\
        
      \\end{tabular*}\\vspace{-7pt}
  }
  
  \\newcommand{\\resumeSingleSubheading}[4]{
    \\vspace{-2pt}\\item
      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{\\large#1} & \\textbf{\\small #2} \\
        
      \\end{tabular*}\\vspace{-7pt}
  }
  
  \\newcommand{\\resumeSubSubheading}[2]{
      \\item
      \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
        \\textit{\\small#1} & \\textit{\\small #2} \\
      \\end{tabular*}\\vspace{-7pt}
  }
  
  
  \\newcommand{\\resumeProjectHeading}[2]{
      \\item
      \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
        \\small#1 & \\textbf{\\small #2}\\
      \\end{tabular*}\\vspace{-7pt}
  }
  
  \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
  
  \\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
  \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
  
  \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
  \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
  \\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.1in]}
  \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
  
  \\newcommand\\sbullet[1][.5]{\\mathbin{\\vcenter{\\hbox{\\scalebox{#1}{$\\bullet$}}}}}
  `.trim();
}

export function getLatexContentSizedPreambleT2(): string {
  return `\\documentclass[letterpaper,11pt]{article}
  
  \\usepackage{latexsym}
  \\usepackage[empty]{fullpage}
  \\usepackage{titlesec}
  \\usepackage{marvosym}
  \\usepackage[usenames,dvipsnames]{color}
  \\usepackage{verbatim}
  \\usepackage{enumitem}
  \\usepackage[hidelinks]{hyperref}
  \\usepackage[english]{babel}
  \\usepackage{tabularx}
  \\usepackage{fontawesome5}
  \\usepackage{multicol}
  \\usepackage{graphicx}%\\setmainfont{Times New Roman}
  \\usepackage[top=0in, left=1in, right=1in, bottom=1in]{geometry}
  \\setlength{\\multicolsep}{-3.0pt}
  \\setlength{\\columnsep}{-1pt}
  \\input{glyphtounicode}

  
  \\RequirePackage{tikz}
  \\RequirePackage{xcolor}
  
  \\definecolor{cvblue}{HTML}{0E5484}
  \\definecolor{black}{HTML}{130810}
  \\definecolor{darkcolor}{HTML}{0F4539}
  \\definecolor{cvgreen}{HTML}{3BD80D}
  \\definecolor{taggreen}{HTML}{00E278}
  \\definecolor{SlateGrey}{HTML}{2E2E2E}
  \\definecolor{LightGrey}{HTML}{666666}
  \\colorlet{name}{black}
  \\colorlet{tagline}{darkcolor}
  \\colorlet{heading}{darkcolor}
  \\colorlet{headingrule}{cvblue}
  \\colorlet{accent}{darkcolor}
  \\colorlet{emphasis}{SlateGrey}
  \\colorlet{body}{LightGrey}

  \\usepackage{CormorantGaramond}
  \\usepackage{charter}
  

  \\addtolength{\\oddsidemargin}{-0.6in}
  \\addtolength{\\evensidemargin}{-0.5in}
  \\addtolength{\\textwidth}{1.19in}
  \\addtolength{\\textheight}{1.4in}
  \\urlstyle{same}
  
  \\definecolor{airforceblue}{rgb}{0.36, 0.54, 0.66}
  
  \\raggedbottom
  \\raggedright
  \\setlength{\\tabcolsep}{0in}
  
  \\titleformat{\\section}{
    \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
  }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
  
  \\pdfgentounicode=1
  
  \\newcommand{\\resumeItem}[1]{
    \\item\\small{
      {#1 \\vspace{-1pt}}
    }
  }
  
  \\newcommand{\\classesList}[4]{
      \\item\\small{
          {#1 #2 #3 #4 \\vspace{-2pt}}
    }
  }
  
  \\newcommand{\\resumeSubheading}[4]{
    \\vspace{-2pt}\\item
      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{\\large#1} & \\textbf{\\small#2}  \\\\
          \\textit{\\large#3} &  \\textit{\\small #4} \\\\
        
      \\end{tabular*}\\vspace{-7pt}
  }

  \\newcommand{\\resumeSubheadingTwo}[4]{
    \\vspace{-2pt}\\item
      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{\\large#1} & \\textbf{\\small#2}  \\\\
          \\textit{\\small#3} &  \\textit{\\small #4} \\\\
        
      \\end{tabular*}\\vspace{-7pt}
  }
  
  
  \\newcommand{\\resumeSingleSubheading}[4]{
    \\vspace{-2pt}\\item
      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{\\large#1} & \\textbf{\\small #2} \\
        
      \\end{tabular*}\\vspace{-7pt}
  }
  
  \\newcommand{\\resumeSubSubheading}[2]{
      \\item
      \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
        \\textit{\\small#1} & \\textit{\\small #2} \\
      \\end{tabular*}\\vspace{-7pt}
  }
  
  
  \\newcommand{\\resumeProjectHeading}[2]{
      \\item
      \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
        \\small#1 & \\textbf{\\small #2}\\
      \\end{tabular*}\\vspace{-7pt}
  }
  
  \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
  
  \\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
  \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
  
  \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
  \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
  \\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.1in]}
  \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
  
  \\newcommand\\sbullet[1][.5]{\\mathbin{\\vcenter{\\hbox{\\scalebox{#1}{$\\bullet$}}}}}

  \\AtBeginDocument{
            \\setbox0=\\vbox\\bgroup
            \\preto\\enddocument{\\egroup
                \\dimen0=\\dp0
                \\pdfpageheight=\\dimexpr\\ht0+\\dimen0
                \\unvbox0\\kern-\\dimen0 }
			}		

  `.trim();
}

export const generateHeaderLatexT2 = (activityObj: HeadingsType): string => {
  let headerLatex = getLatexContentSizedPreambleT2();
  headerLatex = headerLatex.replace(
    "\\usepackage[top=0in, left=1in, right=1in, bottom=1in]{geometry}",
    "\\usepackage[top=.3in, left=1in, right=1in, bottom=1in]{geometry}",
  );
  headerLatex += `\\begin{document}\n`;
  headerLatex += generateHeaderLatexHelperT2(activityObj);
  headerLatex += `\\end{document}`;
  return headerLatex;
};

export const generateHeaderLatexHelperT2 = (
  activityObj: HeadingsType,
): string => {
  let headerLatex = `\\begin{center}\n`;
  headerLatex += `{\\huge ${sanitize(activityObj.name)}} \\\\ \\vspace{2pt}\n`;

  activityObj.items.forEach((item, index) => {
    const sanitizedItem = sanitize(item.item);
    if (item.href) {
      headerLatex += `\\href{${item.href}}{\\color{blue}{${sanitizedItem}}}`;
    } else {
      headerLatex += `${sanitizedItem}`;
    }

    if (index < activityObj.items.length - 1) {
      headerLatex += ` ~ \\small{-} ~ `;
    }
  });

  headerLatex += `\\vspace{7pt}\n`;
  headerLatex += `\\end{center}`;
  return headerLatex;
};

// Define a mock HeadingsType object with sample data
export const mockHeaderData: HeadingsType = {
  user: "johndoe",
  itemName: "John Doe Header",
  name: "John Doe",
  items: [
    { item: "+1 (123) 456 7890", href: "" },
    { item: "Portfolio", href: "http://johndoeportfolio.com" },
    { item: "john.doe@example.com", href: "mailto:john.doe@example.com" },
    {
      item: "linkedin.com/in/johndoe",
      href: "https://www.linkedin.com/in/johndoe",
    },
    { item: "github.com/johndoe", href: "https://github.com/johndoe" },
  ],
};

// Generate the LaTeX code for the header using the mock data
export const headerLatex = generateHeaderLatexT2(mockHeaderData);

// Generates the LaTeX code for the education section of the resume.
export const generateEducationLatexT2 = (
  educationArray: EducationType,
): string => {
  let latexString = getLatexContentSizedPreambleT2();
  latexString += `\\begin{document}\n`;
  latexString += `\\resumeSubHeadingListStart\n`;

  // Iterate over each education entry and append its LaTeX code
  latexString += generateEducationLatexHelperT2(
    educationArray as EducationType,
  );

  latexString += `\\resumeSubHeadingListEnd\n`;
  latexString += `\\vspace{-\lastskip}\n`;
  latexString += `\\end{document}\n`;

  return latexString;
};

// Helper function to generate LaTeX code for an individual education entry
export const generateEducationLatexHelperT2 = (
  educationObj: EducationType,
): string => {
  let latexString = `\\resumeSubheading\n`;
  latexString += `{${sanitize(educationObj.title)}}\n`; // University Name
  latexString += `{${sanitize(educationObj.location)}}\n`; // Location
  latexString += `{${sanitize(educationObj.subtitle)}}\n`; // Degree and Specialization
  latexString += `{${sanitize(educationObj.year)}}\n`; // Month Year - Month Year

  if (educationObj.bullets.length > 0) {
    latexString += `\\resumeItemListStart\n`;
    educationObj.bullets.forEach((bullet) => {
      latexString += `\\resumeItem{${sanitize(bullet)}}\n`;
    });
    latexString += `\\resumeItemListEnd\n`;
  }

  return latexString;
};

// Define a single education entry for testing
const mockEducationEntry: EducationType = {
  user: "user1",
  itemName: "Education 1",
  title: "University 1",
  location: "Location, State, USA",
  subtitle: "Degree and Specialization",
  year: "Month Year - Month Year",
  bullets: [],
};

// Generate the LaTeX code for the education entry
export const mockEducationEntry2 = generateEducationLatexT2(mockEducationEntry);

/*  ------------------------------------------------- */
/*  -------------------Experience-------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX code for the experience section of the resume. This function creates a LaTeX
 * block that details professional experience, including job titles, company names, dates, and descriptions.
 *
 * @param {ExperienceType} activityObj - An object containing data for the experience section.
 * @returns {string} The generated LaTeX code for the experience section of the resume.
 */
export const generateExperienceLatexT2 = (activityObj: ExperienceType) => {
  let latexString = getLatexContentSizedPreambleT2();
  latexString += `\\begin{document}\n\\resumeSubHeadingListStart`;

  latexString += generateExperienceLatexHelperT2(activityObj as ExperienceType);

  latexString +=
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\n\\end{document}\n";

  return latexString;
};

export const generateExperienceLatexHelperT2 = (
  activityObj: ExperienceType,
) => {
  let latexString = `\n\\resumeSubheading{${sanitize(activityObj.subtitle)}}{}{${sanitize(activityObj.title)},${sanitize(activityObj.location)}}{${sanitize(activityObj.year)}}
      `;

  if (activityObj.bullets.length > 0) {
    latexString += "\\resumeItemListStart\n";
    activityObj.bullets.forEach((bulletPoint) => {
      latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });
    latexString += "\\resumeItemListEnd\n";
  }

  return latexString;
};

const experienceData: ExperienceType = {
  user: "janesmith",
  itemName: "Senior Software Engineer",
  bullets: [
    "Led the development of a large-scale e-commerce platform using microservices architecture",
    "Implemented server-side rendering and client-side hydration for optimal performance",
    "Utilized Docker and Kubernetes for containerization and deployment",
    "Collaborated with product and design teams to deliver high-quality user experiences",
    "Mentored junior developers and conducted code reviews to maintain code quality",
  ],
  title: "DEF Company",
  subtitle: "Senior Software Engineer",
  year: "2020 - Present",
  location: "City, State",
};

export const experMock = generateExperienceLatexT2(experienceData);

/*  ------------------------------------------------- */
/*  -------------------Project-------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX code for the experience section of the resume. This function creates a LaTeX
 * block that details professional experience, including job titles, company names, dates, and descriptions.
 *
 * @param {ExperienceType} activityObj - An object containing data for the experience section.
 * @returns {string} The generated LaTeX code for the experience section of the resume.
 */
export const generateProjectLatexT2 = (activityObj: ProjectsType) => {
  let latexString = getLatexContentSizedPreambleT2();
  latexString += `\\begin{document}\n\\resumeSubHeadingListStart`;

  latexString += generateProjectLatexHelperT2(activityObj as ProjectsType);

  latexString +=
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\n\\end{document}\n";

  return latexString;
};

export const generateProjectLatexHelperT2 = (activityObj: ProjectsType) => {
  let latexString = `\n\\resumeSubheadingTwo{${sanitize(activityObj.title)}}{}{${sanitize(
    activityObj.technologies ?? "",
  )}}{${sanitize(activityObj.year)}}
    `;

  if (activityObj.bullets.length > 0) {
    latexString += "\\resumeItemListStart\n";
    activityObj.bullets.forEach((bulletPoint) => {
      latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });
    latexString += "\\resumeItemListEnd\n";
  }

  return latexString;
};

const projectData: ProjectsType = {
  user: "janesmith",
  itemName: "Senior Software Engineer",
  bullets: [
    "Led the development of a large-scale e-commerce platform using microservices architecture",
    "Implemented server-side rendering and client-side hydration for optimal performance",
    "Utilized Docker and Kubernetes for containerization and deployment",
    "Collaborated with product and design teams to deliver high-quality user experiences",
    "Mentored junior developers and conducted code reviews to maintain code quality",
  ],
  title: "This is myy project ",
  technologies: "React GoodCode Jamal Najib",
  year: "2020 - Present",
};

export const projectDataMock = generateProjectLatexT2(projectData);

/*  ------------------------------------------------- */
/*  -------------------SKILLS==---------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX code for the skills section of the resume. This function creates a concise LaTeX
 * list of skills, typically highlighting technical abilities and other competencies.
 *
 * @param {SkillsType} skillsObj - An object containing data for the skills section.
 * @returns {string} The generated LaTeX code for the skills section of the resume.
 */
export const generateSkillsLatexT2 = (skillsObj: SkillsType): string => {
  let latexString = getLatexContentSizedPreambleT2();
  latexString += "\\begin{document}\n";

  latexString += generateSkillsLatexHelperT2(skillsObj as SkillsType);

  latexString += "\\vspace{-\\lastskip}\n\\end{document}\n";

  return latexString;
};

export const generateSkillsLatexHelperT2 = (skillsObj: SkillsType): string => {
  let latexString = "\n\\begin{itemize}[leftmargin=0in, label={}]\n";
  latexString += "\\small{\\item{";
  latexString += `\\textbf{${sanitize(skillsObj.title)}}{: ${sanitize(
    skillsObj.description,
  )}} \\\\`;

  latexString += "}}\n\\end{itemize}\n";

  return latexString;
};

const skillsData: SkillsType = {
  user: "janesmith",
  itemName: "Technical Skills",
  title: "Programming Languages",
  description: "JavaScript, Python, Java, C++, HTML/CSS",
};

export const skillsMock = generateSkillsLatexT2(skillsData);

/*  ------------------------------------------------- */
/*  -------------------Activity-------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX code for the experience section of the resume. This function creates a LaTeX
 * block that details professional experience, including job titles, company names, dates, and descriptions.
 *
 * @param {ActivitiesType} activityObj - An object containing data for the experience section.
 * @returns {string} The generated LaTeX code for the experience section of the resume.
 */
export const generateActivityLatexT2 = (activityObj: ActivitiesType) => {
  let latexString = getLatexContentSizedPreambleT2();
  latexString += `\\begin{document}\n\\resumeSubHeadingListStart`;

  latexString += generateActivityLatexHelperT2(activityObj as ActivitiesType);

  latexString +=
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\n\\end{document}\n";

  return latexString;
};

export const generateActivityLatexHelperT2 = (activityObj: ActivitiesType) => {
  let latexString = `\n\\resumeSubheading{${sanitize(activityObj.subtitle)}}{}{${sanitize(activityObj.title)},${sanitize(activityObj.location)}}{${sanitize(activityObj.year)}}
    `;

  if (activityObj.bullets.length > 0) {
    latexString += "\\resumeItemListStart\n";
    activityObj.bullets.forEach((bulletPoint) => {
      latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });
    latexString += "\\resumeItemListEnd\n";
  }

  return latexString;
};

const activityObjData: ActivitiesType = {
  user: "janesmith",
  itemName: "Senior Software Engineer",
  bullets: [
    "Led the development of a large-scale e-commerce platform using microservices architecture",
    "Implemented server-side rendering and client-side hydration for optimal performance",
    "Utilized Docker and Kubernetes for containerization and deployment",
    "Collaborated with product and design teams to deliver high-quality user experiences",
    "Mentored junior developers and conducted code reviews to maintain code quality",
  ],
  title: "Activity",
  subtitle: "Senior Software Engineer",
  year: "2020 - Present",
  location: "City, State",
};

export const activityMock = generateActivityLatexT2(activityObjData);

/*  ------------------------------------------------- */
/*  -------------------Header---------------------- */
/*  ------------------------------------------------- */

/**
 * Generates a LaTeX header for a specific section of the resume. This function creates a section
 * heading in the LaTeX document, which is used to introduce the subsequent content block, such as
 * experience, education, or projects.
 *
 * @param {SectionHeadingsType} activityObj - An object containing the title for the section header.
 * @returns {string} The generated LaTeX code for the section header.
 */
export const generateSectionHeadingLatexT2 = (
  activityObj: SectionHeadingsType,
) => {
  let latexString = getLatexContentSizedPreambleT2();
  latexString = latexString.replace(
    "\\usepackage[top=0in, left=1in, right=1in, bottom=1in]{geometry}",
    "\\usepackage[top=.1in, left=1in, right=1in, bottom=1in]{geometry}",
  );
  latexString += `\\begin{document}`;

  latexString += generateSectionHeadingLatexHelperT2(
    activityObj as SectionHeadingsType,
  );

  latexString += "\n \\vspace{-7pt} \\vspace{-\\lastskip}\n\\end{document}\n";

  return latexString;
};

export const generateSectionHeadingLatexHelperT2 = (
  activityObj: SectionHeadingsType,
) => {
  let latexString = `\n\\section{\\color{airforceblue}${sanitize(activityObj.title)}}\n`;
  return latexString;
};

const sectionHeadingData: SectionHeadingsType = {
  user: "janesmith",
  itemName: "Experience",
  title: "Professional Experience",
};

export const sectionHeadingMock =
  generateSectionHeadingLatexT2(sectionHeadingData);

export const generateLatexT2 = (object: BaseItem): string => {
  switch (object.type) {
    case resumeItemTypes.EDUCATION:
      return generateEducationLatexT2(object as EducationType);

    case resumeItemTypes.EXPERIENCE:
      return generateExperienceLatexT2(object as ExperienceType);

    case resumeItemTypes.ACTIVITY:
      return generateActivityLatexT2(object as ActivitiesType);

    case resumeItemTypes.HEADING:
      return generateHeaderLatexT2(object as HeadingsType);

    case resumeItemTypes.PROJECT:
      return generateProjectLatexT2(object as ProjectsType);

    case resumeItemTypes.SECTIONHEADING:
      return generateSectionHeadingLatexT2(object as SectionHeadingsType);

    case resumeItemTypes.SKILL:
      return generateSkillsLatexT2(object as SkillsType);
  }
};

const itemsInSubHeadingList = [
  resumeItemTypes.ACTIVITY,
  resumeItemTypes.EDUCATION,
  resumeItemTypes.EXPERIENCE,
  resumeItemTypes.PROJECT,
];

export const generateFullResumeT2 = (resumeItems: BaseItem[]): string => {
  let latexString = getLatexPreambleT2();
  latexString += "\\begin{document}\n";
  let isInSubHeadingList = false;

  const startList = () => {
    if (!isInSubHeadingList) {
      latexString += `\\resumeSubHeadingListStart\n`;
      isInSubHeadingList = true;
    }
  };

  const endList = (nextItem: BaseItem | undefined) => {
    if (nextItem == null || !itemsInSubHeadingList.includes(nextItem.type)) {
      latexString += `\\resumeSubHeadingListEnd\n`;
      isInSubHeadingList = false;
    }
  };

  for (let i = 0; i < resumeItems.length; ++i) {
    const item = resumeItems[i] as BaseItem;

    switch (item.type) {
      case resumeItemTypes.HEADING:
        latexString += generateHeaderLatexHelperT2(item as HeadingsType);
        break;
      case resumeItemTypes.SECTIONHEADING:
        latexString += `\\section{\\color{airforceblue}${sanitize((item as SectionHeadingsType).title)}}\n`;
        break;
      case resumeItemTypes.EDUCATION:
        startList();
        latexString += generateEducationLatexHelperT2(item as EducationType);
        endList(resumeItems[i + 1]);
        break;
      case resumeItemTypes.EXPERIENCE:
        startList();
        latexString += generateExperienceLatexHelperT2(item as ExperienceType);
        endList(resumeItems[i + 1]);
        break;
      case resumeItemTypes.ACTIVITY:
        startList();
        latexString += generateActivityLatexHelperT2(item as ActivitiesType);
        endList(resumeItems[i + 1]);
        break;
      case resumeItemTypes.PROJECT:
        startList();
        latexString += generateProjectLatexHelperT2(item as ProjectsType);
        endList(resumeItems[i + 1]);
        break;
      case resumeItemTypes.SKILL:
        latexString += generateSkillsLatexHelperT2(item as SkillsType);
        break;
    }
  }

  latexString += "\\end{document}\n";
  return latexString;
};

export const comprehensiveTestResumeItems: BaseItem[] = [
  {
    _id: "JohnDoe",
    user: "johndoe",
    itemName: "John Doe",
    name: "John Doe",
    items: [
      { item: "john.doe@example.com", href: "mailto:john.doe@example.com" },
      { item: "(123) 456-7890", href: "tel:(123) 456-7890" },
      { item: "New York, NY", href: "" },
      {
        item: "linkedin.com/in/johndoe",
        href: "https://www.linkedin.com/in/johndoe",
      },
      { item: "github.com/johndoe", href: "https://github.com/johndoe" },
    ],
    type: resumeItemTypes.HEADING,
  },
  {
    _id: "TechnicalSkills",
    user: "johndoe",
    itemName: "Technical Skills",
    title: "Technical Skills",
    description:
      "Java, Python, JavaScript, React, Node.js, Express, MongoDB, SQL, Git, AWS",
    type: resumeItemTypes.SKILL,
  },
  {
    _id: "Education",
    user: "johndoe",
    itemName: "Education",
    title: "Education",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "BachelorDegree",
    user: "johndoe",
    itemName: "Bachelor of Science in Computer Science",
    bullets: [
      "GPA: 3.8/4.0",
      "Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems",
      "Honors: Magna Cum Laude",
    ],
    title: "University of Example",
    subtitle: "Bachelor of Science in Computer Science",
    location: "City, State",
    year: "2015 - 2019",
    type: resumeItemTypes.EDUCATION,
  },
  {
    _id: "MasterDegree",
    user: "johndoe",
    itemName: "Master of Science in Artificial Intelligence",
    bullets: [
      "GPA: 3.9/4.0",
      'Thesis: "Deep Learning Approaches for Natural Language Processing"',
      "Relevant Coursework: Machine Learning, Neural Networks, Natural Language Processing",
    ],
    title: "University of Example",
    subtitle: "Master of Science in Artificial Intelligence",
    location: "City, State",
    year: "2019 - 2021",
    type: resumeItemTypes.EDUCATION,
  },
  {
    _id: "Experience",
    user: "johndoe",
    itemName: "Experience",
    title: "Experience",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "SoftwareEngineer",
    user: "johndoe",
    itemName: "Software Engineer",
    bullets: [
      "Developed and maintained web applications using React, Node.js, and MongoDB",
      "Implemented RESTful APIs and integrated them with front-end components",
      "Collaborated with product managers and designers to gather requirements and deliver features",
      "Conducted code reviews and mentored junior developers to ensure code quality and best practices",
      "Optimized application performance through effective database indexing and query optimization",
    ],
    title: "ABC Company",
    subtitle: "Software Engineer",
    year: "2019 - Present",
    location: "City, State",
    type: resumeItemTypes.EXPERIENCE,
  },
  {
    _id: "SoftwareDeveloper",
    user: "johndoe",
    itemName: "Software Developer",
    bullets: [
      "Developed and maintained desktop applications using Java and JavaFX",
      "Implemented complex algorithms and data structures to solve business problems",
      "Collaborated with cross-functional teams to gather requirements and deliver solutions",
      "Automated manual processes through scripting and batch processing",
      "Provided technical support and troubleshooting for production issues",
    ],
    title: "XYZ Corporation",
    subtitle: "Software Developer",
    year: "2017 - 2019",
    location: "City, State",
    type: resumeItemTypes.EXPERIENCE,
  },
  {
    _id: "DataScientist",
    user: "johndoe",
    itemName: "Data Scientist Intern",
    bullets: [
      "Conducted data analysis and visualization using Python and libraries such as NumPy, Pandas, and Matplotlib",
      "Developed machine learning models for predictive analytics and customer segmentation",
      "Collaborated with cross-functional teams to derive insights and provide data-driven recommendations",
      "Presented findings and insights to senior management and stakeholders",
    ],
    title: "DEF Company",
    subtitle: "Data Scientist Intern",
    year: "Summer 2018",
    location: "City, State",
    type: resumeItemTypes.EXPERIENCE,
  },
  {
    _id: "Projects",
    user: "johndoe",
    itemName: "Projects",
    title: "Projects",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "ECommerceWebsite",
    user: "johndoe",
    itemName: "E-Commerce Website",
    bullets: [
      "Developed a fully functional e-commerce website using MERN stack (MongoDB, Express, React, Node.js)",
      "Implemented features such as product catalog, shopping cart, user authentication, and payment gateway integration",
      "Utilized Redux for state management and React Router for client-side routing",
      "Deployed the application on AWS using EC2 and S3 services",
    ],
    title: "E-Commerce Website",
    technologies: "MERN stack, Redux, React Router, AWS",
    year: "2020",
    type: resumeItemTypes.PROJECT,
  },
  {
    _id: "WeatherApp",
    user: "johndoe",
    itemName: "Weather App",
    bullets: [
      "Built a weather application using Python and Flask framework",
      "Integrated with OpenWeatherMap API to fetch real-time weather data",
      "Implemented user-friendly interface using HTML, CSS, and JavaScript",
      "Deployed the application on Heroku platform",
    ],
    title: "Weather App",
    technologies: "Python, Flask, OpenWeatherMap API, HTML/CSS/JS, Heroku",
    year: "2018",
    type: resumeItemTypes.PROJECT,
  },
  {
    _id: "TaskManagementSystem",
    user: "johndoe",
    itemName: "Task Management System",
    bullets: [
      "Developed a task management system using Java and Spring Boot framework",
      "Implemented features such as task creation, assignment, tracking, and reporting",
      "Utilized MySQL database for data persistence and JPA for object-relational mapping",
      "Integrated with external services for email notifications and calendar synchronization",
    ],
    title: "Task Management System",
    technologies: "Java, Spring Boot, MySQL, JPA, Email Integration",
    year: "2019",
    type: resumeItemTypes.PROJECT,
  },
  {
    _id: "MachineLearningProject",
    user: "johndoe",
    itemName: "Machine Learning Project",
    bullets: [
      "Developed a machine learning model for image classification using Python and TensorFlow",
      "Preprocessed and augmented dataset using OpenCV and Keras",
      "Trained and evaluated convolutional neural network (CNN) models",
      "Achieved an accuracy of 95% on the test dataset",
    ],
    title: "Image Classification using CNNs",
    technologies: "Python, TensorFlow, OpenCV, Keras",
    year: "2021",
    type: resumeItemTypes.PROJECT,
  },
  {
    _id: "Activities",
    user: "johndoe",
    itemName: "Activities",
    title: "Activities",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "VolunteerWork1",
    user: "johndoe",
    itemName: "Volunteer Work 1",
    bullets: [
      "Participated in community outreach programs and helped organize fundraising events",
      "Mentored underprivileged children and provided guidance on academic and personal development",
    ],
    title: "ABC Non-Profit Organization",
    subtitle: "Volunteer",
    year: "2016 - 2018",
    location: "City, State",
    type: resumeItemTypes.ACTIVITY,
  },
  {
    _id: "VolunteerWork2",
    user: "johndoe",
    itemName: "Volunteer Work 2",
    bullets: [
      "Assisted in organizing and conducting workshops on computer literacy for senior citizens",
      "Provided technical support and troubleshooting assistance to participants",
    ],
    title: "XYZ Community Center",
    subtitle: "Technical Volunteer",
    year: "2019 - Present",
    location: "City, State",
    type: resumeItemTypes.ACTIVITY,
  },
  {
    _id: "Hackathon",
    user: "johndoe",
    itemName: "Hackathon",
    bullets: [
      "Participated in a 24-hour hackathon and developed a web application prototype",
      "Collaborated with a team of developers and designers to ideate and implement the solution",
      "Presented the prototype to judges and won the second prize",
    ],
    title: "DEF Hackathon",
    subtitle: "Participant",
    year: "2020",
    location: "City, State",
    type: resumeItemTypes.ACTIVITY,
  },
  {
    _id: "ConferenceSpeaker",
    user: "johndoe",
    itemName: "Conference Speaker",
    bullets: [
      'Delivered a technical talk on "Trends and Advancements in Machine Learning"',
      "Shared insights and experiences with the audience and participated in Q&A session",
    ],
    title: "GHI Tech Conference",
    subtitle: "Speaker",
    year: "2021",
    location: "City, State",
    type: resumeItemTypes.ACTIVITY,
  },
  // Add more resume items as needed
];

export const comprehensiveTestResumeItems2: BaseItem[] = [
  {
    _id: "JaneSmith",
    user: "janesmith",
    itemName: "Jane Smith",
    name: "Jane Smith",
    items: [
      { item: "jane.smith@example.com", href: "mailto:jane.smith@example.com" },
      { item: "(987) 654-3210", href: "tel:(987) 654-3210" },
      { item: "San Francisco, CA", href: "" },
      {
        item: "linkedin.com/in/janesmith",
        href: "https://www.linkedin.com/in/janesmith",
      },
      { item: "github.com/janesmith", href: "https://github.com/janesmith" },
    ],
    type: resumeItemTypes.HEADING,
  },
  {
    _id: "Summary",
    user: "janesmith",
    itemName: "Summary",
    title: "Summary",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "SummaryDescription",
    user: "janesmith",
    itemName: "Summary Description",
    title: "Summary",
    description:
      "Highly motivated software engineer with expertise in full-stack web development. Experienced in designing and implementing scalable and maintainable software solutions. Strong problem-solving abilities and excellent communication skills.",
    type: resumeItemTypes.SKILL,
  },
  {
    _id: "TechnicalSkills",
    user: "janesmith",
    itemName: "Technical Skills",
    title: "Technical Skills",
    description:
      "JavaScript, TypeScript, React, Angular, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, Git",
    type: resumeItemTypes.SKILL,
  },
  {
    _id: "Education",
    user: "janesmith",
    itemName: "Education",
    title: "Education",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "BachelorDegree",
    user: "janesmith",
    itemName: "Bachelor of Science in Computer Engineering",
    bullets: [
      "GPA: 3.9/4.0",
      "Relevant Coursework: Data Structures and Algorithms, Operating Systems, Computer Networks",
      "Honors: Summa Cum Laude",
    ],
    title: "XYZ University",
    subtitle: "Bachelor of Science in Computer Engineering",
    location: "City, State",
    year: "2012 - 2016",
    type: resumeItemTypes.EDUCATION,
  },
  {
    _id: "MasterDegree",
    user: "janesmith",
    itemName: "Master of Science in Computer Science",
    bullets: [
      "GPA: 4.0/4.0",
      'Thesis: "Efficient Algorithms for Large-Scale Data Processing"',
      "Relevant Coursework: Advanced Database Systems, Distributed Computing, Artificial Intelligence",
    ],
    title: "ABC University",
    subtitle: "Master of Science in Computer Science",
    location: "City, State",
    year: "2016 - 2018",
    type: resumeItemTypes.EDUCATION,
  },
  {
    _id: "Experience",
    user: "janesmith",
    itemName: "Experience",
    title: "Experience",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "SeniorSoftwareEngineer",
    user: "janesmith",
    itemName: "Senior Software Engineer",
    bullets: [
      "Led the development of a large-scale e-commerce platform using microservices architecture",
      "Implemented server-side rendering and client-side hydration for optimal performance",
      "Utilized Docker and Kubernetes for containerization and deployment",
      "Collaborated with product and design teams to deliver high-quality user experiences",
      "Mentored junior developers and conducted code reviews to maintain code quality",
    ],
    title: "DEF Company",
    subtitle: "Senior Software Engineer",
    year: "2020 - Present",
    location: "City, State",
    type: resumeItemTypes.EXPERIENCE,
  },
  {
    _id: "SoftwareEngineer",
    user: "janesmith",
    itemName: "Software Engineer",
    bullets: [
      "Developed and maintained a real-time chat application using WebSocket and Node.js",
      "Implemented a responsive and mobile-friendly user interface using React and Material-UI",
      "Integrated with third-party APIs for user authentication and social media sharing",
      "Optimized database queries and implemented caching mechanisms for improved performance",
      "Participated in agile development processes and collaborated with cross-functional teams",
    ],
    title: "GHI Startup",
    subtitle: "Software Engineer",
    year: "2018 - 2020",
    location: "City, State",
    type: resumeItemTypes.EXPERIENCE,
  },
  {
    _id: "Projects",
    user: "janesmith",
    itemName: "Projects",
    title: "Projects",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "ProjectManagementApp",
    user: "janesmith",
    itemName: "Project Management App",
    bullets: [
      "Developed a project management application using MEAN stack (MongoDB, Express, Angular, Node.js)",
      "Implemented features such as task creation, assignment, status tracking, and team collaboration",
      "Utilized WebSocket for real-time updates and notifications",
      "Integrated with Slack API for seamless team communication",
      "Deployed the application on AWS using EC2 and S3 services",
    ],
    title: "Project Management App",
    technologies: "MEAN stack, WebSocket, Slack API, AWS",
    year: "2019",
    type: resumeItemTypes.PROJECT,
  },
  {
    _id: "RecipeShareringPlatform",
    user: "janesmith",
    itemName: "Recipe Sharing Platform",
    bullets: [
      "Built a recipe sharing platform using Django and PostgreSQL",
      "Implemented user authentication and authorization using JWT tokens",
      "Developed a search functionality with filters and pagination",
      "Utilized Amazon S3 for storing and serving user-uploaded images",
      "Implemented a rating and review system for recipes",
    ],
    title: "Recipe Sharing Platform",
    technologies: "Django, PostgreSQL, JWT, Amazon S3",
    year: "2017",
    type: resumeItemTypes.PROJECT,
  },
  {
    _id: "Activities",
    user: "janesmith",
    itemName: "Activities",
    title: "Activities",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "TechConferenceSpeaker",
    user: "janesmith",
    itemName: "Tech Conference Speaker",
    bullets: [
      'Presented a talk on "Scalable Microservices Architecture" at DEF Tech Conference',
      "Shared insights and best practices for designing and implementing microservices",
      "Engaged with the audience through Q&A session and received positive feedback",
    ],
    title: "DEF Tech Conference",
    subtitle: "Speaker",
    year: "2021",
    location: "City, State",
    type: resumeItemTypes.ACTIVITY,
  },
  {
    _id: "OpenSourceContributor",
    user: "janesmith",
    itemName: "Open Source Contributor",
    bullets: [
      "Actively contributed to various open-source projects on GitHub",
      "Submitted bug fixes, feature enhancements, and documentation improvements",
      "Collaborated with other developers and maintainers to improve project quality",
    ],
    title: "Open Source Projects",
    subtitle: "Contributor",
    year: "2019 - Present",
    location: "Remote",
    type: resumeItemTypes.ACTIVITY,
  },
];

// Generate the full resume LaTeX code
export const FullResumeSample = generateFullResumeT2(
  comprehensiveTestResumeItems2,
);
