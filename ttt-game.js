function createGrid(rows, columns){
var table = document.createElement("table");
var row;
var column;
var txt;
  for(var i = 0; i < rows; i++){
    row = document.createElement("tr");
    for(var j = 0; j < columns; j++){
      column = document.createElement("td");
      txt = document.createTextNode("");
      column.appendChild(txt);
      column.className="game-grid-cell";
      row.appendChild(column);
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);
  table.className="game-grid-view";
}

function setCellText(row, col, str){
document.documentElement.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].firstChild.nodeValue = str;
}


createGrid(3,3);
///console.log(document.body.getElementsByTagName("table").childNodes[0].firstChild);
//var x = document.body.getElementsByTagName("table").rows[0].cells.length;
//document.body.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].firstChild.nodeValue = "X";
//var num = x.length;\
//console.log(x);
//setCellText(1,2,"X");
//setCellText(0,0,"O");
//setCellText(2,2,"X");
//setCellText(0,2,"O");
//setCellText(2,0,"X");
//setCellText(0,1,"O");
//setCellText(2,1,"X");
//setCellText(1,1,"O");
//setCellText(1,0,"X");

//var w = new worker("ai.js"); ->String 

//w.postMessage(m); In event handler, you can have it so ai runs after you click to makeMove.

//this receives data, message, and runs getBestOutcome
//ai.addEventListener("message", fucntion(){
  //getBestOutcome();
//})
//Post message with result. This is how these two communicate
//w.addeventlistener ->Same as ai, gets message here and does whatever. Look up eloquent javascript
/*-----------------------------------------View Class------------------------------------------->

function View(model, callback) {
  callback(tdElement, 3, 5);
}

Model m = new Model(3,3);
View v = new View(m, function(row, column, tdElement) {
  tdElement.addEventListener("click", function() {
    setCellText(row, column, tdElement);
  });
});
*/


