//Darren Cattle
//February 2016
//Test Scenarios

var library = require('./lib');

//Step 1A
console.log('Testing Step 1A');
var given = "*-_-***";
var remove = "*-*";
var ans = 2;
var start = new Date();
var answerKey = library.functionalLoop(given, remove);
var answer = Object.keys(answerKey).length;
var end = new Date();
console.log('Given:', given);
console.log('Remove:', remove);

if(answer===ans) {
	console.log('Step 1A Passed');
}
else {
	console.log('Step 1A Failed');
}
console.log('Execution Time: ' + (end-start)/1000 + 's')

//Step 1B
console.log('Testing Step 1B');
var given = "****_*_*-**_*-**_---___*--_---_*-*_*-**_-**";
var remove = "****_*_*-**_*--*";
var ans = 1311;
var start = new Date();
var answerKey = library.functionalLoop(given, remove);
var answer = Object.keys(answerKey).length;
var end = new Date();
console.log('Given:', given);
console.log('Remove:', remove);

if(answer===ans) {
	console.log('Step 1B Passed');
}
else {
	console.log('Step 1B Failed');
}
console.log('Execution Time: ' + (end-start)/1000 + 's')

//Step 2A
console.log('Testing Step 2A');
var given = "*-_-***_-*-*_-**";
var remove = "***_-";
var postremove = "--**_-*";
var ans = 5;
var start = new Date();
var answerKey = library.functionalLoop(given, remove, postremove);
var answer = Object.keys(answerKey).length;
var end = new Date();
console.log('Given:', given);
console.log('Remove:', remove);
console.log('Then Remove:', postremove);

if(answer===ans) {
	console.log('Step 2A Passed');
}
else {
	console.log('Step 2A Failed');
}
console.log('Execution Time: ' + (end-start)/1000 + 's')

//Step 2B
console.log('Testing Step 2B');
var given = "-_****_*___***_-_*-_*-*___*--_*-_*-*_***___***_*-_--*_*-";
var remove = "-*--_---_-**_*-";
var postremove = "*-**_*_**_*-";
var ans = 11474;
var start = new Date();
var answerKey = library.functionalLoop(given, remove, postremove);
var answer = Object.keys(answerKey).length;
var end = new Date();
console.log('Given:', given);
console.log('Remove:', remove);
console.log('Then Remove:', postremove);

if(answer===ans) {
	console.log('Step 2B Passed');
}
else {
	console.log('Step 2B Failed');
}
console.log('Execution Time: ' + (end-start)/1000 + 's')