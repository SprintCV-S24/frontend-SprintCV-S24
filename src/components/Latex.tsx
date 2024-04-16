import React, { useEffect, useState, useRef } from "react";
import { generatePdfBlobSafe } from "@/latexUtils/latexUtils";
import { usePngRenderer } from "@/latexUtils/pdfUtils";
import { useImageCacheStore } from "@/hooks/imageCache";

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
//TODO: figure out why pdf is double rendering (if you switch generatePdfBlobSafe to generatePdfBlob and add a
//  timeout so that the engine has time to initialize, you will see in console that it instantly errors when a render is called.
//  generatePdfBlobSafe masks the problem but you will see the pdf flash when it renders, which I think is because the render method
//  is being called twice)
export const LatexImage: React.FC<{
  latexCode: string | undefined;
  cacheKey: string;
  onRenderStart?: () => void;
  onRenderEnd?: () => void;
}> = ({ latexCode, cacheKey, onRenderStart, onRenderEnd }) => {
  const setItem = useImageCacheStore((state) => state.setItem);
  const getItem = useImageCacheStore((state) => state.getItem);

  //TODO: improve error handling and possibly move it somewhere else
  const [error, setError] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  //This custom hook renders an image using the provided blob
  usePngRenderer(
    blob,
    canvasRef,
    setImageSrc,
    setError,
    onRenderEnd,
    (dataUrl) => setItem(cacheKey, dataUrl),
  );

  //Once the component mounts, generate the blob that will be used to render the pdf
  useEffect(() => {
    const cachedUrl = getItem(cacheKey);
    if (cachedUrl != null) {
      setImageSrc(cachedUrl);
    } else {
      onRenderStart?.(); // Call if callback is provided

      if (latexCode != undefined) {
        const canvas = document.createElement("canvas");
        canvasRef.current = canvas;

        generatePdfBlobSafe(latexCode)
          .then((res) => {
            setBlob(res);
            onRenderEnd?.();
          })
          .catch((err) => {
            setError("Error rendering latex");
            console.log(err);
            onRenderEnd?.();
          });
      }
    }
  }, [latexCode]);

  //TODO: improve loading and error styling
  if (error != null) return <div>{error}</div>;

  //it ends up working better checking imageSrc directly rather than having a dedicated
  //  loading state b/c this way there is no small period where a blank image is displayed
  if (!imageSrc) return <div>Loading...</div>;
  return <img src={imageSrc} alt="Rendered Latex" />;
};
