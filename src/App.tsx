import { createEffect, Show } from "solid-js";

import { Preset } from "./types";
import { store, updateNextPopulation } from "./state";
import { LifetimeValues } from "./constants";

import Life from "./Life";
import LifeCanvas from "./LifeCanvas";
import Settings from "./Settings";

import "./App.css";

function App(props: { presets: Preset[]; }) {
  const { presets } = props;

  let timeoutId: number;

  createEffect(() => {
    const msDelay = store.play ? LifetimeValues[store.lifetime].value : 0;

    window.clearTimeout(timeoutId);
    window.cancelAnimationFrame(timeoutId);

    function loop() {
      updateNextPopulation();
      
      if (msDelay > 0) {
        timeoutId =
        msDelay < 16
        ? window.requestAnimationFrame(loop)
        : +window.setTimeout(loop, msDelay);
      }
    }
    
    if (store.play) {
      if (msDelay > 0) {
        loop();
      }
    } else {
      (msDelay < 16) ? window.cancelAnimationFrame(timeoutId) : window.clearTimeout(timeoutId)
    }
  });

  return (
    <div>
      <h1>Game of Life, using Solid.js</h1>
      <Settings presets={presets} />
      <hr />
      <div class={store.play ? "playing" : ""}>

        <Show when={store.renderer === "html"} fallback={<LifeCanvas />}>
          <Life />
        </Show>
      </div>
    </div>
  );
}

export default App;
