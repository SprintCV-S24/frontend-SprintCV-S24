import React, { useEffect, Dispatch, SetStateAction } from "react";
import * as pdfjsLib from "pdfjs-dist";

//Initialization code for pdf.js, called in app.tsx
export const pdfInit = () => {
  if (typeof window === "undefined" || !("Worker" in window)) {
    throw new Error("Web Workers not supported in this environment.");
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
};

//This custom hook renders a pdf into the provided canvas element using the
//  provided blob at the provided width
export const usePdfRenderer = (
  blob: Blob | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  width: number,
) => {
  useEffect(() => {
    if (blob) {
      const fileURL = URL.createObjectURL(blob);
      const loadingTask = pdfjsLib.getDocument(fileURL);

      loadingTask.promise
        .then((pdf) => {
          pdf.getPage(1).then((page) => {
            const canvas = canvasRef.current;
            if (canvas != null) {
              //I'm going to be honest, all of this dimension stuff is chatgpt. It's supposed
              //  to size the canvas to the provided width argument, and there's additional
              //  stuff (such as the scales object and the canvas.style.width and height) which
              //  is to make the pdf less blurry since it was really blurry without it. It checks
              //  the device's pixel density and scales based on that. This might make widths inconsistent
              //  across devices though

              //TODO: go over this code, understand it, and make sure widths are working properly

              // Determine the scale based on device pixel ratio for higher quality
              const scales = { 1: 3.2, 2: 4 } as { [key: number]: number };
              const defaultScale = 3;
              const deviceScale =
                scales[window.devicePixelRatio] || defaultScale;

              // Calculate the scaleFactor for the custom width, adjusted by deviceScale for quality
              const originalWidth = page.getViewport({ scale: 1 }).width;
              const customScaleFactor = (width / originalWidth) * deviceScale;

              // Get the viewport with the combined scale factor
              const viewport = page.getViewport({ scale: customScaleFactor });
              const context = canvas.getContext("2d");

              // Set the actual size of the canvas based on the viewport dimensions
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              // Optionally, adjust the display size of the canvas if needed
              const displayScale = 1.5; // Adjust this value as needed
              canvas.style.width = `${
                (viewport.width * displayScale) / deviceScale
              }px`;
              canvas.style.height = `${
                (viewport.height * displayScale) / deviceScale
              }px`;

              //This is what I had before I refactored it to be less blurry
              //   const originalWidth = page.getViewport({ scale: 1 }).width;
              //   const scaleFactor = width / originalWidth;

              //   // Use the scale factor to get the viewport
              //   const viewport = page.getViewport({ scale: scaleFactor });
              //   const context = canvas.getContext("2d");
              //   canvas.height = viewport.height;
              //   canvas.width = viewport.width;

              //   const viewport = page.getViewport({ scale: 1.5 });
              //   const context = canvas.getContext("2d");
              //   canvas.height = viewport.height;
              //   canvas.width = viewport.width;
              if (context != null) {
                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                page.render(renderContext);
              }
            }
          });
        })
        .catch((err) => {
          console.error("Error during PDF loading or rendering: ", err);
        });

      // Cleanup
      return () => URL.revokeObjectURL(fileURL);
    }
  }, [blob, width]);
};

export const usePngRenderer = (
  blob: Blob | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  setImageSrc: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string | null>>,
  onRenderEnd: (() => void) | undefined,
  setCachedUrl: (dataUrl: string) => void,
) => {
  //I don't think this matters now that we are using images
  const width = 500;
  useEffect(() => {
    if (blob) {
      const fileURL = URL.createObjectURL(blob);
      const loadingTask = pdfjsLib.getDocument(fileURL);

      loadingTask.promise
        .then((pdf) => {
          pdf.getPage(1).then((page) => {
            const canvas = canvasRef.current;
            if (canvas != null) {
              //I'm going to be honest, all of this dimension stuff is chatgpt. It's supposed
              //  to size the canvas to the provided width argument, and there's additional
              //  stuff (such as the scales object and the canvas.style.width and height) which
              //  is to make the pdf less blurry since it was really blurry without it. It checks
              //  the device's pixel density and scales based on that. This might make widths inconsistent
              //  across devices though

              //TODO: go over this code, understand it, and make sure widths are working properly

              // Determine the scale based on device pixel ratio for higher quality
              const scales = { 1: 3.2, 2: 4 } as { [key: number]: number };
              const defaultScale = 3;
              const deviceScale =
                scales[window.devicePixelRatio] || defaultScale;

              // Calculate the scaleFactor for the custom width, adjusted by deviceScale for quality
              const originalWidth = page.getViewport({ scale: 1 }).width;
              const customScaleFactor = (width / originalWidth) * deviceScale;

              // Get the viewport with the combined scale factor
              const viewport = page.getViewport({ scale: customScaleFactor });
              const context = canvas.getContext("2d");

              // Set the actual size of the canvas based on the viewport dimensions
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              // Optionally, adjust the display size of the canvas if needed
              const displayScale = 1.5; // Adjust this value as needed
              canvas.style.width = `${
                (viewport.width * displayScale) / deviceScale
              }px`;
              canvas.style.height = `${
                (viewport.height * displayScale) / deviceScale
              }px`;

              //This is what I had before I refactored it to be less blurry
              //   const originalWidth = page.getViewport({ scale: 1 }).width;
              //   const scaleFactor = width / originalWidth;

              //   // Use the scale factor to get the viewport
              //   const viewport = page.getViewport({ scale: scaleFactor });
              //   const context = canvas.getContext("2d");
              //   canvas.height = viewport.height;
              //   canvas.width = viewport.width;

              //   const viewport = page.getViewport({ scale: 1.5 });
              //   const context = canvas.getContext("2d");
              //   canvas.height = viewport.height;
              //   canvas.width = viewport.width;
              if (context != null) {
                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                page.render(renderContext).promise.then(() => {
                  const dataUrl = canvas.toDataURL("image/png");
                  setImageSrc(dataUrl);
				  setCachedUrl(dataUrl);
                  if (onRenderEnd != null) {
                    onRenderEnd();
                  }
                });
              }
            }
          });
        })
        .catch((err) => {
          setError("Error rendering latex");
          console.error("Error during PDF loading or rendering: ", err);
        });

      // Cleanup
      return () => URL.revokeObjectURL(fileURL);
    }
  }, [blob, width, canvasRef, setCachedUrl]);
};

export const use2ndPageRenderer = (
  blob: Blob | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  setNumPages: Dispatch<SetStateAction<number>>,
  setImageSrc: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string | null>>,
  onRenderEnd: (() => void) | undefined,
) => {
  //I don't think this matters now that we are using images
  const width = 500;
  useEffect(() => {
    if (blob) {
      const fileURL = URL.createObjectURL(blob);
      const loadingTask = pdfjsLib.getDocument(fileURL);

      loadingTask.promise
        .then((pdf) => {
          pdf
            .getPage(2)
            .then((page) => {
              const canvas = canvasRef.current;
              if (canvas != null) {
                //I'm going to be honest, all of this dimension stuff is chatgpt. It's supposed
                //  to size the canvas to the provided width argument, and there's additional
                //  stuff (such as the scales object and the canvas.style.width and height) which
                //  is to make the pdf less blurry since it was really blurry without it. It checks
                //  the device's pixel density and scales based on that. This might make widths inconsistent
                //  across devices though

                //TODO: go over this code, understand it, and make sure widths are working properly

                // Determine the scale based on device pixel ratio for higher quality
                const scales = { 1: 3.2, 2: 4 } as { [key: number]: number };
                const defaultScale = 3;
                const deviceScale =
                  scales[window.devicePixelRatio] || defaultScale;

                // Calculate the scaleFactor for the custom width, adjusted by deviceScale for quality
                const originalWidth = page.getViewport({ scale: 1 }).width;
                const customScaleFactor = (width / originalWidth) * deviceScale;

                // Get the viewport with the combined scale factor
                const viewport = page.getViewport({ scale: customScaleFactor });
                const context = canvas.getContext("2d");

                // Set the actual size of the canvas based on the viewport dimensions
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Optionally, adjust the display size of the canvas if needed
                const displayScale = 1.5; // Adjust this value as needed
                canvas.style.width = `${
                  (viewport.width * displayScale) / deviceScale
                }px`;
                canvas.style.height = `${
                  (viewport.height * displayScale) / deviceScale
                }px`;
                if (context != null) {
                  const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                  };
                  page.render(renderContext).promise.then(() => {
                    const dataUrl = canvas.toDataURL("image/png");
                    setImageSrc(dataUrl);
					setNumPages(pdf.numPages);
                    if (onRenderEnd != null) {
                      onRenderEnd();
                    }
                  });
                }
              }
            })
            //no 2nd page
            .catch(() => {
              canvasRef.current = null;
			  setImageSrc("");
			  setNumPages(1);
              if (onRenderEnd != null) {
                onRenderEnd();
              }
              console.log("no second page");
            });
        })
        .catch((err) => {
          setError("Error rendering latex");
          console.error("Error during PDF loading or rendering: ", err);
        });

      // Cleanup
      return () => URL.revokeObjectURL(fileURL);
    }
  }, [blob, width, canvasRef]);
};
