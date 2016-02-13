//Darren Cattle
//February 2016
//main.js

var library = require('./lib');

var given = "-_****_*___***_-_*-_*-*___*--_*-_*-*_***___***_*-_--*_*-";
var remove = "-*--_---_-**_*-";
var postremove = "*-**_*_**_*-";

console.log('given char length: ' + given.length);
console.log('removal char length: ' + remove.length);

var answerKey = library.functionalLoop(given, remove, postremove);
var answer = Object.keys(answerKey).length;

console.log(answer);

console.log('done');