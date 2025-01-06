
export const loadCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const canvasData = localStorage.getItem('canvasUrl');
      if (canvasData && ctx) {
        const img = new Image();
        img.src = canvasData;
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
        };
      }
    }
};

export const saveCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL("image/png");
      localStorage.setItem("canvasUrl", dataURL);
    }
};