/*<----------------------------------------Model Class------------------------------------------>*/
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
  playerWin: function(currentPlayer) {
    this.consecutiveSpaces = 0;
    //TESTS FOR HORIZONTAL WIN
    //This nested for loop tests one row at a time. The second a cell has the wrong player, it skips to the next row
    for (var i = 0; i < this.rowTotal; i++) {
      for (var j = 0; j < this.columnTotal; j++) {
        if (this.getPlayer(i, j) === this.players[currentPlayer])
          this.consecutiveSpaces += 1;
        else {
          this.consecutiveSpaces = 0;
          j = this.columnTotal; //Impossible for this row to win, move on to the next row.
        }
        if (this.consecutiveSpaces === this.columnTotal)
          return this.players[currentPlayer]; //3 consecutive cells, we have a winner!
      }
    } //End Horizontal tests
    //TESTS FOR VERTICAL WIN
    //This nested for loop tests one column at a time. The second a cell has the wrong player, it skips to the next row.
    for (var k = 0; k < this.columnTotal; k++) {
      for (var l = 0; l < this.rowTotal; l++) {
        if (this.getPlayer(l, k) === this.players[currentPlayer])
          this.consecutiveSpaces += 1;
        else {
          this.consecutiveSpaces = 0;
          l = this.rowTotal; //Impossible for this Column to win, move on to the next Col
        }
        if (this.consecutiveSpaces === this.rowTotal)
          return this.players[currentPlayer]; //3 consecutive cells, we have a winner!
      }
    } //End Vertical Tests
    //TESTS FOR TOP LEFT - BOTTOM RIGHT DIAGONAL WIN
    var m = 0;
    var n = 0;
    while (n < this.columnTotal && this.getPlayer(m, n) === this.players[currentPlayer]) {
      this.consecutiveSpaces += 1;
      m += 1;
      n += 1;

    }
    if (this.consecutiveSpaces === this.columnTotal)
      return this.players[currentPlayer];
    //First Diagonal failed, so lets try the second one.
    else {
      m = this.rowTotal - 1;
      n = 0;
      this.consecutiveSpaces = 0;
      while (n < this.columnTotal && this.getPlayer(m, n) === this.players[currentPlayer]) {
        this.consecutiveSpaces += 1;
        m = m - 1;
        n = n + 1;
      }
      if (this.consecutiveSpaces === this.columnTotal)
        return this.players[currentPlayer];
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
var tttModel1 = new Model(3, 3);
var tttModel2 = new Model(3, 3);
var tttModel3 = new Model(3, 3);
var tttModel4 = new Model(1, 2);
var tttModel5 = new Model(3, 3);
var tttModel6 = new Model(3, 3);
var tttModel7 = new Model(3, 3);
tttModel2.board[0][1] = 'X';
tttModel2.board[1][2] = 'O';
tttModel2.board[2][1] = 'X';
tttModel2.board[0][0] = 'O';
tttModel2.board[2][0] = 'X';

tttModel3.board[0][1] = 'O';
tttModel3.board[1][2] = 'X';
tttModel3.board[2][1] = 'O';
tttModel3.board[0][0] = 'X';
tttModel3.board[2][0] = 'O';

tttModel5.board[0][0] = 'O';
tttModel5.board[0][1] = 'X';
tttModel5.board[0][2] = 'X';
tttModel5.board[1][1] = 'O';
tttModel5.board[1][2] = 'X';

tttModel6.board[0][0] = 'X';
tttModel6.board[0][1] = 'O';
tttModel6.board[0][2] = 'O';
tttModel6.board[1][1] = 'X';
tttModel6.board[1][2] = 'O';

tttModel7.board[0][0] = 'O';
tttModel7.board[0][1] = 'X';
tttModel7.board[0][2] = 'X';
tttModel7.board[1][0] = 'O';
tttModel7.board[1][1] = 'O';
tttModel7.board[1][2] = 'X';
tttModel7.board[2][0] = 'X';
tttModel7.board[2][1] = 'O';


/*-------------Elements of Controller and View. Event handlers added to each cell, and cells updated via the update function and setInterval-------*/

//SETS EVENT HANDLER FOR EACH CELL
function addEventListenerToCell(m,i, j){

    document.documentElement.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        m.makeMove(i,j);
      //}
      //}
  });
}
//**********Added this on march 16th. Should be used instead of separately adding each cell. 
//This for loop and addsEventListenerToCell could be used in the view class.
//Then you could add this to view class. I think each cell has its own view. since each has to have own eventhandler.
//Could make the 3's be rowTotal and colTotal that are set up in view class or taken from model class.
 // for(var i = 0; i < 3; i++){
 //   for(var j = 0; j < 3; j++){
 //     addEventListenerToCell(i,j);
 //   }
 // }
 for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
 addEventListenerToCell(tttModel1,i,j);
}
}
//Testing one cell. Eventlistener added to one cell.
/*
document.documentElement.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(0,0);
      //}
      //}
  });

document.documentElement.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(0,1);
      //}
      //}
  });
document.documentElement.getElementsByTagName("tr")[0].getElementsByTagName("td")[2].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(0,2);
      //}
      //}
  });
document.documentElement.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(1,0);
      //}
      //}
  });
document.documentElement.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(1,1);
      //}
      //}
  });
document.documentElement.getElementsByTagName("tr")[1].getElementsByTagName("td")[2].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(1,2);
      //}
      //}
  });
document.documentElement.getElementsByTagName("tr")[2].getElementsByTagName("td")[0].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(2,0);
      //}
      //}
  });
document.documentElement.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(2,1);
      //}
      //}
  });
document.documentElement.getElementsByTagName("tr")[2].getElementsByTagName("td")[2].addEventListener("click", function() {
      //if(event.onClick){
        //if(m.isValidMove){
        //setCellText(row, column, m.players[m.currentPlayerIndex]);
        //alert("Click");
        tttModel1.makeMove(2,2);
      //}
      //}
  });*/
