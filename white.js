  function removeChar(str, index) {
    if(index === 0) {
      return str.substring(1, str.length);
    }
    if(index === str.length-1) {
      return str.substring(0, str.length-1);
    }
    return str.substring(0,index) + str.substring(index+1,str.length);
  }

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