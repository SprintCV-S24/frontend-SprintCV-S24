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
    '\'': '\\textquotesingle{}',
    '"': '\\textquotedbl{}',
    '`': '\\textasciigrave{}',
    '^': '\\textasciicircum{}',
    '~': '\\textasciitilde{}',
    '<': '\\textless{}',
    '>': '\\textgreater{}',
    '|': '\\textbar{}',
    '\\': '\\textbackslash{}',
    '{': '\\{',
    '}': '\\}',
    '$': '\\$',
    '&': '\\&',
    '#': '\\#',
    '_': '\\_',
    '%': '\\%',
    '/': '\\textslash{}',
    '[': '\\textlbrack{}',
    ']': '\\textrbrack{}',
};

return Array.from(str)
    .map(char => symbolMap[char] || char)
    .join('');
  }
  
/*  ------------------------------------------------- */
/*  -------------------Heading----------------------- */
/*  ------------------------------------------------- */
interface HeadingItem {
    item: string;
    href: string | null;
  }
  
  // Interface for Contact details document
  export interface HeadingType {
      user: string;
      itemName: string;
      name: string;
      items: HeadingItem[];
  }

  /**
 * Generates the LaTeX header for the resume, including personal details and contact information. This
 * function creates a LaTeX block that represents the header section of the resume, formatted according
 * to the specified LaTeX commands and styles.
 *
 * @param {HeadingType} activityObj - An object containing the necessary data to populate the header section.
 * @returns {string} The generated LaTeX code for the resume header.
 */
  export const generateHeaderLatex = (activityObj: HeadingType): string => {
    let headerLatex = getLatexContentSizedPreamble();
    headerLatex += `\\begin{document}\n\\begin{center}\n`;
    headerLatex += `\\textbf{\\Huge \\scshape ${sanitize(activityObj.name)}} \\\\ \\vspace{1pt}\n`;
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
    headerLatex += `\n\\end{center}\n\\vspace{-\\lastskip}\\end{document}`;


    return headerLatex;
};

// testing the header

export const fakeHeading: HeadingType = {
    user: "John",
    itemName: "DOE",
    name: "Some Student",
    items: [
        { item: "Hello", href: null }, 
        { item: "meow", href: null }, 
        { item: "dog.com", href: "http://dog.com" }
    ]
};

/*  ------------------------------------------------- */
/*  -------------------Education--------------------- */
/*  ------------------------------------------------- */
// Interface for Education document
export interface EducationType {
	user: string;
	itemName: string;
    bullets: string[];
    title: string;
    subtitle: string;
    location: string;
    year: string;
}

/**
 * Generates the LaTeX code for the education section of the resume. This function constructs a LaTeX
 * block that lists educational qualifications, including institution names, degrees, and dates.
 *
 * @param {EducationType} educationObj - An object containing data for the education section.
 * @returns {string} The generated LaTeX code for the education section of the resume.
 */
export const generateEducationLatex = (educationObj: EducationType): string => {
    let latexString = getLatexContentSizedPreamble();
    latexString += `\\begin{document}\n\\resumeSubHeadingListStart\n`;

    // Assuming educationObj is a single object and not an array here
    latexString += `\\resumeSubheading
      {${sanitize(educationObj.title)}}{${sanitize(educationObj.location)}}
      {${sanitize(educationObj.subtitle)}}{${sanitize(educationObj.year)}}
    `;

    // If there are bullet points under each education entry
    latexString += `\\resumeItemListStart\n`;
    educationObj.bullets.forEach(bullet => {
        latexString += `\\resumeItem{${sanitize(bullet)}}\n`;
    });
    latexString += `\\resumeItemListEnd\n`;
    latexString += `\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\\end{document}\n`;
    return latexString;
};


// fake object for the purpose of testing 
export const fakeEducation: EducationType = {
    user: "", // Irrelevant for our test
    itemName: "Resume Item", // Irrelevant for our test
    bullets: [],
    title: "Some High school",
    subtitle: "BS CS",
    year: "Exp 2023",
    location: "Los Angeles, CA"
};

