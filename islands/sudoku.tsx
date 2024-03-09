import { createContext } from "preact";
import Bt from '../islands/bt.tsx'
import Grid from "../islands/grid.tsx";

import { SudokuGrid } from '../utils/sudoku/generator.ts'
import { useEffect, useState } from 'preact/hooks';

export default function Sudoku() {
  const [ctx, setCtx] = useState({sg: null as unknown as SudokuGrid});
  const SgContext = createContext(ctx);

  useEffect(() => {
    setCtx({sg: new SudokuGrid()})
  }, []);

  return (
    <SgContext.Provider value={ctx}>
      <div class="max-w-fit mx-auto">
        <Grid SgContext={SgContext} />
        <Bt ctx={ctx} setCtx={setCtx} />
      </div>
    </SgContext.Provider>
  );
}