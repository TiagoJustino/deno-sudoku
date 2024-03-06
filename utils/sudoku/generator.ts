const squareMap = [
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8]
];

function shuffle(array: number[]) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function randint(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Pair = [number, number];
type Grid = Array<Array<number | null>>;

class SudokuGrid {
    grid: Grid = [];
    attempts;
    counter = 1;
    numberList=[1,2,3,4,5,6,7,8,9];

    constructor() {
        for(let i = 0; i < 9; i++) {
            this.grid[i] = [];
            for(let j = 0; j < 9; j++) {
                this.grid[i][j] = null;
            }
        }
        this.fillGrid(this.grid);
        this.attempts = 5;
        while(this.attempts > 0) {
            let row = randint(0,8);
            let col = randint(0,8);
            while (this.grid[row][col] == null) {
                row = randint(0,8)
                col = randint(0,8)
            }
            const backup = this.grid[row][col];
            this.grid[row][col] = null;
            
            const copyGrid: Grid = [];
            for(let r = 0; r < 9; r++) {
            copyGrid[r] = [];
            for(let c = 0; c < 9; c++) {
                copyGrid[r][c] = this.grid[r][c];
            }
            }
            
            this.counter = 0;
            this.solveGrid(copyGrid)   
            if (this.counter != 1) {
                this.grid[row][col] = backup;
                this.attempts -= 1;
            }
        }

        /*
        const ret = this.solveSudoku(this.grid);
        if(ret) {
            console.log("Sudoku Grid Solved");
        } else {
            console.log("Cannot Solve Sudoku Grid");
        }
        */
    }

    solveGrid(grid: Grid) {
        let row, col;
        for(let i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;
            if(grid[row][col] == null) {
                for(let value = 1; value < 10; value++) {
                    if(!this.valueInRow(grid, value, row) && !this.valueInCol(grid, value, col) && !this.valueInSquare(grid, value, row, col)) {
                        grid[row][col] = value;
                        if(this.checkGrid(grid)) {
                            this.counter += 1;
                            break;
                        } else {
                            if(this.solveGrid(grid)) {
                                return true;
                            }
                        } 
                    }
                }
                break;
            }
        }
        if(row && col) {
            grid[row][col] = null;
        }
        return false;
    }

    solveSudoku(grid: Grid) {
        let row, col;
        for(let i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;
            if(grid[row][col] == null) {
                for(let value = 1; value < 10; value++) {
                    if(!this.valueInRow(grid, value, row) && !this.valueInCol(grid, value, col) && !this.valueInSquare(grid, value, row, col)) {
                        grid[row][col] = value;
                        if(this.checkGrid(grid)) {
                            console.log("Grid Complete and Checked");
                            return true;
                        } else {
                            if(this.solveSudoku(grid)) {
                                return true;
                            }
                        } 
                    }
                }
                break;
            }
        }
        console.log("Backtrack");
        if(row && col) {
            grid[row][col] = null;
        }
        return false;
    }

    checkGrid(grid: Grid): boolean {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(grid[i][j] == null) {
                    return false;
                }
            }
        }
        return true;
    }

    fillGrid(grid: Grid): boolean {
        let row, col;
        for(let i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;
            if(grid[row][col] == null) {
                this.numberList = shuffle(this.numberList);
                for(const value of this.numberList) {
                    if(!this.valueInRow(grid, value, row) && !this.valueInCol(grid, value, col) && !this.valueInSquare(grid, value, row, col)) {
                        grid[row][col] = value;
                        if(this.checkGrid(grid)) {
                            return true;
                        }
                        if(this.fillGrid(grid)) {
                            return true;
                        }
                    }
                }
                break;
            }
        }
        if(row && col) {
          grid[row][col] = null;
        }
        return false;
    }

    getSquare(row: number, col: number): number {
        return squareMap[row][col];
    }

    getSquareList(square: number): Array<Pair> {
        const initRow = Math.floor(square/3)*3;
        const initCol = Math.floor(square%3)*3;
        const arr: Array<Pair> = [];
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                arr.push([initRow + i, initCol + j]);
            }
        }
        return arr;
    }

    valueInSquare(grid: Grid, value: number, row: number, col: number) {
        const square = this.getSquare(row, col);
        const list: Array<Pair> = this.getSquareList(square);

        for(const pair of list) {
            const [x, y] = pair;
            if(grid[x][y] == value) {
                return true;
            }
        }
        return false;
    }

    valueInRow(grid: Grid, value: number, row: number) {
        for(let i = 0; i < 9; i++) {
            if(grid[row][i] == value) {
                return true;
            }
        }
        return false;
    }

    valueInCol(grid: Grid, value: number, col: number) {
        for(let i = 0; i < 9; i++) {
            if(grid[i][col] == value) {
                return true;
            }
        }
        return false;
    }
}

export { SudokuGrid }