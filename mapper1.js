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
var tttModel8 = new Model(3, 3);
var tttModel9 = new Model(3, 3);
var tttModel10 = new Model(3, 3);
var parentModel = new Model(3, 3);

// parentModel.board[0][0] = '';
// parentModel.board[0][1] = '';
// parentModel.board[0][2] = '';
// parentModel.board[1][0] = '';
// parentModel.board[1][1] = '';
// parentModel.board[1][2] = '';
// parentModel.board[2][0] = '';
// parentModel.board[2][1] = '';
// parentModel.board[2][2] = '';

tttModel1.board[0][0] = '';
tttModel1.board[0][1] = '';
tttModel1.board[0][2] = '';
tttModel1.board[1][0] = '';
tttModel1.board[1][1] = '';
tttModel1.board[1][2] = '';
tttModel1.board[2][0] = '';
tttModel1.board[2][1] = '';
tttModel1.board[2][2] = '';

// tttModel2.board[0][0] = '';
// tttModel2.board[0][1] = 'X';
// tttModel2.board[0][2] = '';
// tttModel2.board[1][0] = '';
// tttModel2.board[1][1] = '';
// tttModel2.board[1][2] = '';
// tttModel2.board[2][0] = '';
// tttModel2.board[2][1] = '';
// tttModel2.board[2][2] = '';


// tttModel3.board[0][0] = '';
// tttModel3.board[0][1] = '';
// tttModel3.board[0][2] = 'X';
// tttModel3.board[1][0] = '';
// tttModel3.board[1][1] = '';
// tttModel3.board[1][2] = '';
// tttModel3.board[2][0] = '';
// tttModel3.board[2][1] = '';
// tttModel3.board[2][2] = '';

// tttModel4.board[0][0] = '';
// tttModel4.board[0][1] = '';
// tttModel4.board[0][2] = '';
// tttModel4.board[1][0] = 'X';
// tttModel4.board[1][1] = '';
// tttModel4.board[1][2] = '';
// tttModel4.board[2][0] = '';
// tttModel4.board[2][1] = '';
// tttModel4.board[2][2] = '';

// tttModel5.board[0][0] = '';
// tttModel5.board[0][1] = '';
// tttModel5.board[0][2] = '';
// tttModel5.board[1][0] = '';
// tttModel5.board[1][1] = 'X';
// tttModel5.board[1][2] = '';
// tttModel5.board[2][0] = '';
// tttModel5.board[2][1] = '';
// tttModel5.board[2][2] = '';

// tttModel6.board[0][0] = '';
// tttModel6.board[0][1] = '';
// tttModel6.board[0][2] = '';
// tttModel6.board[1][0] = '';
// tttModel6.board[1][1] = '';
// tttModel6.board[1][2] = 'X';
// tttModel6.board[2][0] = '';
// tttModel6.board[2][1] = '';
// tttModel6.board[2][2] = '';

// tttModel7.board[0][0] = '';
// tttModel7.board[0][1] = '';
// tttModel7.board[0][2] = '';
// tttModel7.board[1][0] = '';
// tttModel7.board[1][1] = '';
// tttModel7.board[1][2] = '';
// tttModel7.board[2][0] = 'X';
// tttModel7.board[2][1] = '';
// tttModel7.board[2][2] = '';

// tttModel8.board[0][0] = '';
// tttModel8.board[0][1] = '';
// tttModel8.board[0][2] = '';
// tttModel8.board[1][0] = '';
// tttModel8.board[1][1] = '';
// tttModel8.board[1][2] = '';
// tttModel8.board[2][0] = '';
// tttModel8.board[2][1] = 'X';
// tttModel8.board[2][2] = '';

// tttModel9.board[0][0] = '';
// tttModel9.board[0][1] = '';
// tttModel9.board[0][2] = '';
// tttModel9.board[1][0] = '';
// tttModel9.board[1][1] = '';
// tttModel9.board[1][2] = '';
// tttModel9.board[2][0] = '';
// tttModel9.board[2][1] = '';
// tttModel9.board[2][2] = 'X';

// tttModel10.board[0][0] = '';
// tttModel10.board[0][1] = '';
// tttModel10.board[0][2] = '';
// tttModel10.board[1][0] = '';
// tttModel10.board[1][1] = '';
// tttModel10.board[1][2] = '';
// tttModel10.board[2][0] = '';
// tttModel10.board[2][1] = '';
// tttModel10.board[2][2] = '';



//var gameList = [
	//{key:modelString, value:{parentModels: parentModelStringList, isAITurn:true/false, points:points}}
  var branchObj = {
  key: [],
  value:{parentModels: [], isAITurn:true, points: 0}
  
};

