import { For } from "solid-js";
import { store } from "./state";

import "./Life.css";

const SIZE_THRESHOLD = 15;

function Life() {
  return (
    <div
      class={`life ${store.size < SIZE_THRESHOLD ? "small-size" : ""}`}
      style={{ "--size": `${store.size}px` }}
    >
      <For each={store.population}>{(row) => <Row row={row} />}</For>
    </div>
  );
}

interface RowProps {
  row: Array<boolean>;
}

function Row(props: RowProps) {
  const { row } = props;
  return (
    <div class="row">
      <For each={row}>{(cell) => <Cell alive={cell} />}</For>
    </div>
  );
}

interface CellProps {
  alive: boolean;
}

function Cell(props: CellProps) {
  const { alive } = props;
  return <span class={`cell ${alive ? "cell-alive" : ""}`}></span>;
}

export default Life;
