//Darren Cattle
//February 2016
//main.js

var library = require('./lib');

/*var given = "-_****_*___***_-_*-_*-*___*--_*-_*-*_***___***_*-_--*_*-";
var remove = "-*--_---_-**_*-";
var postremove = "*-**_*_**_*-";*/

var given = "*-_-***_-*-*_-**";
var remove = "***_-";
var postremove = "--**_-*";

var start = new Date();

console.log('given char length: ' + given.length);
console.log('removal char length: ' + remove.length);
console.log('second removal char length: ' + postremove.length);

var answerKey = library.functionalLoop(given, remove, postremove);
var answer = Object.keys(answerKey).length;

var end = new Date();

console.log('answer: ' + answer);

console.log('execution time: ' + (end-start)/1000 + 's'); 

console.log('done');