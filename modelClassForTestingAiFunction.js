"use strict";

function Model(rowTotal, columnTotal) {
  this.rowTotal = rowTotal;
  this.columnTotal = columnTotal;
  this.newGame();
  this.players = new Array(2);
  this.currentPlayerIndex = 0;
  this.players[0] = 'X';
  this.players[1] = 'O';
}


var model = {
  constructor: Model,
  newGame: function() {
    //this.board.length = 0;
    //this.currentPlayerIndex = 0;
    //this.players.length = 0;
    this.board = new Array(this.rowTotal);
    for (var i = 0; i < this.rowTotal; i++) {
      this.board = new Array(this.columnTotal);
    }
    //Newly Added in. Default set an "empty space" to ""
    for (var j = 0; j < this.rowTotal; j++) {
      this.board[j] = [];
      for (var k = 0; k < this.columnTotal; k++) {
        this.board[j][k] = "";
      }
    }
  },
  isDraw: function() {
    this.boardSpaces = this.rowTotal * this.columnTotal;
    this.spacesTakenCounter = 0;
    for (var i = 0; i < this.rowTotal; i++) {
      for (var j = 0; j < this.columnTotal; j++) {
        if (this.board[i][j] !== "") {
          this.spacesTakenCounter += 1;
        } else {
          //Break out of the loop
          i = this.rowTotal;
          j = this.columnTotal;
        }
      }
    }

    if (this.spacesTakenCounter === this.boardSpaces)
      return true;
    else
      return false;
  },
  isValidMove: function(row, column) {
    //For tic tac toe
    if (this.board[row][column] !== "")
      return false;
    else
      return true;
  },
  makeMove: function(row, col) {
    if (this.isValidMove(row, col)) {
      this.board[row][col] = this.players[this.currentPlayerIndex];
      //Need to add way to change currentPlayerIndex to the opposite player
      //May put this into playerWin().
      if (this.currentPlayerIndex === 0)
        this.currentPlayerIndex = 1;
      else
        this.currentPlayerIndex = 0;
      return true; //recently added
    }
    return false; //recently added
  },
  getPlayer: function(row, col) {
    return this.board[row][col];
  },
  playerWin: function() {
    this.consecutiveSpaces = 0;
    //TESTS FOR HORIZONTAL WIN
    //This nested for loop tests one row at a time. The second a cell has the wrong player, it skips to the next row
    for (var i = 0; i < this.rowTotal; i++) {
      for (var j = 0; j < this.columnTotal; j++) {
        if (this.getPlayer(i, j) === this.players[this.currentPlayerIndex])
          this.consecutiveSpaces += 1;
        else {
          this.consecutiveSpaces = 0;
          j = this.columnTotal; //Impossible for this row to win, move on to the next row.
        }
        if (this.consecutiveSpaces === this.columnTotal)
          return this.players[this.currentPlayerIndex]; //3 consecutive cells, we have a winner!
      }
    } //End Horizontal tests
    //TESTS FOR VERTICAL WIN
    //This nested for loop tests one column at a time. The second a cell has the wrong player, it skips to the next row.
    for (var k = 0; k < this.columnTotal; k++) {
      for (var l = 0; l < this.rowTotal; l++) {
        if (this.getPlayer(l, k) === this.players[this.currentPlayerIndex])
          this.consecutiveSpaces += 1;
        else {
          this.consecutiveSpaces = 0;
          l = this.rowTotal; //Impossible for this Column to win, move on to the next Col
        }
        if (this.consecutiveSpaces === this.rowTotal)
          return this.players[this.currentPlayerIndex]; //3 consecutive cells, we have a winner!
      }
    } //End Vertical Tests
    //TESTS FOR TOP LEFT - BOTTOM RIGHT DIAGONAL WIN
    var m = 0;
    var n = 0;
    while (n < this.columnTotal && this.getPlayer(m, n) === this.players[this.currentPlayerIndex]) {
      this.consecutiveSpaces += 1;
      m += 1;
      n += 1;

    }
    if (this.consecutiveSpaces === this.columnTotal)
      return this.players[this.currentPlayerIndex];
    //First Diagonal failed, so lets try the second one.
    else {
      m = this.rowTotal - 1;
      n = 0;
      this.consecutiveSpaces = 0;
      while (n < this.columnTotal && this.getPlayer(m, n) === this.players[this.currentPlayerIndex]) {
        this.consecutiveSpaces += 1;
        m = m - 1;
        n = n + 1;
      }
      if (this.consecutiveSpaces === this.columnTotal)
        return this.players[this.currentPlayerIndex];
    } //End second Diagonal test

    if (this.isDraw())
      return "Draw"; //FULL BOARD SO NO WINNER
    else
      return "No Winner Yet"; //No winner yet
  },
  addPlayer: function(str) {
    this.players.push(str);
  },
  copy: function(i) {
    return this.board[i].slice();
  },
    playerWinSimple: function() {
    this.consecutiveSpacesSimple = 0;
    //TESTS FOR HORIZONTAL WIN
    //This nested for loop tests one row at a time. The second a cell has the wrong player, it skips to the next row
    for (var i = 0; i < this.rowTotal; i++) {
      for (var j = 0; j < this.columnTotal; j++) {
        if (this.getPlayer(i, j) === this.players[this.currentPlayerIndex])
          this.consecutiveSpacesSimple += 1;
        else {
          this.consecutiveSpacesSimple = 0;
          j = this.columnTotal; //Impossible for this row to win, move on to the next row.
        }
        if (this.consecutiveSpacesSimple === this.columnTotal)
          return this.players[this.currentPlayerIndex]; //3 consecutive cells, we have a winner!
      }
    } //End Horizontal tests
    if (this.isDraw())
      return "Draw"; //FULL BOARD SO NO WINNER
    else
      return "No Winner Yet"; //No winner yet
  }
};

Model.prototype = model;