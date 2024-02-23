import { PdfTeXEngine } from "@/latex-utils/PdfTeXEngine";
import React, { useEffect, useState, useRef } from "react";
import { usePdfRenderer } from "@/latex-utils/pdfUtils";

const engine = new PdfTeXEngine();

export const initializeLatexEngines = async () => {
  //* Wrapped in try ... catch to ignore multiple engine error message
  try {
    // Initialize the PDF engine
    await engine.loadEngine();
  } catch (e) {}
};

export const compileLatex = async (latexCode: string) => {
  // Make sure both engines are ready for compilation
  if (!engine.isReady()) {
    throw new Error("Engine not ready yet!");
  }

  //NOTE: all of these engine methods can throw so we need error handling
  // Create a temporary main.tex file
  engine.writeMemFSFile("main.tex", latexCode);
  // Associate the XeTeX engine with this main.tex file
  engine.setEngineMainFile("main.tex");
  // Compile the main.tex file
  let compilation = await engine.compileLaTeX();

  if (compilation.status === 0) {
    console.log(compilation.log);
    return compilation.pdf as Uint8Array;
  } else {
    console.log(compilation.log);
    throw new Error("Error compiling: " + compilation.log);
  }
  // Print the compilation log
};

export const revokeCompiledPdfUrl = (pdfUrl: string) => {
  // Revoke the temporary URL to the PDF blob created in `compileLatex()`
  URL.revokeObjectURL(pdfUrl);
  console.log("Revoked URL");
};

const generatePdfBlob = async (latexCode: string) => {
  const pdfBinary = await compileLatex(latexCode);
  const pdfBlob = new Blob([pdfBinary], { type: "application/pdf" });
  return pdfBlob;
};

const testLatex = `\\documentclass[12pt]{article}
\\usepackage{lingmacros}
\\usepackage{tree-dvips}
\\begin{document}

\\section*{Notes for My Paper}

Don't forget to include examples of topicalization.
They look like this:

{\\small
\\enumsentence{Topicalization from sentential subject:\\\\ 
\\shortex{7}{a John$_i$ [a & kltukl & [el & 
	{\\bf l-}oltoir & er & ngii$_i$ & a Mary]]}
{ & {\\bf R-}clear & {\\sc comp} & 
	{\\bf IR}.{\\sc 3s}-love   & P & him & }
{John, (it's) clear that Mary loves (him).}}
}

\\subsection*{How to handle topicalization}

I'll just assume a tree structure like (\\ex{1}).

{\\small
\\enumsentence{Structure of A$'$ Projections:\\\\ [2ex]
\\begin{tabular}[t]{cccc}
		& \\node{i}{CP}\\\\ [2ex]
		\\node{ii}{Spec} &   &\\node{iii}{C$'$}\\\\ [2ex]
				&\\node{iv}{C} & & \\node{v}{SAgrP}
\\end{tabular}
\\nodeconnect{i}{ii}
\\nodeconnect{i}{iii}
\\nodeconnect{iii}{iv}
\\nodeconnect{iii}{v}
}
}

\\subsection*{Mood}

Mood changes when there is a topic, as well as when
there is WH-movement.  \\emph{Irrealis} is the mood when
there is a non-subject topic or WH-phrase in Comp.
\\emph{Realis} is the mood when there is a subject topic
or WH-phrase.

\\end{document}`;

const testLatex2 = `
%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

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

% \\newcommand{\\resumeSubheading}[4]{
%   \\vspace{-2pt}\\item
%     \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
%       \\textbf{#1} & #2 \\\\
%       \\textit{\\small#3} & \\textit{\\small #4} \\\\
%     \\end{tabular*}\\vspace{-7pt}
% }

\\newcommand{\\resumeSubheading}[5]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} \\small\\emph{#2} & #3 \\\\
      \\textit{\\small#4} & \\textit{\\small #5} \\\\
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

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
% \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
%   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
%   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
% \\end{tabular*}

\\begin{center}
  \\textbf{\\Huge \\scshape Jack Garritano} \\\\ \\vspace{1pt}
  \\small 314-873-8730 $|$ \\href{jack.k.garritano@vanderbilt.edu}{\\underline{jack.k.garritano@vanderbilt.edu}} $|$
  \\href{https://linkedin.com/in/jackgarritano}{\\underline{linkedin.com/in/jackgarritano}} $|$
  \\href{https://github.com/jackgarritano}{\\underline{github.com/jackgarritano}}
\\end{center}




%-------------------------------------------
\\end{document}
`;

export const LatexPdf: React.FC = () => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  usePdfRenderer(blob, canvasRef, 500);

  useEffect(() => {
    setTimeout(() => {
      generatePdfBlob(testLatex2).then((res) => {
        setBlob(res);
      });
    }, 2000);
  }, []);

  // const objectURL = blob != null ? URL.createObjectURL(blob) : "";

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>

    // objectURL == "" ? (
    //   <div></div>
    // ) : (
    //   <embed
    //     src={objectURL}
    //     width="100%"
    //     height="400px"
    //     type="application/pdf"
    //   ></embed>
    // )
  );
};
