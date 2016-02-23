//Darren Cattle
//February 2016
//main.js
//Main executable for command line args
//designed to run in node (-v 4.2.5) without npm install
//In the command line run:
//node main "given" "remove" "remove2nd"

var library = require('./lib');
var given, remove, postremove;

process.argv.forEach(function (val, index, array) {
  given = array[2];
  remove = array[3];
  postremove = array[4];
});

var start = new Date();

console.log('Given: ' + given);
console.log('Remove: ' + remove);

if(postremove){
	console.log('Then Remove: ' + postremove);
	var answerKey = library.functionalLoop(given, remove, postremove);
}
else {
	var answerKey = library.functionalLoop(given, remove);
}
var answer = Object.keys(answerKey).length;

var end = new Date();

console.log('Answer: ' + answer);
console.log('Execution Time: ' + (end-start)/1000 + 's'); 