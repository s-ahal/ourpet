import React, { useRef, useEffect } from "react";

const PetView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Setting up the canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number = canvas.width;
    let height: number = canvas.height;

    ctx.fillStyle = "#4d4d4d";

    const frames = [drawFrame1, drawFrame2]; // Array of frame functions
    let currentFrameIndex = 0;

    drawFrame(ctx, width, height, currentFrameIndex); //Draw the first frame

    setInterval(() => {
      //Draw the next frame every 500ms
      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
      ctx.clearRect(0, 0, width, height);
      drawFrame(ctx, width, height, currentFrameIndex);
    }, 500);
  }, []);

  // Draw frame 1 square by square
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

  // Draw frame 2 square by square
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

  function drawFrame( //Determine which frame to draw
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
