import { PdfTeXEngine } from "@/latex-utils/PdfTeXEngine";

const engine = new PdfTeXEngine();

export const initializeLatexEngines = async () => {
    //* Wrapped in try ... catch to ignore multiple engine error message
    try {
      // Initialize the PDF engine
      await engine.loadEngine();
    } catch (e) {}
}


export const compileLatex = async (latexCode) => {
    // Make sure both engines are ready for compilation
    if (!engine.isReady()) {
      console.log('Engine not ready yet!');
      return;
    }

  
    // Create a temporary main.tex file
    engine.writeMemFSFile("main.tex", latexCode);
    // Associate the XeTeX engine with this main.tex file
    engine.setEngineMainFile("main.tex");
    // Compile the main.tex file
    let compilation = await engine.compileLaTeX();

    if (compilation.status === 0){
        console.log(compilation.log);
        return compilation.pdf;
    }else{
        console.log("ERORRRRRRRR");
        console.log(compilation.log);
        return 0;
    }
    // Print the compilation log
}

  
export const revokeCompiledPdfUrl = (pdfUrl) => {
    // Revoke the temporary URL to the PDF blob created in `compileLatex()`
    URL.revokeObjectURL(pdfUrl);
    console.log('Revoked URL');
}