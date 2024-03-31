

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
        
        \\usepackage[T1]{fontenc}
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
        
        \\usepackage[T1]{fontenc}
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
  latexString += "\\begin{document}\n";

  latexString += generateProjectLatexHelper(projectObj as ProjectsType);

  latexString += "\\end{document}\n";

  return latexString;
};

export const generateProjectLatexHelper = (projectObj: ProjectsType): string => {
  let latexString = "\n\\resumeSubHeadingListStart\n";

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
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\n";

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
  latexString += "\\begin{document}\n";
 
  latexString +=  generateSkillsLatexHelper(skillsObj as SkillsType);

  latexString += "\\end{document}\n";

  return latexString;
};

export const generateSkillsLatexHelper = (skillsObj: SkillsType): string => {
  let latexString =
    "\n\\begin{itemize}[leftmargin=0.15in, label={}]\n";
  latexString += "\\small{\\item{";
  latexString += `\\textbf{${sanitize(skillsObj.title)}}{: ${sanitize(
    skillsObj.description,
  )}} \\\\`;
  latexString += "}}\n\\end{itemize}\n\\vspace{-\\lastskip}\n";

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
  latexString += `\\begin{document}\n`;

  latexString += generateActivityLatexHelper(activityObj as ActivitiesType);
  
  latexString += "\\end{document}\n";

  return latexString;
};

export const generateActivityLatexHelper = (activityObj: ActivitiesType) => {
  let latexString = `\n\\resumeSubHeadingListStart\n\\resumeSubheading{${sanitize(
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
    "\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\n";

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
  latexString += `\\begin{document}`;

  latexString += generateSectionHeadingLatexHelper(activityObj as SectionHeadingsType);

  return latexString;
};

export const generateSectionHeadingLatexHelper = (
  activityObj: SectionHeadingsType,
) => {
  let latexString = `\n\\section{${sanitize(
    activityObj.title,
  )}}\n\\vspace{-\\lastskip}`;
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

  resumeItems.forEach((item) => {
    switch (item.type) {
      case resumeItemTypes.HEADING:
        latexString += generateHeaderLatexHelper(item as HeadingsType);
        break;
      case resumeItemTypes.SECTIONHEADING:
        latexString += `\\section{${sanitize((item as SectionHeadingsType).title)}}\n`;
        break;
      case resumeItemTypes.EDUCATION:
        latexString += generateEducationLatexHelper(item as EducationType);
        break;
      case resumeItemTypes.EXPERIENCE:
        latexString += generateExperienceLatexHelper(item as ExperienceType);
        break;
      case resumeItemTypes.ACTIVITY:
        latexString += generateActivityLatexHelper(item as ActivitiesType);
        break;
      case resumeItemTypes.PROJECT:
        latexString += generateProjectLatexHelper(item as ProjectsType);
        break;
      case resumeItemTypes.SKILL:
        latexString += generateSkillsLatexHelper(item as SkillsType);
        break;
    }
  });

  latexString += "\\end{document}\n";
  return latexString;
};

const comprehensiveTestResumeItems: BaseItem[] = [
  {
    _id: "JohnDoe",
    user: "johndoe",
    itemName: "John Doe",
    name: "John Doe",
    items: [
      { item: "john.doe@example.com", href: "mailto:john.doe@example.com" },
      { item: "(123) 456-7890", href: "tel:(123) 456-7890" },
      { item: "New York, NY", href: "" },
      { item: "linkedin.com/in/johndoe", href: "https://www.linkedin.com/in/johndoe" },
      { item: "github.com/johndoe", href: "https://github.com/johndoe" },
    ],
    type: resumeItemTypes.HEADING,
  },
  {
    _id: "Summary",
    user: "johndoe",
    itemName: "Summary",
    title: "Summary",
    type: resumeItemTypes.SECTIONHEADING,
  },
  {
    _id: "SummaryDescription",
    user: "johndoe",
    itemName: "Summary Description",
    title: "Summary",
    description: "Experienced software engineer with a passion for developing innovative solutions. Skilled in Java, Python, and web development. Proven track record of delivering high-quality software on time and collaborating effectively with cross-functional teams.",
    type: resumeItemTypes.SKILL,
  },
  {
    _id: "TechnicalSkills",
    user: "johndoe",
    itemName: "Technical Skills",
    title: "Technical Skills",
    description: "Java, Python, JavaScript, React, Node.js, Express, MongoDB, SQL, Git, AWS",
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
      "Thesis: \"Deep Learning Approaches for Natural Language Processing\"",
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
      "Delivered a technical talk on \"Trends and Advancements in Machine Learning\"",
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


const comprehensiveTestResumeItems2: BaseItem[] = [
  {
    _id: "JaneSmith",
    user: "janesmith",
    itemName: "Jane Smith",
    name: "Jane Smith",
    items: [
      { item: "jane.smith@example.com", href: "mailto:jane.smith@example.com" },
      { item: "(987) 654-3210", href: "tel:(987) 654-3210" },
      { item: "San Francisco, CA", href: "" },
      { item: "linkedin.com/in/janesmith", href: "https://www.linkedin.com/in/janesmith" },
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
    description: "Highly motivated software engineer with expertise in full-stack web development. Experienced in designing and implementing scalable and maintainable software solutions. Strong problem-solving abilities and excellent communication skills.",
    type: resumeItemTypes.SKILL,
  },
  {
    _id: "TechnicalSkills",
    user: "janesmith",
    itemName: "Technical Skills",
    title: "Technical Skills",
    description: "JavaScript, TypeScript, React, Angular, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, Git",
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
      "Thesis: \"Efficient Algorithms for Large-Scale Data Processing\"",
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
      "Presented a talk on \"Scalable Microservices Architecture\" at DEF Tech Conference",
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
export const generatedLatexCode = generateFullResume(comprehensiveTestResumeItems2);
console.log(generatedLatexCode);

