import { IS_BROWSER } from "$fresh/runtime.ts";
import { SudokuGrid } from "../utils/sudoku/generator.ts";

interface BtProps {
  ctx: {sg: SudokuGrid};
  setCtx: Function;
}

let sleepSetTimeout_ctrl: number;
const sleepVal = 50;

function sleep(ms: number) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

export default function Bt({ctx, setCtx}: BtProps) {
  const solve = async () => {
    const sleep1 = Math.floor(sleepVal || 1);
    const sleep2 = Math.floor((sleep1 / 3) * 2) || 1;
    ctx.sg.finished = false;
    ctx.sg.solveSudoku(sleep1);
    while(!ctx.sg.finished) {
      setCtx({sg: ctx.sg});
      await sleep(sleep2);
    }
    setCtx({sg: ctx.sg});
  };

  const refresh = () => {
    setCtx({sg: new SudokuGrid()});
  };

  return (
    <div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto flex my-5" onClick={ () => solve() } disabled={!IS_BROWSER}>Solve</button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto flex my-5" onClick={ () => refresh() } disabled={!IS_BROWSER}>Refresh</button>
    </div>
  );
}