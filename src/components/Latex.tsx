import React, { useEffect, useState, useRef } from "react";
import { generatePdfBlobSafe } from "@/latexUtils/latexUtils";
import { usePdfRenderer } from "@/latexUtils/pdfUtils";

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


//Displays a canvas of the rendered pdf of some latex code.
//TODO: this will need to take a latexCode prop instead of the hard coded strings it's currently using
export const LatexPdf: React.FC = () => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
	//This custom hook renders a pdf into the provided canvas element using the 
	//  provided blob at the provided width
  usePdfRenderer(blob, canvasRef, 500);

	//Once the component mounts, generate the blob that will be used to render the pdf
  useEffect(() => {
      generatePdfBlobSafe(testLatex2).then((res) => {
        setBlob(res);
      });
  }, []);

  // const objectURL = blob != null ? URL.createObjectURL(blob) : "";

	//TODO: check if it's ok to remove divs wrapping canvas and if so, remove them
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