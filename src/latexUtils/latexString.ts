

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


/**
 * Generates the LaTeX preamble required for the resume document. This function constructs the preamble
 * string, which includes the document class, necessary packages, and custom commands essential for formatting
 * the resume. The preamble is vital for creating a LaTeX document that can be
@returns {string} A string representing the LaTeX preamble for the resume document.
 */
export function getLatexPreamble(): string {
  return `
        \\documentclass[letterpaper,11pt]{article}
        
        \\usepackage{latexsym}
        \\usepackage[empty]{fullpage}
        \\usepackage{titlesec}
        \\usepackage{marvosym}
        \\usepackage[usenames,dvipsnames]{color}
        \\usepackage{verbatim}
        \\usepackage{enumitem}
        \\usepackage[hidelinks]{hyperref}
        \\usepackage{fancyhdr}
        \\usepackage[english]{babel}
        \\usepackage{tabularx}
        \\input{glyphtounicode}
        
        %----------FONT OPTIONS----------
        % sans-serif
        % \\usepackage[sfdefault]{FiraSans}
        % \\usepackage[sfdefault]{roboto}
        % \\usepackage[sfdefault]{noto-sans}
        % \\usepackage[default]{sourcesanspro}
        
        % serif
        % \\usepackage{CormorantGaramond}
        % \\usepackage{charter}
        
        \\pagestyle{fancy}
        \\fancyhf{} % clear all header and footer fields
        \\fancyfoot{}
        \\renewcommand{\\headrulewidth}{0pt}
        \\renewcommand{\\footrulewidth}{0pt}
        
        % Adjust margins
        \\addtolength{\\oddsidemargin}{-0.5in}
        \\addtolength{\\evensidemargin}{-0.5in}
        \\addtolength{\\textwidth}{1in}
        \\addtolength{\\topmargin}{-.5in}
        \\addtolength{\\textheight}{1.0in}
        
        \\urlstyle{same}
        
        \\raggedbottom
        \\raggedright
        \\setlength{\\tabcolsep}{0in}
        
        % Sections formatting
        \\titleformat{\\section}{
            \\vspace{-4pt}\\scshape\\raggedright\\large
        }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
        
        % Ensure that generate pdf is machine readable/ATS parsable
        \\pdfgentounicode=1
        
        %-------------------------
        % Custom commands
        \\newcommand{\\resumeItem}[1]{
            \\item\\small{
            {#1 \\vspace{-2pt}}
            }
        }
        
        \\newcommand{\\resumeSubheading}[4]{
            \\vspace{-2pt}\\item
            \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
                \\textbf{#1} & #2 \\\\
                \\textit{\\small#3} & \\textit{\\small #4} \\\\
            \\end{tabular*}\\vspace{-7pt}
        }
        
        \\newcommand{\\resumeSubSubheading}[2]{
            \\item
            \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
                \\textit{\\small#1} & \\textit{\\small #2} \\\\
            \\end{tabular*}\\vspace{-7pt}
        }
        
        \\newcommand{\\resumeProjectHeading}[2]{
            \\item
            \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
                \\small#1 & #2 \\\\
            \\end{tabular*}\\vspace{-7pt}
        }
        
        \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
        
        \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
        
        \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
        
        \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
        \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
        \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}\n

            `.trim();
}

/**
 * Generates the LaTeX preamble required for the resume document. This function constructs the preamble
 * string, which includes the document class, necessary packages, and custom commands essential for formatting
 * the resume. The preamble is vital for creating a LaTeX document that can be
@returns {string} A string representing the LaTeX preamble for the resume document.
 */
