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
          intersect[a][b] = '';
          continue;
        }
        intersect[a][b] = removeArray[a];
        continue;
      }
      intersect[a][b] = '';
    }
  }

  //Final step for staggered diagonalization
  /*for (var a = 0; a < remove.length-1; a++) {
    for (var b = 0; b < base.length; b++) {
      if (intersect[a][b]==1) {
        intersect[a+1][b]=0;
        break;
      }
      intersect[a][b]=0;
    }
  }*/

  return intersect;
}

function functionalLoop(base, remove, limb) {

  var intersect = createMatrix(base, remove);
  //console.log(intersect);

  var solveList = solve({
    intersect,
    base,
    width: base.length,
    height: remove.length
  });

  //console.log(solveList);

  //JavaScript does not have overloading so manually check
  if(limb == null) {
    return solveList;
  }
  else {
    return checkLimb(solveList, limb);
  }

};

function reduceList(stringList, limb) {
  var uniqueList = [];
  var strLength = Object.keys(stringList).length;
  uniqueList[0] = stringList[0];
  var slider = 0;

  for(var a = 0; a < strLength; a++) {
    slider = 0;
    for(var b = 0; b < limb.length; b++) {
      for(var c = slider; c < stringList[a].length; c++) {
          slider = c;
          if(b==limb.length-1) {
            uniqueList.push(stringList[a]);
          }
          break;
      }
      if(c==stringList[a].length-1) {
        b=limb.length;
        break;
      }
    }
  }
  return uniqueList;
};

function checkLimb(solveList, limb) {

  var finalList = {};

  solveList.forEach(function limbSegmentFn(base) {

    var intersect = createMatrix(base, limb);

    var secondList = solve({
      intersect,
      base,
      width: base.length,
      height: limb.length
    });

    //console.log(secondList);

    if (!secondList) {
      return;
    }

    secondList.forEach(function setFinalListFn(path) {
      finalList[path] = true;
    });
  });

  return finalList;
}

function solve(props) {

  var base = props.base;
  var lookBelow = setupLookBelow(props);
  var answerLists = [];
  var moves = lookBelow(0, 0);

  function subslice(output, moveSet) {
    
    return Object.keys(moveSet).map(function checkMoves(key) {

      var copy = output.slice(0);
      copy[key] = ' ';
      //console.log(copy);

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

function setupLookBelow(props) {

  var width = props.width;
  var height = props.height;
  var intersect = props.intersect;

  function checkPreviousIsDifferent(y, x) {
    if (x < 1) {
      return true;
    }
 
    return intersect[y][x - 1] !== intersect[y][x];
  }

  return function lookBelow(startX, startY) {

    var moves = {};

    for (var x = startX; x < width; x++) {

      if (intersect[startY][x] != '') {
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

    //console.log(moves);

    return Object.keys(moves).length > 0 ? moves : null;
  };
};

module.exports = {
  functionalLoop: functionalLoop,
};