// window.addEventListener("click", function() {
//       //if(event.onClick){
//         //if(m.isValidMove){
//         //setCellText(row, column, m.players[m.currentPlayerIndex]);
//         alert("Click");
//         tttModel1.makeMove(0,0);
//       //}
//       //}
//   });
var tempPointBoard = {
      rowWhereMoveMade: 0,
      colWhereMoveMade: 0,
      pointValue: 1
  };
//UPDATES VIEW SO X AND O APPEAR WHEN MOVES ARE MADE.
function updateView(m){
for(var k = 0; k < 3; k++){
  for(var l = 0; l < 3; l++){
    setCellText(k,l,m.getPlayer(k,l));
  }
}
}
//addsEventListeners();
//Put while loop here
var gameLoop = setInterval(function(){ 
  //addsEventListeners();
  if(tttModel1.players[tttModel1.currentPlayerIndex] === 'O'){
    tempPointBoard = getBestOutcome(tttModel1, true);
    tttModel1.makeMove(tempPointBoard.rowWhereMoveMade,tempPointBoard.colWhereMoveMade);
  }
  updateView(tttModel1);
  if(tttModel1.playerWin(0) === 'X' || tttModel1.playerWin(1) === 'O' || tttModel1.playerWin(0) === 'Draw'){
    alert("Game Over");
  clearInterval(gameLoop);

}
  //setCellText(0,0, 'X');
}, 0);//Every 3 seconds.












/*-----------------------AI FUNCTION-------------------------------------*/

function getBestOutcome(boardModel, isMaximizingPlayer) {

  //Declare and initialize model copy and variable to determine if move was valid, and variable to store potential outcomes
  var tempPoint = -1;
  var bestPoint = -1;
  if(isMaximizingPlayer){
  var tempPointBoard = {
      rowWhereMoveMade: 0,
      colWhereMoveMade: 0,
      pointValue: -1
  };
  var bestPointBoard = {
    rowWhereMoveMade: 0,
    colWhereMoveMade: 0,
    pointValue : -1
  };
}
else{
  var tempPointBoard = {
      rowWhereMoveMade: 0,
      colWhereMoveMade: 0,
      pointValue: 1
  };
  var bestPointBoard = {
    rowWhereMoveMade: 0,
    colWhereMoveMade: 0,
    pointValue : 1
  };
}
  //var bestPointBoard = {};

  //Base case. Return -1 for loss, 1 for win, or 0 for draw.
  if (boardModel.playerWin(0) === 'X') {
    bestPointBoard.rowWhereMoveMade = 0;
    bestPointBoard.colWhereMoveMade = 0;
    bestPointBoard.pointValue = -1;
    return bestPointBoard;
  } else if (boardModel.playerWin(1) === 'O') {
    bestPointBoard.rowWhereMoveMade = 0;
    bestPointBoard.colWhereMoveMade = 0;
    bestPointBoard.pointValue = 1;
    return bestPointBoard;
  } else if (boardModel.playerWin(0) === 'Draw') {
    bestPointBoard.rowWhereMoveMade = 0;
    bestPointBoard.colWhereMoveMade = 0;
    bestPointBoard.pointValue = 0;
    return bestPointBoard;
  }

  var tttModel = new Model(boardModel.rowTotal, boardModel.columnTotal);
  tttModel.currentPlayerIndex = boardModel.currentPlayerIndex;
  var isValidMove = true;
  for (var i = 0; i < boardModel.rowTotal; i++) {
    for (var j = 0; j < boardModel.columnTotal; j++) {
      tttModel.board[0] = boardModel.copy(0);
      tttModel.board[1] = boardModel.copy(1);
      tttModel.board[2] = boardModel.copy(2);
      //If the player is the computer, make the move at the given location
      if (isMaximizingPlayer) {
        tttModel.currentPlayerIndex = 1;//Make currentPlayerIndex the AI player

        isValidMove = tttModel.makeMove(i, j);
        tttModel.currentPlayerIndex = 1;//This is messy. Fix this later. But, you need to check playerWin before you switch over.
        if (isValidMove) {
          tempPointBoard = getBestOutcome(tttModel, !isMaximizingPlayer);
          if (tempPointBoard.pointValue >= bestPointBoard.pointValue) {
            bestPointBoard = tempPointBoard;
            bestPointBoard.rowWhereMoveMade = i;
            bestPointBoard.colWhereMoveMade = j;
          }
        } else {
          continue;
        }
      } else if (!isMaximizingPlayer) {
        tttModel.currentPlayerIndex = 0;//Make currentPlayerIndex the human player  

        isValidMove = tttModel.makeMove(i, j);
        tttModel.currentPlayerIndex = 0; //This is messy. Fix this later. But, you need to check playerWin before you switch over.
        if (isValidMove) {
          tempPointBoard = getBestOutcome(tttModel, !isMaximizingPlayer);
          if (tempPointBoard.pointValue <= bestPointBoard.pointValue) {
            bestPointBoard = tempPointBoard;
            bestPointBoard.rowWhereMoveMade = i;
            bestPointBoard.colWhereMoveMade = j;
          }
        } else {
          continue;
        }
      }
    }//End of inner for loop

  }//End of outer for loop

  return bestPointBoard;
  
}//End getBestOutcome function 

