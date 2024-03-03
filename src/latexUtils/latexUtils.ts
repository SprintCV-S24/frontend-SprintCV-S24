import { PdfTeXEngine } from "@/latexUtils/PdfTeXEngine";
import { initializationPromise, renderQueueManager } from "./renderQueue";

const engine = new PdfTeXEngine();

export const initializeLatexEngines = async () => {
  try {
    // Initialize the PDF engine
    await engine.loadEngine();
  } catch (e) {}
};

//Compiles a latex string into a byte array
const compileLatex = async (latexCode: string) => {
  // Make sure both engines are ready for compilation
  if (!engine.isReady()) {
    throw new Error("Engine not ready yet!");
  }

  //NOTE: all of these engine methods can throw so we need error handling
  // Create a temporary main.tex file
  engine.writeMemFSFile("main.tex", latexCode);
  // Associate the pdftex engine with this main.tex file
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
};

//don't think this is needed
export const revokeCompiledPdfUrl = (pdfUrl: string) => {
  // Revoke the temporary URL to the PDF blob created in `compileLatex()`
  URL.revokeObjectURL(pdfUrl);
  console.log("Revoked URL");
};

//DON'T CALL THIS, call generatePdfBlobSafe instead. This generates the blob object for one pdf, but it
//  has no protections in terms of concurrency. It relies on the protections provided by generatePdfBlobSafe
//  to avoid trying to render when the engine is not yet initialized or already rendering something else
const generatePdfBlob = async (latexCode: string) => {
  const pdfBinary = await compileLatex(latexCode);
  const pdfBlob = new Blob([pdfBinary], { type: "application/pdf" });
  return pdfBlob;
};

//Wraps generatePdfBlob, providing protections against illegal calls to the engine that will cause errors
export const generatePdfBlobSafe = async (latexCode: string) => {
	//This promise doesn't get resolved until the engine has been initialized
	await initializationPromise;

	//This pushes the call to generatePdfBlob into a queue so that it waits its turn since the engine
	//  can only render 1 thing at a time
	const blob = await renderQueueManager.enqueue<Blob>(async () => await generatePdfBlob(latexCode));
	return blob;
};