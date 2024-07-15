// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   userInput = input.question("Enter a word to score: ");
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
   return word.length;
};

let vowelBonusScorer = function (word) {
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   let score = 0;
   word = word.toLowerCase();
   for (let letter of word) {
      if (vowels.includes(letter)) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer = function (word) {
   let score = 0;
   word = word.toLowerCase();
   for (let letter of word) {
      score += newPointStructure[letter] || 0;
   }
   return score;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?\n');
   console.log('0 - Simple: ' + scoringAlgorithms[0].description);
   console.log('1 - ' + scoringAlgorithms[1].name + ': ' + scoringAlgorithms[1].description);
   console.log('2 - ' + scoringAlgorithms[2].name + ': ' + scoringAlgorithms[2].description);
   userNum = input.question('Enter 0, 1, or 2: ');
   if (userNum >= 0 && userNum < scoringAlgorithms.length) {
      return scoringAlgorithms[userNum];
   }
   while (isNaN(userNum) || userNum < 0 || userNum > 2 ) {
      userNum = input.question('Please enter 0, 1, or 2: '); //loops until the user enters 0, 1, or 2
   }
   return scoringAlgorithms[userNum];
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let key in oldPointStructure) {
      let letters = oldPointStructure[key];
      for (let letter of letters) {
         newPointStructure[letter.toLowerCase()] = parseInt(key);
      }
   }
   return newPointStructure;
};

function runProgram() {
   initialPrompt();
   scorerPrompt();
   console.log(`Score for '${userInput}':`, scoringAlgorithms[userNum].scorerFunction(userInput));
   //console.log(oldScrabbleScorer(userInput));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