export function getLatexContentSizedPreamble(): string {
  return `
        \\documentclass[letterpaper,11pt]{article}
        
        \\usepackage{latexsym}
        \\usepackage[empty]{fullpage}
        \\usepackage{titlesec}
        \\usepackage{marvosym}
        \\usepackage[usenames,dvipsnames]{color}
        \\usepackage{verbatim}
        \\usepackage{enumitem}
        \\usepackage[hidelinks]{hyperref}
        \\usepackage{fancyhdr}
        \\usepackage{etoolbox}
        \\usepackage[english]{babel}
        \\usepackage{tabularx}
        \\input{glyphtounicode}
        \\usepackage[top=0in, left=1in, right=1in, bottom=1in]{geometry}
        
        %----------FONT OPTIONS----------
        % sans-serif
        % \\usepackage[sfdefault]{FiraSans}
        % \\usepackage[sfdefault]{roboto}
        % \\usepackage[sfdefault]{noto-sans}
        % \\usepackage[default]{sourcesanspro}

        
        % serif
        % \\usepackage{CormorantGaramond}
        % \\usepackage{charter}
        
        \\pagestyle{fancy}
        \\fancyhf{} % clear all header and footer fields
        \\fancyfoot{}
        \\renewcommand{\\headrulewidth}{0pt}
        \\renewcommand{\\footrulewidth}{0pt}
        
        % Adjust margins
        \\addtolength{\\oddsidemargin}{-0.5in}
        \\addtolength{\\evensidemargin}{-0.5in}
        \\addtolength{\\textwidth}{1in}
        \\addtolength{\\textheight}{1.0in}
        
        \\urlstyle{same}
        
        \\raggedbottom
        \\raggedright
        \\setlength{\\tabcolsep}{0in}
        
        % Sections formatting
        \\titleformat{\\section}{
            \\vspace{-4pt}\\scshape\\raggedright\\large
        }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
        
        % Ensure that generate pdf is machine readable/ATS parsable
        \\pdfgentounicode=1
        
        %-------------------------
        % Custom commands
        \\newcommand{\\resumeItem}[1]{
            \\item\\small{
            {#1 \\vspace{-2pt}}
            }
        }
        
        \\newcommand{\\resumeSubheading}[4]{
            \\vspace{-2pt}\\item
            \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
                \\textbf{#1} & #2 \\\\
                \\textit{\\small#3} & \\textit{\\small #4} \\\\
            \\end{tabular*}\\vspace{-7pt}
        }
        
        \\newcommand{\\resumeSubSubheading}[2]{
            \\item
            \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
                \\textit{\\small#1} & \\textit{\\small #2} \\\\
            \\end{tabular*}\\vspace{-7pt}
        }
        
        \\newcommand{\\resumeProjectHeading}[2]{
            \\item
            \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
                \\small#1 & #2 \\\\
            \\end{tabular*}\\vspace{-7pt}
        }
        
        \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
        
        \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
        
        \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
        
        \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
        \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
        \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}\n

        \\AtBeginDocument{
            \\setbox0=\\vbox\\bgroup
            \\preto\\enddocument{\\egroup
                \\dimen0=\\dp0
                \\pdfpageheight=\\dimexpr\\ht0+\\dimen0
                \\unvbox0\\kern-\\dimen0 }
        }

            `.trim();
}

/**
 * Sanitizes a given string to escape LaTeX special characters. This function is essential for ensuring
 * the integrity of the LaTeX code by escaping characters that LaTeX interprets in a specific manner.
 * It prevents compilation errors and ensures that the text is rendered correctly in the final document.
 *
 * @param {string} str - The string to be sanitized for LaTeX.
 * @returns {string} The sanitized string, safe for inclusion in LaTeX code.
 */
export function sanitize(str: string): string {
  const symbolMap: { [key: string]: string } = {
    "'": "\\textquotesingle{}",
    '"': "\\textquotedbl{}",
    "`": "\\textasciigrave{}",
    "^": "\\textasciicircum{}",
    "~": "\\textasciitilde{}",
    "<": "\\textless{}",
    ">": "\\textgreater{}",
    "|": "\\textbar{}",
    "\\": "\\textbackslash{}",
    "{": "\\{",
    "}": "\\}",
    $: "\\$",
    "&": "\\&",
    "#": "\\#",
    _: "\\_",
    "%": "\\%",
    "/": "\\textbackslash{}",
    "[": "\\textlbrack{}",
    "]": "\\textrbrack{}",
  };

  return Array.from(str)
    .map((char) => symbolMap[char] || char)
    .join("");
}

