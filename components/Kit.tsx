import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaEraser, FaHighlighter, FaPen } from "react-icons/fa";

const Kit = () => {
  const [currentDiv, setCurrentDiv] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext("2d");
      if (context) {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const draw = (e: MouseEvent) => {
          if (!isDrawing) return;

          const { offsetX, offsetY } = e;
          context.beginPath();
          context.moveTo(lastX, lastY);
          context.lineTo(offsetX, offsetY);
          context.stroke();
          [lastX, lastY] = [offsetX, offsetY];
        };

        canvas.addEventListener("mousedown", (e) => {
          isDrawing = true;
          [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", () => (isDrawing = false));
        canvas.addEventListener("mouseout", () => (isDrawing = false));
      }
    }
  }, [canvasRef]);

  const handleDivChange = useCallback((div: string) => {
    setCurrentDiv(div);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="w-[100%] h-[100vh]" />
      <div className="absolute md:bottom-10  bottom-0 flex justify-center left-0 right-0 mr-auto ml-auto">
        <div className="text-center flex justify-center items-center gap-5 bg-slate-200 md:rounded-md rounded-t-[10px] pl-4 pr-4  py-2">
          <FaPen
            size={40}
            onClick={() => handleDivChange("marker")}
            className="cursor-pointer"
          />
          <FaHighlighter
            size={40}
            onClick={() => handleDivChange("highlighter")}
            className="cursor-pointer"
          />
          <FaEraser
            size={40}
            onClick={() => handleDivChange("eraser")}
            className="cursor-pointer"
          />
          <div>
            {currentDiv === "marker" && <div>Marker</div>}
            {currentDiv === "highlighter" && <div>Highlighter</div>}
            {currentDiv === "eraser" && <div>Eraser</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kit;
