import React from 'react';

import Board from './Board';

import '../css/main.scss';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      board: [],
      turn: 0,
      message: '',
      winMessage: ''
    };
  }

  componentDidMount() {
    this.initBoard();
  }

  //Initial new board
  initBoard() {
    let row = 6;
    let column = 7;
    let board = Array(row).fill().map(() => Array(column).fill(0));
    this.setState({
      status: 'playing',
      board: board,
      turn: 1,
      message: 'Click on the board to start the game!'
    });
  }

  handleClick(column) {
    this.placePiece(column);
    this.handleOnMouseLeave(column);
    this.handleOnMouseEnter(column);
  }

  handleOnMouseEnter(column) {
    let newBoard = this.state.board;
    for (let row=newBoard.length-1; row>=0; row--) {
      if (newBoard[row][column] === 0) {
        newBoard[row][column] = 3;
        break;
      }
    }
    this.setState({
      board: newBoard
    });
  }

  handleOnMouseLeave(column) {
    let newBoard = this.state.board;
    for (let row=newBoard.length-1; row>=0; row--) {
      if (newBoard[row][column] === 3) {
        newBoard[row][column] = 0;
        break;
      }
    }
    this.setState({
      board: newBoard
    });
  }

  handleGameEndClick() {
    this.setState({
      winMessage: 'Game over, please restart a new game!'
    });
  }

  //Toggle turns between two players
  toggleTurn() {
    let newTurn = this.state.turn;
    let message = '';

    if (newTurn === 1) {
      newTurn = 2;
      message = `It's player red's turn`;
    } else if (newTurn === 2) {
      newTurn = 1;
      message = `It's player yellow's turn`;
    }

    this.setState({
      turn: newTurn,
      message: message
    });
  }

  //Place piece onto board base on column
  placePiece(column) {
    let newBoard = this.state.board;
    let newTurn = this.state.turn;
    let location = [];

    for (let row=newBoard.length-1; row>=0; row--) {
      if (newBoard[row][column] === 3) {
        newBoard[row][column] = this.state.turn;
        location = [row, column];
        if (this.check(location)) {
          // console.log('win!');
          let message = '';
          if (newTurn === 1) {
            message = `Player yellow wins!`;
          } else if (newTurn === 2) {
            message = `Player red wins!`;
          }
          this.setState({
            status: 'end',
            message: message
          });
        } else {
          this.toggleTurn();
          this.setState({
            board: newBoard
          });
        }
        if (row === 0) {
          this.checkTie();
        }
        break;

      }
    }
  }

  //Check if win game
  check(location) {
    return (this.checkRow(location) || this.checkColumn(location) || this.checkDiagonal(location));
  }

  //Check row condition
  checkRow(location) {
    let board = this.state.board;
    let turn = this.state.turn;
    let count = 0;
    for (let i=location[1]+1; i<board[0].length; i++) {
      if (board[location[0]][i] === this.state.turn) count += 1;
      else break;
    }
    for (let i=location[1]-1; i>=0; i--) {
      if (board[location[0]][i] === this.state.turn) count += 1;
      else break;
    }

    if (count >= 3) return true;
    else return false;
  }

  //Check column condition
  checkColumn(location) {
    let board = this.state.board;
    let turn = this.state.turn;
    let count = 0;

    for (let i=location[0]+1; i<board.length; i++) {
      if (board[i][location[1]] === this.state.turn) count += 1;
      else break;
    }
    for (let i=location[0]-1; i>=0; i--) {
      if (board[i][location[1]] === this.state.turn) count += 1;
      else break;
    }

    if (count >= 3) return true;
    else return false;
  }

  //Check diagonal condition
  checkDiagonal(location) {
    let board = this.state.board;
    let turn = this.state.turn;
    let count = 0;

    for (let i=location[1]+1, j=location[0]-1; i<board[0].length && j>=0; i++, j--) {
      if (board[j][i] === this.state.turn) count += 1;
      else break;
    }
    for (let i=location[1]-1, j=location[0]+1; i>=0 && j<board.length ; i--, j++) {
      if (board[j][i] === this.state.turn) count += 1;
      else break;
    }

    if (count >= 3) return true;
    else count = 0;

    for (let i=location[1]+1, j=location[0]+1; i<board[0].length && j<board.length; i++, j++) {
      if (board[j][i] === this.state.turn) count += 1;
      else break;
    }
    for (let i=location[1]-1, j=location[0]-1; i>=0 && j>=0 ; i--, j--) {
      if (board[j][i] === this.state.turn) count += 1;
      else break;
    }

    if (count >= 3) return true;
    else return false;
  }

  //Check if tie Game
  checkTie() {
    let board = this.state.board;
    let count = 0;
    for (var i = 0; i < board[0].length; i++) {
      if (board[0][i] !== 0) {
        count += 1;
      }
    }
    if (count === board[0].length) {
      this.setState({
        message: `It's a tie game, please restart!`
      });
    }
  }

  restart() {
    this.initBoard();
  }

  render() {
    const status = this.state.status;
    if (status === 'loading') return (<div>Game Loading</div>);
    if (status === 'playing') {
      return (
        <div className="main">
          <Board
            board={this.state.board}
            handleClick={this.handleClick.bind(this)}
            handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
            handleOnMouseLeave={this.handleOnMouseLeave.bind(this)}/>
          <div className="status">
            <button onClick={this.restart.bind(this)}>restart</button>
            <p className="message">{this.state.message}</p>
          </div>
        </div>
      );
    }
    if (status === 'end') {
      return (
        <div className="main">
          <Board board={this.state.board}
            handleClick={this.handleGameEndClick.bind(this)}
            handleOnMouseEnter={this.handleGameEndClick.bind(this)}
            handleOnMouseLeave={this.handleGameEndClick.bind(this)}/>
          <div className="status">
            <button onClick={this.restart.bind(this)}>restart</button>
            <p className="message">{this.state.message}</p>
            <p className="message">{this.state.winMessage}</p>
          </div>
        </div>
      );
    }
  }
};

export default Game;
