// Create a list of all the cards
var cardList = ["fa fa-diamond", "fa fa-paper-plane", "fa fa-anchor","fa fa-bolt",
"fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",];

var duplicatedCardList = cardList.concat(cardList);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Global variables
//temporary array in which to store cards which have been clicked
var clickedCards = [];
//array to store all cards that have been matched
var matchedCards = [];

let count = 0;
let moves = 0;
let time = 0;
let starCount = 5;
let timerOff = true;
let timerId;

function openCards(){
//event listener which flips cards when they are clicked
  $(".card").on("click", function(click){
    //changes the value of timerOff to false
    if (timerOff){
      startTimer();
      timerOff = false;
    }
    //add the following classes to the card when clicked
    this.classList.add('open','show');
    //add the card to the temporary array
    clickedCards.push(this);
    count = count + 1;
    if(count === 2){
      //create variables so we can check for a match
      let match1 = clickedCards[0].children[0].className;
      let match2 = clickedCards[1].children[0].className;
      //call the checkMatch function
      checkMatch(match1, match2);
      incrementMoves();
      rateScore();
    }
  })
}

function checkMatch(match1,match2){
  //checks the 2 cards in the temporary clickedCards array to see if they are a match
  if(match1 === match2){
    //adds class match to the cards to keep them open
    $(".open").addClass("match");
    $(".open").toggleClass("show open");
    matchedCards.push(this);
    //empty the temporary array and reset count to 0
    clickedCards = [];
    count = 0;
    //if all cards are matched, call endGame function
    if (matchedCards.length === 8){
      stopTimer();
      setTimeout(endGame, 500);
    }
  } else {
    $(".open").toggleClass("nomatch");
    //call function closeCard
    setTimeout(closeCard, 500);
    //empty clickedCards array
    clickedCards = [];
    count = 0;
  }
}


function closeCard(){
  //change the class of all open cards to show them as closed
    $(".open").toggleClass("nomatch");
    $(".open").toggleClass("show open");
  }


function incrementMoves(){
  moves++;
  const movesText = document.querySelector(".moves");
  movesText.innerHTML = (moves + " moves");
}


function rateScore(){
  //set points at which to call the loseStar function
  if (moves === 12 || moves === 15 || moves === 18 || moves === 20){
    loseStar();
  }
}


function loseStar(){
  //function to hide one star each time the moves count reaches a number in the rateScore function
  const stars = document.querySelectorAll(".stars li");
  for (star of stars){
    if (star.style.display !== 'none'){
      star.style.display = 'none';
      starCount --;
      return starCount;
      break;
    }
  }
}

//from startClock function on https://matthewcranford.com/memory-game-walkthrough-part-6-the-clock/
function startTimer(){
  //start and display a timer by calling the displayTimer function
  timerId = setInterval(() => {
    time++;
    displayTimer();
  }, 1000);
}


function displayTimer(){
  //function to change the innerHTML so that the time is displayed
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (time < 60){
    const timer = document.querySelector("#seconds");
    timer.innerHTML = time;
  } else if (time === 60){
    const minutes = document.querySelector("#minutes");
    minutes.innerHTML++;
    time = 0;
    const timer = document.querySelector("#seconds");
    timer.innerHTML = time;
    }
  //add a '0' when the seconds are under 10, eg. 01,02,03 etc
  if (seconds < 10){
    const timer = document.querySelector("#seconds");
    $("#seconds").prepend('0');
  }
  return time;
}

//funtcion stopTimer from https://matthewcranford.com/memory-game-walkthrough-part-6-the-clock/
function stopTimer(){
  clearInterval(timerId);
}


function endGame(){
  //function to end the timer and call other functions to show it's the end of the game
    stopTimer();
    sendModalStats();
    showModal();
}


function startGame(){
  //new variable to hold the newly shuffled list of cards
  const shuffledCards = shuffle(duplicatedCardList);
  //grab the child element of .card so that we only grab the elements inside the 'li' elements
  var card = $('.card').children();
  //for loop to change className of each card to that of shuffledCards
  for (let i = 0; i < shuffledCards.length; i++) {
    card[i].className = shuffledCards[i];
  }
}

//function adapted from writeModalStats function on https://matthewcranford.com/memory-game-walkthrough-part-7-making-a-modal/
function sendModalStats(){
//sends all the necessary info to the pop-up and changes the html to display the info
  const clockTime = document.querySelector('.timer').innerHTML;
  const stars = starCount;
  $(".modal_time").html("Time taken = " + clockTime);
  $(".modal_moves").html("Moves made = " + moves);
  $(".modal_stars").html("Star rating = " + stars + "*");
}


//function from https://matthewcranford.com/memory-game-walkthrough-part-7-making-a-modal/
function showModal(){
  //show the pop-up
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

function reset(){
  //resets the game by calling the below functions to reset everything!
    resetTimer();
    resetMoves();
    resetStars();
    resetCards();
    //empty the matchedCards array
    matchedCards = [];
    startGame();
}

//resetTimer function adapted from https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
function resetTimer(){
  stopTimer();
  timerOff = true;
  time = 0;
  document.querySelector("#minutes").innerHTML = "0";
  displayTimer();
}

//resetMoves function from https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
function resetMoves(){
  //reset move count to 0
  moves = 0;
  //change the html to the move count
  document.querySelector('.moves').innerHTML = moves + " moves";
}


//resetStars function from https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
function resetStars(){
  //reset star count to 5
  starCount = 5;
  const starList = document.querySelectorAll('.stars li');
  //get all stars to display again
  for (star of starList){
    star.style.display = 'inline';
  }
}

//resetCards function (adapted) from https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
function resetCards(){
  //reset all the cards back to how they were at the start of the game
  const cards = document.querySelectorAll('.match');
  for (let card of cards){
    card.className = 'card';
  }
}

//below three handlers from https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
//code to make the close button functional
document.querySelector('.close_button').addEventListener('click', () => {
  //calls the showModal function, which toggles the modal between being shown and being hidden
  showModal();
});

//code to make the restart button functional
document.querySelector('.restart_button').addEventListener('click', () => {
  reset();
  showModal();
});

//code to make the mini restart button functional
document.querySelector('.mini_restart_button').addEventListener('click', reset);

openCards();
startGame();