/*  ------------------------------------------------- */
/*  -------------------Heading----------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX header for the resume, including personal details and contact information. This
 * function creates a LaTeX block that represents the header section of the resume, formatted according
 * to the specified LaTeX commands and styles.
 *
 * @param {HeadingsType} activityObj - An object containing the necessary data to populate the header section.
 * @returns {string} The generated LaTeX code for the resume header.
 */
export const generateHeaderLatex = (activityObj: HeadingsType): string => {
  let headerLatex = getLatexContentSizedPreamble();
  headerLatex += `\\begin{document}\n`;

  headerLatex += generateHeaderLatexHelper(activityObj as HeadingsType);

  headerLatex += `\\end{document}`;

  return headerLatex;
};


export const generateHeaderLatexHelper = (activityObj: HeadingsType): string => {

  let headerLatex = `\\begin{center}\n`;
  headerLatex += `\\textbf{\\Huge \\scshape ${sanitize(
    activityObj.name,
  )}} \\\\ \\vspace{1pt}\n`;
  headerLatex += `\\small `;

  // Iterate over each item to append it to the LaTeX string
  activityObj.items.forEach((item, index) => {
    const sanitizedItem = sanitize(item.item);
    if (item.href) {
      headerLatex += `\\href{${item.href}}{\\underline{${sanitizedItem}}}`;
    } else {
      headerLatex += sanitizedItem;
    }

    // Add a separator if it's not the last item
    if (index < activityObj.items.length - 1) {
      headerLatex += ` $|$ `;
    }
  });

  headerLatex += `\\vspace{-\\lastskip}`; // Adjust space before ending the document
  // headerLatex += `\n\\end{center}\n\\vspace{-\\dimexpr\\lastskip-3pt}\\end{document}`;
  headerLatex += `\n\\end{center}\n\\vspace{-\\lastskip}`;

  return headerLatex;
};




/*  ------------------------------------------------- */
/*  -------------------Education--------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX code for the education section of the resume. This function constructs a LaTeX
 * block that lists educational qualifications, including institution names, degrees, and dates.
 *
 * @param {EducationType} educationObj - An object containing data for the education section.
 * @returns {string} The generated LaTeX code for the education section of the resume.
 */
export const generateEducationLatex = (educationObj: EducationType): string => {
  let latexString = getLatexContentSizedPreamble();
  latexString += `\\begin{document}\n`;

  latexString += generateEducationLatexHelper(educationObj as EducationType);

  latexString += `\\end{document}\n`;
  // If there are bullet points under each education entry

  return latexString;
};

export const generateEducationLatexHelper = (educationObj: EducationType): string => {
  let latexString = `\n\\resumeSubHeadingListStart\n`;

  // Assuming educationObj is a single object and not an array here
  latexString += `\\resumeSubheading
      {${sanitize(educationObj.title)}}{${sanitize(educationObj.location)}}
      {${sanitize(educationObj.subtitle)}}{${sanitize(educationObj.year)}}
    `;

  if (educationObj.bullets.length > 0) {
    latexString += `\\resumeItemListStart\n`;
    educationObj.bullets.forEach((bullet) => {
      latexString += `\\resumeItem{${sanitize(bullet)}}\n`;
    });
    latexString += `\\resumeItemListEnd\n`;
  }

  latexString += `\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\n`;
  // If there are bullet points under each education entry

  return latexString;
};


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
export const generateExperienceLatex = (activityObj: ExperienceType) => {
  let latexString = getLatexContentSizedPreamble();
  latexString += `\\begin{document}\n`;

  latexString += generateExperienceLatexHelper(activityObj as ExperienceType);

  latexString += "\\end{document}\n";

  return latexString;
};

