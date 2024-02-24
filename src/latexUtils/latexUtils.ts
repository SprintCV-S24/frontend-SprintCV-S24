import { PdfTeXEngine } from "@/latexUtils/PdfTeXEngine";

const engine = new PdfTeXEngine();

export const initializeLatexEngines = async () => {
  //* Wrapped in try ... catch to ignore multiple engine error message
  try {
    // Initialize the PDF engine
    await engine.loadEngine();
  } catch (e) {}
};

const compileLatex = async (latexCode: string) => {
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

export const generatePdfBlob = async (latexCode: string) => {
  const pdfBinary = await compileLatex(latexCode);
  const pdfBlob = new Blob([pdfBinary], { type: "application/pdf" });
  return pdfBlob;
};