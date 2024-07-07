import { createStore } from "solid-js/store";
import { LifetimeValues } from "./constants";
import { getInitialState, getNextPopulation } from "./utils";

export const [store, setStore] = createStore({
  play: false,
  renderer: "html",
  lifetime: +Object.keys(LifetimeValues).reverse()[0],
  width: 1,
  height: 1,
  size: 30,
  preset: "",
  population: getInitialState([], 1, 1),
});

export function updateNextPopulation() {
    setStore("population", (prev) => getNextPopulation(prev))
}
