import { createEffect } from "solid-js";
import { getInitialState } from "./utils";
import { Preset } from "./types";
import { store, setStore, updateNextPopulation } from "./store";
import { DEFAULT_SIZE, LifetimeValues } from "./constants";

function Settings(props: { presets: Preset[]; }) {
  const { presets } = props;

  createEffect(() => {
    const initialPreset = window.localStorage.getItem("presetId") || "";
    if (initialPreset) loadPreset(initialPreset);
  });

  return (
    <div>
      Preset:{" "}
      <select value={store.preset} onChange={(e) => loadPreset(e.target.value)}>
        <option value="">Select a preset</option>
        {presets.map((preset) => (
          <option value={preset.id}>
            {preset.description}
          </option>
        ))}
      </select>
      <select
        value={store.renderer}
        onChange={(e) => setStore({ renderer: e.target.value })}
        style={{ "margin-left": "-1px" }}
      >
        <option value="html">HTML</option>
        <option value="canvas">Canvas</option>
      </select>{" "}
      <br />
      <br />
      Grid:{" "}
      <input
        type="number"
        value={store.width}
        onChange={(e) => setStore({ width: e.target.valueAsNumber })}
        maxlength="3"
        class="input"
      />{" "}
      &times;{" "}
      <input
        type="number"
        value={store.height}
        onChange={(e) => setStore({ height: e.target.valueAsNumber })}
        maxlength="3"
        class="input"
      />{" "}
      Cell:{" "}
      <input
        type="number"
        value={store.size}
        onChange={(e) => setStore({ size: e.target.valueAsNumber })}
        maxlength="3"
        class="input"
      />{" "}
      <br />
      <br />
      <div style={{ display: "flex", "align-items": "center" }}>
        <button onClick={updateNextPopulation}>Next</button>
        &nbsp;
        <button onClick={() => setStore("play", prev => !prev)}>
          {store.play ? "Stop" : "Play"}
        </button>{" "}
        {store.preset && (
          <button onClick={() => loadPreset(store.preset)} style={{ "margin-left": "-1px" }}>
            ↺
          </button>
        )}
        <input
          type="range"
          value={store.lifetime}
          min="1"
          max={Object.keys(LifetimeValues).length}
          onChange={(e) => setStore({ lifetime: e.target.valueAsNumber })}
          list="lifetime-options"
          style={{ margin: "0 1em" }}
        />
        <datalist id="lifetime-options">
          {Object.entries(LifetimeValues).map(([k, v]) => (
            <option value={k} label={v.label} />
          ))}
        </datalist>{" "}
        <div>{LifetimeValues[store.lifetime].label}</div>
      </div>
    </div>
  );

  function loadPreset(id: string) {
    const newPreset = presets.find((p) => p.id === id);
    const newWidth = newPreset?.width || store.width;
    const newHeight = newPreset?.height || store.height;
    const newSize = newPreset?.size || DEFAULT_SIZE;

    setStore({
      width: newWidth,
      height: newHeight,
      size: newSize,
      preset: id,
      population: getInitialState(newPreset?.grid || store.population, newWidth, newHeight),
    });

    window.localStorage.setItem("presetId", id);
  }
}

export default Settings;
