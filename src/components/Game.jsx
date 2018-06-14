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

  //Initial new board
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

  //Toggle turns between two players
  toggleTurn() {
    let newTurn = this.state.turn;

    if (newTurn === 1) newTurn = 2;
    else if (newTurn === 2) newTurn = 1;

    this.setState({
      turn: newTurn
    });
  }

  //Place piece onto board base on column
  placePiece(column) {
    let newBoard = this.state.board;
    let newTurn = this.state.turn;

    for (let i=newBoard.length - 1; i>=0; i--) {
      if (newBoard[i][column] === 0) {
        newBoard[i][column] = this.state.turn;
        break;
      }
      if (i === 0) {
        this.toggleTurn();
      }
    }

    this.toggleTurn();
    this.setState({
      board: newBoard
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
