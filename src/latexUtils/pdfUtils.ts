import React, { useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";

export const pdfInit = () => {
  if (typeof window === "undefined" || !("Worker" in window)) {
    throw new Error("Web Workers not supported in this environment.");
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
};

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
	//TODO: should ref also be in here?
  }, [blob]);
};