export const generateExperienceLatexHelper = (activityObj: ExperienceType) => {
  let latexString = `\n\\resumeSubHeadingListStart\n\\resumeSubheading{${sanitize(
    activityObj.subtitle,
  )}}{${sanitize(activityObj.year)}}{${sanitize(activityObj.title)}}{${sanitize(
    activityObj.location,
  )}}
    `;

  if (activityObj.bullets.length > 0) {
    latexString += `\\resumeItemListStart\n`;
    activityObj.bullets.forEach((bulletPoint) => {
      latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });
    latexString += "\\resumeItemListEnd\n";
  }

  latexString +=
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\n";

  return latexString;
};

/*  ------------------------------------------------- */
/*  -------------------Projects---------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX code for the projects section of the resume. This function constructs a LaTeX
 * block that showcases personal or academic projects, including titles, technologies used, and descriptions.
 *
 * @param {ProjectsType} projectObj - An object containing data for the projects section.
 * @returns {string} The generated LaTeX code for the projects section of the resume.
 */
export const generateProjectLatex = (projectObj: ProjectsType): string => {
  let latexString = getLatexContentSizedPreamble();
  latexString += "\\begin{document}\n\\resumeSubHeadingListStart\n";

  // Check if technologies are provided and append them to the title
  const titleWithTechnologies = projectObj.technologies
    ? `\\textbf{${sanitize(projectObj.title)}} $|$ \\emph{${sanitize(
        projectObj.technologies,
      )}}`
    : `\\textbf{${sanitize(projectObj.title)}}`;

  latexString += `\\resumeProjectHeading\n`;
  latexString += `{${titleWithTechnologies}}{${sanitize(projectObj.year)}}\n`;

  if (projectObj.bullets.length > 0) {
    latexString += `\\resumeItemListStart\n`;
    projectObj.bullets.forEach((bullet) => {
      latexString += `\\resumeItem{${sanitize(bullet)}}\n`;
    });

    latexString += "\\resumeItemListEnd\n";
  }

  latexString +=
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\\end{document}\n";

  return latexString;
};

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
export const generateSkillsLatex = (skillsObj: SkillsType): string => {
  let latexString = getLatexContentSizedPreamble();
  latexString +=
    "\\begin{document}\n\\begin{itemize}[leftmargin=0.15in, label={}]\n";
  latexString += "\\small{\\item{";
  latexString += `\\textbf{${sanitize(skillsObj.title)}}{: ${sanitize(
    skillsObj.description,
  )}} \\\\`;
  latexString += "}}\n\\end{itemize}\n\\vspace{-\\lastskip}\\end{document}\n";

  return latexString;
};

/*  ------------------------------------------------- */
/*  -------------------Activity---------------------- */
/*  ------------------------------------------------- */

/**
 * Generates the LaTeX code for the activities section of the resume. This function constructs a LaTeX
 * block that details extracurricular activities, volunteer work, or other non-professional experiences.
 *
 * @param {ActivitiesType} activityObj - An object containing data for the activities section.
 * @returns {string} The generated LaTeX code for the activities section of the resume.
 */
export const generateActivityLatex = (activityObj: ActivitiesType) => {
  let latexString = getLatexContentSizedPreamble();
  latexString += `\\begin{document}\n\\resumeSubHeadingListStart\n\\resumeSubheading{${sanitize(
    activityObj.title,
  )}}{${sanitize(activityObj.year)}}{${sanitize(
    activityObj.subtitle,
  )}}{${sanitize(activityObj.location)}}`;

  if (activityObj.bullets.length > 0) {
		latexString += `\\resumeItemListStart\n`;
    activityObj.bullets.forEach((bulletPoint) => {
      latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });
		latexString += `\\resumeItemListEnd\n`;
  }

  latexString +=
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\\end{document}\n";

  return latexString;
};

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
export const generateSectionHeadingLatex = (
  activityObj: SectionHeadingsType,
) => {
  let latexString = getLatexContentSizedPreamble();
  latexString += `\\begin{document}\n\\section{${sanitize(
    activityObj.title,
  )}}\n\\vspace{-\\lastskip}\\end{document}`;
  return latexString;
};

