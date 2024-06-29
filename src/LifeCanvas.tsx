import { createEffect, onMount } from "solid-js";
import { store } from "./state";

import "./LifeCanvas.css";

function LifeCanvas() {
  let canvasRef: HTMLCanvasElement;

  onMount(() => {
    drawCanvas();
  });

  createEffect(() => {
    drawCanvas();
  });

  const drawCanvas = () => {
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, store.width * store.size, store.height * store.size);

    ctx.fillStyle = "black";
    for (let row = 0; row < store.height; row++) {
      for (let col = 0; col < store.width; col++) {
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