/*  ------------------------------------------------- */
/*  -------------------Experience-------------------- */
/*  ------------------------------------------------- */
export interface ExperienceType {
	user: string;
	itemName: string;
    bullets: string[];
    title: string;
    subtitle: string;
    date: string;
    location: string;
}

/**
 * Generates the LaTeX code for the experience section of the resume. This function creates a LaTeX
 * block that details professional experience, including job titles, company names, dates, and descriptions.
 *
 * @param {ExperienceType} activityObj - An object containing data for the experience section.
 * @returns {string} The generated LaTeX code for the experience section of the resume.
 */
export const generateExperienceLatex = (activityObj: ExperienceType) => {
    let latexString = getLatexContentSizedPreamble();
    latexString += `\\begin{document}\n\\resumeSubHeadingListStart\n\\resumeSubheading{${sanitize(activityObj.title)}}{${sanitize(activityObj.subtitle)}}{${sanitize(activityObj.location)}}{${sanitize(activityObj.date)}}
    \\resumeItemListStart\n
    `;

    activityObj.bullets.forEach(bulletPoint => {
        latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });

    latexString += '\\resumeItemListEnd\n\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\\end{document}\n';
    
    return latexString;
}

// fake object for the purpose of testing 
export const fakeExperience: ExperienceType = {
    user: "Jane Doe", // Irrelevant for our test
    itemName: "Resume Item", // Irrelevant for our test
    bullets: [
        "Developed and implemented efficient algorithms i am the experience",
        "Collaborated with a cross-functional team",
        "Improved system performance by 20%"
    ],
    title: "Software Engineer",
    subtitle: "Acme Corporation",
    date: "2022 - 2023",
    location: "Los Angeles, CA"
};

/*  ------------------------------------------------- */
/*  -------------------Projects---------------------- */
/*  ------------------------------------------------- */
// Interface for Project document
export interface ProjectType {
	user: string;
	itemName: string;
    bullets: string[];
    title: string;
    technologies?: string;
    year: string;
}

/**
 * Generates the LaTeX code for the projects section of the resume. This function constructs a LaTeX
 * block that showcases personal or academic projects, including titles, technologies used, and descriptions.
 *
 * @param {ProjectType} projectObj - An object containing data for the projects section.
 * @returns {string} The generated LaTeX code for the projects section of the resume.
 */
export const generateProjectLatex = (projectObj: ProjectType): string => {
    let latexString = getLatexContentSizedPreamble();
    latexString += '\\begin{document}\n\\resumeSubHeadingListStart\n';

    // Check if technologies are provided and append them to the title
    const titleWithTechnologies = projectObj.technologies
        ? `\\textbf{${sanitize(projectObj.title)}} $|$ \\emph{${sanitize(projectObj.technologies)}}`
        : `\\textbf{${sanitize(projectObj.title)}}`;

    latexString += `\\resumeProjectHeading\n`;
    latexString += `{${titleWithTechnologies}}{${sanitize(projectObj.year)}}\n`;
    latexString += `\\resumeItemListStart\n`;

    projectObj.bullets.forEach(bullet => {
        latexString += `\\resumeItem{${sanitize(bullet)}}\n`;
    });

    latexString += '\\resumeItemListEnd\n';
    latexString += '\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\\end{document}\n';

    return latexString;
};

// fake object for the purpose of testing 
export const fakeProject: ProjectType = {
    user: "Jane Doe", // Irrelevant for our test
    itemName: "Resume Item", // Irrelevant for our test
    bullets: [
        "This is the project section part of resume aalkjdf;lksjd;aja;dskja;kdj;falskjdf;laksjdf;lkasjdf",
        "Collaborated with a cross-functional team",
        "Improved system performance by 20%"
    ],
    title: "Resume Builder",
    technologies: "React node express json",
    year: "2023",
};

/*  ------------------------------------------------- */
/*  -------------------SKILLS==---------------------- */
/*  ------------------------------------------------- */
// Interface for Project document
export interface SkillsType {
	user: string;
	itemName: string;
    title: string;
    description: string;
}

