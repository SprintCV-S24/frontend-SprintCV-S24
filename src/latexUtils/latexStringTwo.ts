// latexStringTwo.ts

import { BaseItem, 
    EducationType, 
    ExperienceType, 
    HeadingsType, 
    ProjectsType, 
    SkillsType } from "../api/models/interfaces";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";

// Step 1: Set up the basic structure

export function getLatexPreamble(): string {
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
        \\textbf{\\large#1} & \\textbf{\\small #2} \\
        \\textit{\\large#3} & \\textit{\\small #4} \\
        
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
  `;
}

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
  
  export const generateHeaderLatex = (activityObj: HeadingsType): string => {
    let headerLatex = getLatexPreamble();
    headerLatex += `\\begin{document}\n`;
    headerLatex += generateHeaderLatexHelper(activityObj);
    headerLatex += `\\end{document}`;
    return headerLatex;
  };
  
  export const generateHeaderLatexHelper = (activityObj: HeadingsType): string => {
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
  
    headerLatex += `\\vspace{-7pt}\n`;
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
      { item: "linkedin.com/in/johndoe", href: "https://www.linkedin.com/in/johndoe" },
      { item: "github.com/johndoe", href: "https://github.com/johndoe" },
    ],
  };
  
  
  // Generate the LaTeX code for the header using the mock data
  export const headerLatex = generateHeaderLatex(mockHeaderData);
  
  // Print the generated LaTeX code to the console
  console.log(headerLatex);
  