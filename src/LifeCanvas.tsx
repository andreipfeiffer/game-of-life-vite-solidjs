import { createEffect, onMount } from "solid-js";
import { store } from "./store";

import "./LifeCanvas.css";

function LifeCanvas() {
  let canvasRef: HTMLCanvasElement;

  onMount(() => {
    drawCanvas(store.width, store.height);
  });

  createEffect(() => {
    drawCanvas(store.width, store.height);
  });

  const drawCanvas = (w: number, h: number) => {
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w * store.size, h * store.size);

    ctx.fillStyle = "black";
    for (let row = 0; row < h; row++) {
      for (let col = 0; col < w; col++) {
        const cell = store.population[row][col];
        if (cell) {
          ctx.fillRect(col * store.size, row * store.size, store.size, store.size);
        }
      }
    }
  };

  return (
    <canvas
      ref={(el) => (canvasRef = el)}
      class="canvas"
      width={store.width * store.size}
      height={store.height * store.size}
    ></canvas>
  );
}

export default LifeCanvas;
