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
              const originalWidth = page.getViewport({ scale: 1 }).width;
              const scaleFactor = width / originalWidth;

              // Use the scale factor to get the viewport
              const viewport = page.getViewport({ scale: scaleFactor });
              const context = canvas.getContext("2d");
              canvas.height = viewport.height;
              canvas.width = viewport.width;
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
  }, [blob]);
};
