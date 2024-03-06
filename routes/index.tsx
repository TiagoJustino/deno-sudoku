import { SudokuGrid } from '../utils/sudoku/generator.ts'

export default function Home() {
  const sg = new SudokuGrid();
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center border-y-1 border-x-0 border-solid border-black p-0">
        {
          sg.grid.map((row, rowIdx) => (
            <div class={`max-w-screen-md flex flex-row items-center justify-center m-0 border-t-0 border-x-1 border-b-${[2, 5].includes(rowIdx) ? '8' : '0'} border-solid border-black`}>{ row.map((cell, cellIdx) => (
              <div class={`text-center align-middle border-y-1 border-l-${[3, 6].includes(cellIdx) ? '2' : '1'} border-r-${[2, 5].includes(cellIdx) ? '8' : '1'} border-solid border-black w-24 h-24 text-5xl`}>
                <span class="inline-block align-middle pt-5">
                  {cell}
                </span>
              </div>
            ) ) }</div>
          ))
        }
      </div>
    </div>
  );
}