export const generateLatex = (object: BaseItem): string => {
  switch (object.type) {
    case resumeItemTypes.EDUCATION:
      return generateEducationLatex(object as EducationType);

    case resumeItemTypes.EXPERIENCE:
      return generateExperienceLatex(object as ExperienceType);

    case resumeItemTypes.ACTIVITY:
      return generateActivityLatex(object as ActivitiesType);

    case resumeItemTypes.HEADING:
      return generateHeaderLatex(object as HeadingsType);

    case resumeItemTypes.PROJECT:
      return generateProjectLatex(object as ProjectsType);

    case resumeItemTypes.SECTIONHEADING:
      return generateSectionHeadingLatex(object as SectionHeadingsType);

    case resumeItemTypes.SKILL:
      return generateSectionHeadingLatex(object as SkillsType);
  }

  return "";
};











export const generateFullResume = (resumeItems: BaseItem[]): string => {
  let latexString = getLatexPreamble();
  latexString += "\\begin{document}\n";

  let currentSection: string | null = null;

  resumeItems.forEach((item, index) => {
    if (item.type === resumeItemTypes.SECTIONHEADING) {
      if (currentSection !== null) {
        latexString += "\\resumeSubHeadingListEnd\n";
      }
      currentSection = item.type.toString();
      latexString += `\\section{${sanitize((item as SectionHeadingsType).title)}}\n`;
    } else {
      if (currentSection === null || (index > 0 && item.type.toString() !== resumeItems[index - 1]?.type.toString())) {
        if (currentSection !== null) {
          latexString += "\\resumeSubHeadingListEnd\n";
        }
        currentSection = item.type.toString();
        latexString += "\\resumeSubHeadingListStart\n";
      }

      switch (item.type) {
        case resumeItemTypes.EDUCATION:
          latexString += generateEducationLatex2(item as EducationType);
          break;
        case resumeItemTypes.EXPERIENCE:
          latexString += generateExperienceLatex2(item as ExperienceType);
          break;
        case resumeItemTypes.ACTIVITY:
          latexString += generateActivityLatex2(item as ActivitiesType);
          break;
        case resumeItemTypes.HEADING:
          latexString += generateHeaderLatex2(item as HeadingsType);
          break;
        case resumeItemTypes.PROJECT:
          latexString += generateProjectLatex2(item as ProjectsType);
          break;
        case resumeItemTypes.SKILL:
          latexString += generateSkillsLatex2(item as SkillsType);
          break;
      }
    }
  });

  if (currentSection !== null) {
    latexString += "\\resumeSubHeadingListEnd\n";
  }

  latexString += "\\end{document}\n";
  return latexString;
};

export const testResumeItems: BaseItem[] = [
  {
    _id: "Jamal",
    user: "johndoe",
    itemName: "John Doe",
    name: "John Doe",
    items: [
      { item: "john.doe@example.com", href: "mailto:john.doe@example.com" },
      { item: "(123) 456-7890", href: "tel:(123) 456-7890" },
    ],
    type: resumeItemTypes.HEADING,
  },
  {
    _id: "Education_1",
    user: "johndoe",
    itemName: "Education",
    title: "Education",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "Bachelor_Degree",
    user: "johndoe",
    itemName: "Bachelor of Science in Computer Science",
    bullets: ["GPA: 3.8/4.0", "Relevant Coursework: Data Structures, Algorithms"],
    title: "University of Example",
    subtitle: "Bachelor of Science in Computer Science",
    location: "City, State",
    year: "2015 - 2019",
    type: resumeItemTypes.EDUCATION,
  },
  {
    _id: "Experience_1",
    user: "johndoe",
    itemName: "Experience",
    title: "Experience",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "Software_Engineer",
    user: "johndoe",
    itemName: "Software Engineer",
    bullets: [
      "Developed and maintained web applications using React and Node.js",
      "Collaborated with cross-functional teams to deliver high-quality software",
    ],
    title: "ABC Company",
    subtitle: "Software Engineer",
    year: "2019 - Present",
    location: "City, State",
    type: resumeItemTypes.EXPERIENCE,
  },
  // Add more test resume items as needed
];
export const generatedLatexCode = generateFullResume(testResumeItems as any);
console.log(generatedLatexCode);


