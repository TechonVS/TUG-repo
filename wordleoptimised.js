function readFile(filePath) {
	var request = new XMLHttpRequest();
	request.overrideMimeType("text/plain");
	request.open('GET', filePath, false);
	request.send();
	if (request.status === 200) {
		return request.responseText;
	}
	return null;
}
const filePath = "data.json";
const jsonData = readFile(filePath);
const data = JSON.parse(jsonData);
const dictionary = data.words
const solutions = data.solutions
var board,currentRow,currentColumn,randomWord,score,didWin,allowInput;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

//I provide how code works in the pseudo.txt file;
function startGame(){
	allowInput = true;
	currentRow = 1;
	currentColumn = 1;
	randomWord = solutions[Math.floor(Math.random() * solutions.length)];
	board = [["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"]];
	rightSpotCounter = 0;
	foundInWordCounter = 0;
	document.getElementById("keyboard").style.display = "block";
	for (let letter = 0;letter < alphabet.length;letter++)document.getElementById(alphabet.charAt(letter)+"Button").style.backgroundColor = "rgb(60,60,60)";
;	for (let row = 1;row < 7;row++){
		for (let column = 1;column < 6;column++){
			const box = document.getElementById("charBox"+row+""+column);
			box.style.backgroundColor = "rgb(255,255,255)";
			box.style.color = "rgb(0,0,0)";
			box.innerHTML = "?";
		}
	}
	document.getElementById("mainView").hidden = false;
	document.getElementById("scoreView").hidden = true;
}
function addChar(char){
	if (allowInput){
		document.getElementById("charBox" + currentRow + "" + currentColumn + "").innerHTML = char;
		board[currentRow-1][currentColumn-1] = char;
		if (currentColumn != 5)currentColumn++;
	}
}
function submitWord(){
	typedWord = board[currentRow-1].join("");

	if (!(board[currentRow-1].includes("?"))){
		if(dictionary.includes(typedWord)){
		for (let column = 0;column < 5;column++){
			var button = document.getElementById(board[currentRow-1][column]+"Button");
			document.getElementById("charBox" + currentRow + "" + (column+1)).style.color = "white";
			if (board[currentRow-1][column] == randomWord[column]){
				document.getElementById("charBox" + currentRow + "" + (column+1)).style.backgroundColor = "green";
				button.style.backgroundColor = "green";


			}
			else if (randomWord.includes(board[currentRow-1][column])){
				document.getElementById("charBox" + currentRow + "" + (column+1)).style.backgroundColor = "yellow";
				if (button.style.backgroundColor != "green")button.style.backgroundColor = "yellow";

			}
			else{
				document.getElementById("charBox" + currentRow + "" + (column+1)).style.backgroundColor = "rgb(50,50,50)";
				if (button.style.backgroundColor != "green" && button.style.backgroundColor != "yellow")button.style.backgroundColor = "gray";
			}
		}
		checkWin();
		}
		else{
			alert("Word not contained in dictionary")
		}
	}

	else{
		alert('Fill In all Boxes');
	}
}
function checkWin(){
	typedWord = board[currentRow-1].join("");
	if (typedWord == randomWord){
		didWin = true;
		endGame();
	}
	else{
		if (currentRow == 6){
			endGame();
			didWin = false;
		}
		else{
			currentRow++;
			currentColumn = 1;
		}
	}
	return didWin;
}
function delChar(){
	if(allowInput){
		if (board[currentRow-1][0] == "?")null;
		else if (board[currentRow-1][1] == "?"){
			currentColumn = 1;
			document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
			board[currentRow-1][0] = "?";
		}
		else if (board[currentRow-1][2] == "?"){
			currentColumn = 2;
			document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
			board[currentRow-1][1] = "?";
		}
		else if (board[currentRow-1][3] == "?"){
			currentColumn = 3;
			document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
			board[currentRow-1][2] = "?";
		}
		else if (board[currentRow-1][4] == "?"){
			currentColumn = 4;
			document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
			board[currentRow-1][3] = "?";
		}
		else{
			currentColumn = 5;
			document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
			board[currentRow-1][4] = "?";
		}
	}
}
function clearRow(){
	if(allowInput){
		for (let column = 0;column < 5;column++){
			document.getElementById("charBox" + currentRow + "" + (column+1)).innerHTML = "?";
			board[currentRow-1][column] = "?";
		}
		currentColumn = 1;
	}
}
function endGame(){
	allowInput = false;
	score = 7 - currentRow;
	let greetings,greeting,status,summary;
	if (!(didWin)){
		greetings = ["Too Bad!","Ah Shucks!"];
		greeting = greetings[Math.floor(Math.random() * greetings.length)];
		status = "You Lost";
		summary  = "You Where unable to guess the word " + randomWord + " and got a score of  " + score;
	}
	else if(didWin){
		greetings = ["Congrats!","Good Job!"];
		greeting = greetings[Math.floor(Math.random() * greetings.length)];
		status = "You Won";
		summary = "You guessed the word " + randomWord + " in " + currentRow + " tries with a score of  " + score;
	}
	document.getElementById("mainView").hidden = true;
	document.getElementById("scoreView").hidden = false;
	document.getElementById("scoreViewHeader").innerHTML = greeting + " " + status;
	document.getElementById("scoreViewScore").innerHTML = "Your score is:  " + score;
	document.getElementById("scoreViewSummary").innerHTML = summary;
}
document.addEventListener("keypress",function(event){
	if (alphabet.includes(event.key.toLowerCase()))addChar(event.key.toLowerCase());
	if (event.key == "Enter")submitWord();
	if (event.key == "-")delChar();
	if (event.key == "_")clearRow();
})
startGame();
if (window.innerHeight > window.innerWidth){
	//using to change keyboard size 
}