JSON.stringify(tttModel1);
//]
var gameList = [
	// {key: tttModel1, value:{parentModels:parentModel, isAITurn:true, points:0}},
	// {key: tttModel2, value:{parentModels:parentModel, isAITurn:true, points:0}},
 //  {key: tttModel3, value:{parentModels:parentModel, isAITurn:true, points:0}},
	// {key: tttModel4, value:{parentModels:parentModel, isAITurn:true, points:0}},
 //  {key: tttModel5, value:{parentModels:parentModel, isAITurn:true, points:0}},
	// {key: tttModel6, value:{parentModels:parentModel, isAITurn:true, points:0}},
 //  {key: tttModel7, value:{parentModels:parentModel, isAITurn:true, points:0}},
	// {key: tttModel8, value:{parentModels:parentModel, isAITurn:true, points:0}},
 //  {key: tttModel9, value:{parentModels:parentModel, isAITurn:true, points:0}}
 {key: tttModel1, value:{parentModels:[], isAITurn:true, points:0}}
];

//JSON.stringify(tttModel1); //->Stringversion of whole model
//JSON.parse //->undo string
//Model.prototype.copy.call();//call allows you to set this
//Need to use getBestOutcome()
function mapper(kVPairList, mapFunc) {
  // filenameLinePairs consists of a list of objects in the form {key: fileName, value: line}
  var outputtedKVPairs = [];
  return kVPairList.map(function(kVPair) {
    var parentModelString = kVPair.key; // ignored for output from this map function
    var gameState = kVPair.value;
    //serialization
    //USE PARSE AND COPY.CALL() HERE
    //need another var parentModel for parse.
    //at this point, modellike
    var tempModel = JSON.parse(parentModelString);
    var parentModel = Model.prototype.copy.call(tempModel); //on this modellike
    //
    for (var i = 0; i < parentModel.rowTotal; i++) {
      for (var j = 0; j < parentModel.columnTotal; j++) {
        var tttModel = new Model(boardModel.rowTotal, boardModel.columnTotal);
        tttModel = parentModel.copy();
        if(tttModel.isValidMove(i, j)){
          tttModel.makeMove(i, j);
        }
        branchObj.key = JSON.stringify(tttModel);
        branchObj.value.parentModels = parentModelString;
        branchObj.value.isAITurn = !gameState.value.isAITurn;
        outputtedKVPairs.push(branchObj);
      }
    }
    JSON.stringify(parentModel);//Not sure why this is here
    //Plan of attack for tomorrow is to find out proper order for this return
    //Should I be returning this? Or storing them in a gameList and then returning?
    //the for loops should wrap around more code?, so its possible
    //Fix JSON error on line 321.
     
        return outputtedKVPairs; // each word contributes 1 to the total
  
  });
}

function flatten(itemList) {
	return itemList.reduce(function(arr, list) {
		return arr.concat(list);	
	});
}

function sort(kVPairList) {
	kVPairList.sort(function(kVPair1, kVPair2) {
		var val = 0;
		if(kVPair1.key < kVPair2.key) {
			val = -1;
		}
		else if(kVPair1.key > kVPair2.key) {
			val = 1;
		}
		
		return val;
	});
}

function plus(a, b) {
	return a + parseInt(b);
}

function reducer(sortedKeyValuePairs) {
	var i = 0;
	var keyValuesList = [];
	while(i < sortedKeyValuePairs.length) {
		var key = sortedKeyValuePairs[i].key;
		var singleKeyValuesList = {key: key, values:[]};
		while(i < sortedKeyValuePairs.length && key === sortedKeyValuePairs[i].key) {
			singleKeyValuesList.values.push(sortedKeyValuePairs[i].value);
			i++;
		}
		keyValuesList.push({key: singleKeyValuesList.key, 
		                    value: singleKeyValuesList.values.reduce(plus, 0)
		                   });
	}
	
	return keyValuesList;
/*	
	var singleKeyValuesList = {key: sortedKeyValuePairs[0].key, value:sortedKeyValuePairs[0].key};
	sortedKeyValuePairs.forEach(function(kVPair) {
		if(singleKeyValuesList.key != kVPair)
		singleKeyValuePairs.push()
	});
*/
}

function mapperOutputToString(listsOfWordValuePairs) {
  return listsOfWordValuePairs.map(function(pairWordValuePairs) {
    return pairWordValuePairs.map(function(pair) {
  	  return pair.key + ": " + pair.value;
    });
  });
}



//console.log(mapperOutputToString(mapper(filenameLinePairs)));
var mapperOutput = flatten(mapper(gameList));
sort(mapperOutput);
console.log(mapperOutput);
console.log(reducer(mapperOutput));
