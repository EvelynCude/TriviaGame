//-------------Load page----------------//
$(".time").hide();

//-------Start button click function----//
$("button").click(function(){
	$("button").hide();
	$(".time").show();
	loadQuestion();
})

//-----Trivia questions object array----//
var triviaQuestions =[{
	question: "What flavor does not come in a pack of Skittles Original?",
	choices: ["Orange", "Strawberry", "Cherry"],
	answer: "Cherry"
},	{
	question: "Life Savers were the first candy to be wrapped in what?",
	choices: ["Wax Paper","Tinfoil","Cellophane"],
	answer: "Tinfoil"
},	{
	question: 'What color is the "Ex" in the FedEx Office logo?',
	choices: ["Blue","Green","Red"],
	answer: "Blue"
},	{
	question: "By volume, what percentage of a box of Lucky Charms are marshmallow charms?",
	choices: ["10%","25%","50%"],
	answer: "25%"
},	{
	question: "How many sugar-free mints are sold in a package of Altoids Smalls?",
	choices: ["30","40","50"],
	answer: "50"
},	{
	question: "How many feet of fun come in a package of Hubba Bubba Bubble Tape?",
	choices: ["2 feet","4 feet","6 feet"],
	answer: "6 feet"
},	{
	question: "How long does it take the sun to turn ripe grapes into Sun-Maid raisins?",
	choices: ["1 week","3 weeks","5 weeks"],
	answer: "3 weeks"
},	{
	question: "In what year did the Morton Salt Girl and slogan debut on packages and ads?",
	choices: ["1914","1964","1984"],
	answer: "1914"
},	{
	question: "The website Zillow.com lists prices and details about what?",
	choices: ["Collectibles","Bedding","Real estate"],
	answer: "Real estate"
},	{
	question: "In what year was the first Ford Mustang introduced?",
	choices: ["1964","1967","1970"],
	answer: "1964"
}
];

//------------Game Variables------------//
var questionIndex = 0;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var number = 11;
var intervalId;
var userGuess;

//---------Load Question function to set count down-------//
function loadQuestion(){
	clearInterval(intervalId);
	intervalId = setInterval(decrement, 1000);
}

//-------------------Countdown begin---------------------//
function decrement(){
	number --;
	//----------Display on DOM-----------//
	$("#correctAnswer").text("");
	$("#answersBox").show();
	$("#timeRemaining").text(number);
	$("#triviaQuestion").text(triviaQuestions[questionIndex].question);
	$("#answer-one").text(triviaQuestions[questionIndex].choices[0]);
	$("#answer-two").text(triviaQuestions[questionIndex].choices[1]);
	$("#answer-three").text(triviaQuestions[questionIndex].choices[2]);
	//-----console log answer to test---//
	console.log(triviaQuestions[questionIndex].answer);
	//---Run timeUp function when countdown reaches 0---//
	if (number === 0){
		timeUp();
	}
}
//-------timeUp function when countdwon reaches 0-------//
function timeUp(){
	clearInterval(intervalId);
	//------Display result on DOM------//
	$("#answersBox").hide();
	$("#triviaQuestion").text("Out of Time!");
	$("#correctAnswer").text("The correct answer is:  " + triviaQuestions[questionIndex].answer);
	number = 11; //reset countdown number
	questionIndex ++; //set next question index
	numUnanswered ++; //increase unanswered number by 1
	//--Run end game function if reached last question--//
	if (questionIndex === 10){
	setTimeout(endGame, 3000);
	}
	//--Load another question if last question has not been reached--//
	else {
	setTimeout(loadQuestion, 3000);
	}
}
//--------------On click of an answer choice--------------//
$(".answerChoice").click(function(){
	userGuess = $(this).text(); //get html text of the user's clicked choice
	checkAnswer(); //check if answer was correct by running the checkAnswer function
	})
//-----check if user's clicked choice matches answer------//
//--Run right answer function if user chose right answer--//
//--Run wrong answer function if user chose wrong answer--//
function checkAnswer(){
	clearInterval(intervalId);
	if (userGuess === triviaQuestions[questionIndex].answer){
		rightAnswer();
	}
	else if (userGuess != triviaQuestions[questionIndex].answer){
		wrongAnswer();
	}	
}
//---Display correct answer, reset counter, and increase number incorrect--//
function wrongAnswer(){
	clearInterval(intervalId);
	$("#answersBox").hide();
	$("#triviaQuestion").text("Nope!");
	$("#correctAnswer").text("The correct answer is:  " + triviaQuestions[questionIndex].answer);
	number = 11;
	questionIndex ++;
	numIncorrect ++;
	//--Run end game function if reached last question--//
	if (questionIndex === 10){
	setTimeout(endGame, 3000);
	}
	//--Load another question if last question has not been reached--//
	else {
	setTimeout(loadQuestion, 3000);
	}

}
//--Display "correct" message, reset counter, and increase number correct--//
function rightAnswer(){
	clearInterval(intervalId);
	$("#answersBox").hide();
	$("#triviaQuestion").text("Correct!");
	number = 11;
	questionIndex ++;
	numCorrect ++;
	//--Run end game function if reached last question--//
	if (questionIndex === 10){
	setTimeout(endGame, 3000);
	}
	//--Load another question if last question has not been reached--//
	else {
	setTimeout(loadQuestion, 3000);
	}

}
//--Display trivia totals, reset game variables, and display restart button--//
function endGame(){
	$("#correctAnswer").text("");
	$("#answersBox").show();
	$("#triviaQuestion").text("All done, here's how you did:");
	$("#answer-one").text("Correct Answers: " + numCorrect);
	$("#answer-two").text("Incorrect Answers: " + numIncorrect);
	$("#answer-three").text("Unanswered: " + numUnanswered);
	$("button").text("Start Over?");
	$("button").show();
	questionIndex = 0;
	numCorrect = 0;
	numIncorrect = 0;
	numUnanswered = 0;
}