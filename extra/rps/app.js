////@ts-check

// 1. player picks a weapon
// 2. Computer pick random weapon
// 3. Determine winner
// 4. Display
// 5. Play again / keep playing

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

let tieCount = 0;
let winCount = 0;
let lossCount = 0;

/** @type { HTMLElement } */
//@ts-ignore checking for null below
let aftermathElement = document.getElementById("aftermath");
if (aftermathElement == null) {
	throw "aftermath is not defined! Check your HTML!!";
}
/** @type { HTMLElement } */
//@ts-ignore checking for null below
let lossesElement = document.getElementById("losses");
if (lossesElement == null) {
	throw "losses is not defined! Check your HTML!!";
}

/** @type { HTMLElement } */
//@ts-ignore checking for null below
let tiesElement = document.getElementById("ties");
if (tiesElement == null) {
	throw "ties is not defined! Check your HTML!!";
}

/** @type { HTMLElement } */
//@ts-ignore checking for null below
let winsElement = document.getElementById("wins");
if (winsElement == null) {
	throw "wins is not defined! Check your HTML!!";
}

const pickWeapon = function (weapon) {
	let aftermathText = `Player picked ${weapon}. `;
	console.log("Player picked", weapon);

	// get a random computer weapon and assign
	// it the the computerWeapon variable
	let computerWeapon = selectComputerWeapon();
	console.log("Computer picked", computerWeapon);
	aftermathText = aftermathText + `Computer picked ${computerWeapon}. `;

	// get results object from decideResults function
	let results = decideResults(weapon, computerWeapon);
	console.log("Battle results", results);

	let winner = "";
	if (results.isTie) {
		tieCount = tieCount + 1;
		winner = results.description;
	} else if (results.playerWon) {
		winCount += 1;
		winner = "";
	} else {
		lossCount++;
		winner = "";
	}



	aftermathElement.textContent = aftermathText;

	winsElement.textContent = `Wins: ${winCount}`;
	
	tiesElement.textContent = `ties: ${tieCount}`;
	
	lossesElement.textContent = `losses: ${lossCount}`;

};

const selectComputerWeapon = function () {
	// this will give us a random number
	// between 0 and 3
	const rand = Math.floor(Math.random() * 3);

	if (rand == 0) {
		return ROCK;
	}

	if (rand == 1) {
		return PAPER;
	}

	if (rand == 2) {
		return SCISSORS;
	}

	// don't know what random number is choosing!
	throw "Unknown weapon";
};

function decideResults(player, computer) {
	// create a result object to hold the
	// default state of the outcome of the
	// battle
	let result = {
		isTie: false,
		playerWon: false,
		description: "",
	};

	// this is for a tie
	if (player == computer) {
		result.isTie = true;
		result.description = "It's a tie!";
		// return the tie result
		return result;
	}

	// rock beats scissors
	if (player == ROCK && computer == SCISSORS) {
		result.playerWon = true;
		result.description = "rock crushes scissors";
		return result;
	}

	// paper beats rock
	if (player == PAPER && computer == ROCK) {
		result.playerWon = true;
		result.description = "paper covers rock";
		return result;
	}

	// scissors beats paper
	if (player == SCISSORS && computer == PAPER) {
		result.playerWon = true;
		result.description = "scissors cuts paper";
		return result;
	}

	// computer wins
	// rock beats scissors
	if (computer == ROCK && player == SCISSORS) {
		result.description = "rock crushes scissors";
		return result;
	}

	// paper beats rock
	if (computer == PAPER && player == ROCK) {
		result.description = "paper covers rock";
		return result;
	}

	// scissors beats paper
	if (computer == SCISSORS && player == PAPER) {
		result.description = "scissors cuts paper";
		return result;
	}

	result.description = "Don't know what happened!";
	return result;
}
