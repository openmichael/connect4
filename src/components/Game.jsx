import React from 'react';

import Board from './Board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      board: [],
      turn: 1
    };
  }

  componentDidMount() {
    this.initBoard();
  }

  initBoard() {
    let row = 6;
    let column = 7;
    let board = Array(row).fill().map(() => Array(column).fill(0));
    this.setState({
      loading: false,
      board: board
    });
  }

  handleClick(column) {
    this.placePiece(column);
  }

  placePiece(column) {
    let newBoard = this.state.board;
    let newTurn = this.state.turn;
    for (let i=newBoard.length - 1; i>=0; i--) {
      if (newBoard[i][column] === 0) {
        newBoard[i][column] = this.state.turn;
        break;
      }
      if (i === 0) {
        if (newTurn === 1) newTurn = 2;
        else if (newTurn === 2) newTurn = 1;
      }
    }

    if (newTurn === 1) newTurn = 2;
    else if (newTurn === 2) newTurn = 1;

    this.setState({
      board: newBoard,
      turn: newTurn
    });
  }

  render() {
    const isLoading = this.state.loading;
    return (
      <div>
        {isLoading ?
          (<div>Game Loading</div>) : (<Board board={this.state.board} handleClick={this.handleClick.bind(this)}/>)
        }
      </div>
    );
  }
};

export default Game;