/**
 * Generates the LaTeX code for the skills section of the resume. This function creates a concise LaTeX
 * list of skills, typically highlighting technical abilities and other competencies.
 *
 * @param {SkillsType} skillsObj - An object containing data for the skills section.
 * @returns {string} The generated LaTeX code for the skills section of the resume.
 */
export const generateSkillsLatex = (skillsObj: SkillsType): string => {
    let latexString = getLatexContentSizedPreamble();
    latexString += '\\begin{document}\n\\begin{itemize}[leftmargin=0.15in, label={}]\n';
    latexString += '\\small{\\item{';
    latexString += `\\textbf{${sanitize(skillsObj.title)}}{: ${sanitize(skillsObj.description)}} \\\\`;
    latexString += '}}\n\\end{itemize}\n\\vspace{-\\lastskip}\\end{document}\n';

    return latexString;
};

export const fakeSkills: SkillsType = {
	user: "string",
	itemName: "string",
    title: "Langauges",
    description: "Arabic, Persian, Kurdish",
}

/*  ------------------------------------------------- */
/*  -------------------Activity---------------------- */
/*  ------------------------------------------------- */
// Interface for Project document
export interface ActivitiesType {
	user: string;
	itemName: string;
    bullets: string[];
    title: string;
    subtitle: string;
    year: string;
    location: string;
}

/**
 * Generates the LaTeX code for the activities section of the resume. This function constructs a LaTeX
 * block that details extracurricular activities, volunteer work, or other non-professional experiences.
 *
 * @param {ActivitiesType} activityObj - An object containing data for the activities section.
 * @returns {string} The generated LaTeX code for the activities section of the resume.
 */
export const generateActivityLatex = (activityObj: ActivitiesType) => {
    let latexString = getLatexContentSizedPreamble();
    latexString += `\\begin{document}\n\\resumeSubHeadingListStart\n\\resumeSubheading{${sanitize(activityObj.title)}}{${sanitize(activityObj.subtitle)}}{${sanitize(activityObj.location)}}{${sanitize(activityObj.year)}}
    \\resumeItemListStart\n
    `;

    activityObj.bullets.forEach(bulletPoint => {
        latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });

    latexString += '\\resumeItemListEnd\n\\resumeSubHeadingListEnd\n\\vspace{-\\lastskip}\\end{document}\n';
    
    return latexString;
}

// fake object for the purpose of testing 
export const fakeActivity: ActivitiesType = {
    user: "Jane Doe", // Irrelevant for our test
    itemName: "Resume Item", // Irrelevant for our test
    bullets: [
        "I amm the activity section i am working correctly",
        "have you live your life ",
        "Or been lived by it"
    ],
    title: "This is the actiity i am tired of fixing this bug ",
    subtitle: "GDP",
    year: "2022",
    location: "Los Angeles, CA"
};

/*  ------------------------------------------------- */
/*  -------------------Header---------------------- */
/*  ------------------------------------------------- */
// Interface for Section Heading document
export interface SectionHeadingType {
	user: string;
	itemName: string;
  	title: string;
}

/**
 * Generates a LaTeX header for a specific section of the resume. This function creates a section
 * heading in the LaTeX document, which is used to introduce the subsequent content block, such as
 * experience, education, or projects.
 *
 * @param {SectionHeadingType} activityObj - An object containing the title for the section header.
 * @returns {string} The generated LaTeX code for the section header.
 */
export const generateAndyHeader = (activityObj: SectionHeadingType) => {
    let latexString = getLatexContentSizedPreamble();
    latexString += `\\begin{document}\n\\section{${sanitize(activityObj.title)}}\n\\vspace{-\\lastskip}\\end{document}`;
    return latexString;
}

// Fake Object for the purpose of testing. 
export const fakeAnyHeadr: SectionHeadingType = {
    user: "Mine",
	itemName: "Yours",
  	title: "KickBoxing",
}