import { SudokuGrid } from "../utils/sudoku/generator.ts";
import { useContext } from "preact/hooks";
import { Context } from "preact";

interface BtProps {
  SgContext: Context<{sg: SudokuGrid}>;
}

const nullGrid = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
];

export default function Grid({SgContext}: BtProps) {
  const ctx: {sg: SudokuGrid} = useContext(SgContext);
  return (
      <div class="max-w-max mx-auto flex flex-col items-center border-y-1 border-x-0 border-solid border-black p-0">
        {
          (ctx.sg?.grid ?? nullGrid).map((row, rowIdx) => (
            <div class={`max-w-fit flex flex-row items-center justify-center m-0 border-t-0 border-x-1 border-b-${[2, 5].includes(rowIdx) ? '8' : '0'} border-solid border-black`}>{ row.map((cell, cellIdx) => (
              <div class={`text-center align-middle border-y-1 border-l-${[3, 6].includes(cellIdx) ? '2' : '1'} border-r-${[2, 5].includes(cellIdx) ? '8' : '1'} border-solid border-black w-8 h-8 text-xl md:w-24 md:h-24 md:text-5xl`}>
                <span class="inline-block align-middle md:pt-5">
                  {cell}
                </span>
              </div>
            ) ) }</div>
          ))
        }
      </div>
  );
}