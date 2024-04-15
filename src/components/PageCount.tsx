import { useState, useEffect, useRef } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { BaseItem } from "@/api/models/interfaces";
import { generatePdfBlobSafe } from "@/latexUtils/latexUtils";
import { use2ndPageRenderer } from "@/latexUtils/pdfUtils";
import { generateFullResume } from "@/latexUtils/latexString";

export const PageCount: React.FC<{ items: BaseItem[] | undefined }> = ({
  items,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blob, setBlob] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState("");

  //This custom hook renders an image using the provided blob
  use2ndPageRenderer(blob, canvasRef, setNumPages, setImageSrc, setError, () =>
    setIsLoading(false),
  );

  //Once the component mounts, generate the blob that will be used to render the pdf
  useEffect(() => {
    if (items != null && items.length > 0) {
      setIsLoading(true); // Call if callback is provided

      const canvas = document.createElement("canvas");
      canvasRef.current = canvas;

      const latexCode = generateFullResume(items || []);

      generatePdfBlobSafe(latexCode)
        .then((res) => {
          console.log("blob generated");
          setBlob(res);
        })
        .catch((err) => {
          setError("Error rendering latex");
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setNumPages(1);
    }
  }, [items]);

  //TODO: improve loading and error styling
  if (error != null) return <div>{error}</div>;

  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button className="h-full" variant="ghost">Pages: {numPages}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="grid gap-2">
          {imageSrc ? (
            <>
              <span className="text-sm">Page 2 Preview:</span>
              <img src={imageSrc} alt="Rendered Latex" className="border border-gray" />
            </>
          ) : (isLoading) ? (
            <div>Loading...</div>
          ) : <span className="text-sm">No second page</span>}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
