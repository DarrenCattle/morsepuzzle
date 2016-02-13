//Darren Cattle
//February 2016
//Function Library

function createMatrix(base, remove) {

  var baseArray = [];
  var removeArray = [];
  var intersect = [];

  //Create array for all chars of base string
  for (var x = 0; x < base.length; x++) {
    baseArray[x] = base.charAt(x);
  }

  //Create array for all chars of removal string
  for (var y = 0; y < remove.length; y++) {
    removeArray[y] = remove.charAt(y);
    intersect[y] = [y];
  }

  //Create intersection matrix between base and remove
  for (var a = 0; a < remove.length; a++) {
    for (var b = 0; b < base.length; b++) {
      if (removeArray[a] === baseArray[b]) {
        if (a > b) {
          intersect[a][b] = 0;
          continue;
        }
        intersect[a][b] = 1;
        continue;
      }
      intersect[a][b] = 0;
    }
  }

  //Final step for staggered diagonalization
  for (var a = 0; a < remove.length-1; a++) {
    for (var b = 0; b < base.length; b++) {
      if (intersect[a][b]==1) {
        intersect[a+1][b]=0;
        break;
      }
    }
  }

  return intersect;
}

function functionalLoop(base, remove, limb) {

  var intersect = createMatrix(base, remove);

  var solveList = solve({
    intersect,
    base,
    width: base.length,
    height: remove.length
  });

  //JavaScript does not have overloading so manually check
  if(limb == null) {
    return solveList;
  }
  else {
    var finalList = {};

    for(var i = 0; i < solveList.length; i++) {

      var base = solveList[i];
      var intersect = createMatrix(base, limb);
      
      //console.log(base + ' path: ' + i + ' of ' + solveList.length);
      //console.log(intersect);

      var secondList = solve({
        intersect,
        base,
        width: base.length,
        height: limb.length
      });

      if(secondList != null) {
        secondList.forEach(function(path) {
          finalList[path]=true;
        });
      }
    }

    return finalList;
  }

};

function setupLookBelow(props) {

  var width = props.width;
  var height = props.height;
  var intersect = props.intersect;

  return function lookBelow(startX, startY) {

    var moves = {};

    for (var x = startX; x < width; x++) {

      if (intersect[startY][x]) {
        var nextX = x + 1;
        // Make sure that we are within bounds.
        if (nextX > width) {
          break;
        }

        var nextY = startY + 1;
        if (nextY > height - 1) {
          moves[x] = null;
          continue;
        }

        var movesBelow = lookBelow(x + 1, nextY);

        if (!movesBelow) {
          continue;
        }

        moves[x] = movesBelow;
      }
    }

    return Object.keys(moves).length > 0 ? moves : null;
  };
};

function solve(props) {

  var base = props.base;
  var lookBelow = setupLookBelow(props);
  var answerLists = [];
  var moves = lookBelow(0, 0);

  function subslice(output, moveSet) {
    return Object.keys(moveSet).map(function checkMoves(key) {

      var copy = output.slice(0);
      copy[key] = ' ';

      if (!moveSet[key]) {
        
        var answer = copy.join('').replace(/ /g, '');

        if (answerLists.indexOf(answer) === -1) {
          answerLists.push(answer);
        }
        return;
      }

      subslice(copy, moveSet[key]);

    });
  }

  if(moves != null) {
    subslice(base.split(''), moves);
  }
  else {
    return null;
  }

  return answerLists;
};

module.exports = {
  functionalLoop: functionalLoop,
  createMatrix: createMatrix
};
