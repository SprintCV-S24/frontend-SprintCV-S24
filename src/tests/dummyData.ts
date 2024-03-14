import {
  HeadingsType,
  EducationType,
  ExperienceType,
  ProjectsType,
  SkillsType,
  ActivitiesType,
  SectionHeadingsType,
} from "@/api/models/interfaces";

export const fakeHeading: HeadingsType = {
  user: "John",
  itemName: "DOE",
  name: "Some Student",
  items: [
    { item: "Hello", href: null },
    { item: "meow", href: null },
    { item: "dog.com", href: "http://dog.com" },
  ],
};

export const fakeEducation: EducationType = {
  user: "", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [],
  title: "Some High school",
  subtitle: "BS CS",
  year: "Exp 2023",
  location: "Los Angeles, CA",
};

export const fakeExperience: ExperienceType = {
  user: "Jane Doe", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [
    "Developed and implemented efficient algorithms i am the experience",
    "Collaborated with a cross-functional team",
    "Improved system performance by 20%",
  ],
  title: "Software Engineer",
  subtitle: "Acme Corporation",
  year: "2022 - 2023",
  location: "Los Angeles, CA",
};

export const fakeProject: ProjectsType = {
  user: "Jane Doe", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [
    "This is the project section part of resume aalkjdf;lksjd;aja;dskja;kdj;falskjdf;laksjdf;lkasjdf",
    "Collaborated with a cross-functional team",
    "Improved system performance by 20%",
  ],
  title: "Resume Builder",
  technologies: "React node express json",
  year: "2023",
};

export const fakeSkill: SkillsType = {
  user: "string",
  itemName: "string",
  title: "Langauges",
  description: "Arabic, Persian, Kurdish",
};

export const fakeActivity: ActivitiesType = {
  user: "Jane Doe", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [
    "I amm the activity section i am working correctly",
    "have you live your life ",
    "Or been lived by it",
  ],
  title: "This is the actiity i am tired of fixing this bug ",
  subtitle: "GDP",
  year: "2022",
  location: "Los Angeles, CA",
};

// Fake Object for the purpose of testing.
export const fakeHeadr: SectionHeadingsType = {
  user: "Mine",
  itemName: "Yours",
  title: "KickBoxing",
};

export const testlatex3 = `\\documentclass[letterpaper,11pt]{article}
        
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
\\usepackage{etoolbox}
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
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}


\\AtBeginDocument{
    \\setbox0=\\vbox\\bgroup
    \\preto\\enddocument{\\egroup
        \\dimen0=\\dp0
        \\pdfpageheight=\\dimexpr\\ht0+\\dimen0
        \\unvbox0\\kern-\\dimen0 }
}\\begin{document}
\\resumeSubHeadingListStart
\\resumeSubheading
{Some High school}{Los Angeles, CA}
{BS CS}{Exp 2023}
\\resumeSubHeadingListEnd
\\vspace{-\\lastskip}\\end{document}
`;