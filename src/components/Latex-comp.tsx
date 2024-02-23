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

export const LatexPdf: React.FC = () => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
	usePdfRenderer(blob, canvasRef);

  useEffect(() => {
    setTimeout(() => {
      generatePdfBlob(testLatex).then((res) => {
        setBlob(res);
      });
    }, 2000);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
