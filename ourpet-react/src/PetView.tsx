import React, { useRef, useEffect } from "react";

const PetView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;
    if (window.innerWidth >= window.innerHeight) {
      canvas.height = window.innerHeight;
      canvas.width = canvas.height;
      width = canvas.width;
      height = canvas.height;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width;
      width = canvas.width;
      height = canvas.height;
    }

    ctx.fillStyle = "#759e61";

    const frames = [drawFrame1, drawFrame2];
    let currentFrameIndex = 0;

    drawFrame(ctx, width, height, currentFrameIndex);

    setInterval(() => {
      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFrame(ctx, width, height, currentFrameIndex);
    }, 500);
  }, []);

  function drawFrame1(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    //row 1
    drawSquare(ctx, (14 * width) / 30, (10 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (10 * height) / 30, width, height);
    //2
    drawSquare(ctx, (12 * width) / 30, (11 * height) / 30, width, height);
    drawSquare(ctx, (13 * width) / 30, (11 * height) / 30, width, height);
    drawSquare(ctx, (14 * width) / 30, (11 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (11 * height) / 30, width, height);
    drawSquare(ctx, (16 * width) / 30, (11 * height) / 30, width, height);
    drawSquare(ctx, (17 * width) / 30, (11 * height) / 30, width, height);
    //3
    drawSquare(ctx, (11 * width) / 30, (12 * height) / 30, width, height);
    drawSquare(ctx, (18 * width) / 30, (12 * height) / 30, width, height);
    //4
    drawSquare(ctx, (10 * width) / 30, (13 * height) / 30, width, height);
    drawSquare(ctx, (11 * width) / 30, (13 * height) / 30, width, height);
    drawSquare(ctx, (13 * width) / 30, (13 * height) / 30, width, height);
    drawSquare(ctx, (16 * width) / 30, (13 * height) / 30, width, height);
    drawSquare(ctx, (18 * width) / 30, (13 * height) / 30, width, height);
    drawSquare(ctx, (19 * width) / 30, (13 * height) / 30, width, height);
    //5
    drawSquare(ctx, (10 * width) / 30, (14 * height) / 30, width, height);
    drawSquare(ctx, (13 * width) / 30, (14 * height) / 30, width, height);
    drawSquare(ctx, (16 * width) / 30, (14 * height) / 30, width, height);
    drawSquare(ctx, (19 * width) / 30, (14 * height) / 30, width, height);
    //6
    drawSquare(ctx, (10 * width) / 30, (15 * height) / 30, width, height);
    drawSquare(ctx, (19 * width) / 30, (15 * height) / 30, width, height);
    //7
    drawSquare(ctx, (10 * width) / 30, (16 * height) / 30, width, height);
    drawSquare(ctx, (14 * width) / 30, (16 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (16 * height) / 30, width, height);
    drawSquare(ctx, (19 * width) / 30, (16 * height) / 30, width, height);
    //8
    drawSquare(ctx, (11 * width) / 30, (17 * height) / 30, width, height);
    drawSquare(ctx, (18 * width) / 30, (17 * height) / 30, width, height);
    //9
    drawSquare(ctx, (12 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (13 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (14 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (16 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (17 * width) / 30, (18 * height) / 30, width, height);
  }

  function drawFrame2(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    //row 2
    drawSquare(ctx, (14 * width) / 30, (11 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (11 * height) / 30, width, height);
    //3
    drawSquare(ctx, (12 * width) / 30, (12 * height) / 30, width, height);
    drawSquare(ctx, (13 * width) / 30, (12 * height) / 30, width, height);
    drawSquare(ctx, (14 * width) / 30, (12 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (12 * height) / 30, width, height);
    drawSquare(ctx, (16 * width) / 30, (12 * height) / 30, width, height);
    drawSquare(ctx, (17 * width) / 30, (12 * height) / 30, width, height);
    //4
    drawSquare(ctx, (11 * width) / 30, (13 * height) / 30, width, height);
    drawSquare(ctx, (18 * width) / 30, (13 * height) / 30, width, height);
    //5
    drawSquare(ctx, (10 * width) / 30, (14 * height) / 30, width, height);
    drawSquare(ctx, (11 * width) / 30, (14 * height) / 30, width, height);
    drawSquare(ctx, (18 * width) / 30, (14 * height) / 30, width, height);
    drawSquare(ctx, (19 * width) / 30, (14 * height) / 30, width, height);
    //6
    drawSquare(ctx, (10 * width) / 30, (15 * height) / 30, width, height);
    drawSquare(ctx, (13 * width) / 30, (15 * height) / 30, width, height);
    drawSquare(ctx, (16 * width) / 30, (15 * height) / 30, width, height);
    drawSquare(ctx, (19 * width) / 30, (15 * height) / 30, width, height);
    //7
    drawSquare(ctx, (10 * width) / 30, (16 * height) / 30, width, height);
    drawSquare(ctx, (19 * width) / 30, (16 * height) / 30, width, height);
    //8
    drawSquare(ctx, (11 * width) / 30, (17 * height) / 30, width, height);
    drawSquare(ctx, (14 * width) / 30, (17 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (17 * height) / 30, width, height);
    drawSquare(ctx, (18 * width) / 30, (17 * height) / 30, width, height);
    //9
    drawSquare(ctx, (12 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (13 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (14 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (15 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (16 * width) / 30, (18 * height) / 30, width, height);
    drawSquare(ctx, (17 * width) / 30, (18 * height) / 30, width, height);
  }

  function drawSquare(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    ctx.fillRect(x, y, width / 30, height / 30);
  }

  function drawFrame(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    currentFrameIndex: number
  ) {
    const frames = [drawFrame1, drawFrame2];
    frames[currentFrameIndex](ctx, width, height);
  }

  return <canvas ref={canvasRef}></canvas>;
};

export default PetView;
