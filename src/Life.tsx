import { Index } from "solid-js";
import { store } from "./state";

import "./Life.css";

const SIZE_THRESHOLD = 15;

function Life() {
  return (
    <div
      class={`life ${store.size < SIZE_THRESHOLD ? "small-size" : ""}`}
      style={{ "--size": `${store.size}px` }}
    >
      <Index each={store.population}>{(row) => <Row row={row()} />}</Index>
    </div>
  );
}

interface RowProps {
  row: Array<boolean>;
}

function Row(props: RowProps) {
  return (
    <div class="row">
      <Index each={props.row}>{(cell) => <Cell alive={cell()} />}</Index>
    </div>
  );
}

interface CellProps {
  alive: boolean;
}

function Cell(props: CellProps) {
  return <span class={`cell ${props.alive ? "cell-alive" : ""}`}></span>;
}

export default Life;