//console.log(getBestOutcome(tttModel1, false));
//console.log(getBestOutcome(tttModel2, true));

//console.log(getBestOutcome(tttModel4, 0, 0, false));
//console.log(getBestOutcome(tttModel6, false));
//console.log(getBestOutcome(tttModel6, false));
//console.log("This is the final return");
//console.log(getBestOutcome(tttModel3, true));
//console.log(getBestOutcome(tttModel3, false ));
//console.log(getBestOutcome(tttModel2, true));
//var tttModel3 = new Model(1,2);
//console.log(getBestOutcome(tttModel3, true));











/*
"use strict";
function Model(rowTotal, columnTotal){
  this.rowTotal = rowTotal;
  this.columnTotal=columnTotal;
  this.board = new Array(rowTotal);
  for(var i = 0; i < rowTotal; i++){
    this.board = new Array(columnTotal);
  }
  //Newly Added in. Default set an "empty space" to ""
  for(var j = 0; j < rowTotal; j++){
    this.board[j]= [];
    for(var k = 0; k < columnTotal; k++){
        this.board[j][k] = "";
    }
}
  this.players = new Array(2);
  this.players[0] = 'X'; //Temporary, used to test makeMove method
  this.players[1] = 'O'; //Temporary, used to test makeMove method
  this.currentPlayerIndex = 0;
}

var model = {
  constructor: Model,
  addPlayer: function(str){
    this.players.push(str);
  },
  isValidMove:function(row,column){
    //For tic tac toe
    if(this.board[row][column]!=="")
      return false;
    else
      return true;
  },
  playerWin: function(){
    if(this.isDraw())
      return "";
    else
      return this.players[this.currentPlayerIndex];
  },
  isDraw: function(){
    this.boardSpaces = this.rowTotal * this.columnTotal;
    this.spacesTakenCounter = 0;
    for(var i = 0; i < this.rowTotal; i++){
        for(var j = 0; j < this.columnTotal; j++){
            if(this.board[i][j] !== ""){
                this.spacesTakenCounter += 1;
            }
            else{
                //Break out of the loop
                i = this.rowTotal;
                j = this.columnTotal;
            }
        }
    }
    
    if(this.spacesTakenCounter === this.boardSpaces)
      return true;
    else
      return false;
  },
  getPlayer: function(row, col){
    return this.board[row][col];
  },
  newGame: function(){
    //this.board.length = 0;
    this.currentPlayerIndex = 0;
    //this.players.length = 0;
  }, 
  makeMove: function(row, col){
    if(this.isValidMove(row,col))
      this.board[row][col] = this.players[this.currentPlayerIndex];
  }
};
Model.prototype = model;
*/
