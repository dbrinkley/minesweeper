class Game {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }

  get board() {
    return this._board;
  }

  playMove(rowIndex,columnIndex) {
    this._board.flipTile(rowIndex,columnIndex);
    if(this._board._playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('You have lost the game');
      this._board.print();
    } else if (this._board.hasSafeTiles()) {
      console.log('You Won!!!!');
      this._board.print();
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
};


class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);

  }

  get playerBoard() {
    return this._playerBoard;
  }

  get bombBoard() {
    return this._bombBoard;
  }

  get numberOfBombs() {
    return this._numberOfBombs;
  }

  get numberOfTiles() {
    return this._numberOfTiles;
  };

  flipTile(rowIndex,columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      // return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      //******* Issue: I had this._board.getNumberOfNeighborBombs when it should be this.getNumberOfNeighborBombs
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    };
    this._numberOfTitles--;
  }

getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    this._numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
        if (this._bombBoard[neighborRowIndex,neighborColumnIndex] === 'B') {
          this._numberOfBombs++;
        }
      };

    });
  }

  hasSafeTiles() {
    return this._numberOfTiles === this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for(let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for(let columns = 0; columns < numberOfColumns; columns++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for(let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for(let columns = 0; columns < numberOfColumns; columns++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] = 'B') {
        board[randomRowIndex][randomColumnIndex] !== 'B';
        numberOfBombsPlaced++;
      };
    };
    return board;
  }



};


const g = new Game(3,3,3);

g.playMove(2,1);
