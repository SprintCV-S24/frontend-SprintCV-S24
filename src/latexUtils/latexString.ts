
// This function return the Preamble for each item of the resume. (e.g Experence)
// This is important b.c each document can compile and create a latex pdf. 
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

  // This function is in charge of sanatizing our code due to Latex pickiness 
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
  
//you don't care about user and itemName fields, but all other fields should be in the latex you generate
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

  export const generateHeaderLatex = (activityObj: HeadingType): string => {
    let headerLatex = getLatexPreamble();
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

    headerLatex += `\n\\end{center}\n\\end{document}`;

    return headerLatex;
};

// testing the header

export const fakeHeading: HeadingType = {
    user: "John",
    itemName: "DOE",
    name: "This Is My Name%",
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

// Generating the full LaTeX for the Education Section
export const generateEducationLatex = (educationObj: EducationType): string => {
    let latexString = getLatexPreamble();
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

    latexString += `\\resumeSubHeadingListEnd\n\\end{document}\n`;

    return latexString;
};


//\\section{Education}\n

// Generating the full LaTeX for the Experience Section
export const generateEducationeHeaderLatex = () => {
    let latexString = getLatexPreamble();
    latexString += `\\begin{document}\n\\section{Education}\n\\end{document}`;
    return latexString;
}


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
const generatedEducation = generateEducationLatex(fakeEducation);
console.log(generatedEducation);





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

// Generating the full LaTeX for the Experience Section
export const generateExperienceLatex = (activityObj: ExperienceType) => {
    let latexString = getLatexPreamble();
    latexString += `\\begin{document}\n\\resumeSubheading{${sanitize(activityObj.title)}}{${sanitize(activityObj.subtitle)}}{${sanitize(activityObj.location)}}{${sanitize(activityObj.date)}}
    \\resumeItemListStart
    `;

    activityObj.bullets.forEach(bulletPoint => {
        latexString += `\\resumeItem{${sanitize(bulletPoint)}}`;
    });

    latexString += '\\resumeItemListEnd\n\\end{document}\n';
    
    return latexString;
}



// Generating the full LaTeX for the Experience Section
export const generateExperienceHeaderLatex = () => {
    let latexString = getLatexPreamble();
    latexString += `\\begin{document}\n\\section{Experience}\n\\end{document}`;
    return latexString;
}

// fake object for the purpose of testing 
export const fakeExperience: ExperienceType = {
    user: "Jane Doe", // Irrelevant for our test
    itemName: "Resume Item", // Irrelevant for our test
    bullets: [
        "Developed and implemented efficient algorithms",
        "Collaborated with a cross-functional team",
        "Improved system performance by 20%"
    ],
    title: "Software Engineer",
    subtitle: "Acme Corporation",
    date: "2022 - 2023",
    location: "Los Angeles, CA"
};

const generatedLatex = generateExperienceLatex(fakeExperience);
console.log(generatedLatex);
