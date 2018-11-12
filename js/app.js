// Create a list of all the cards
var cardList = ["fa fa-diamond", "fa fa-paper-plane", "fa fa-anchor","fa fa-bolt",
"fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
"fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane", "fa fa-cube"];


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
    clickedCards = [];
    count = 0;
  }
}


function closeCard(){
    $(".open").toggleClass("nomatch");
    $(".open").toggleClass("show open");
  }


function incrementMoves(){
  moves++;
  const movesText = document.querySelector(".moves");
  movesText.innerHTML = (moves + " moves");
  //$(".modal_moves").html("Moves made = " + moves);
}


function rateScore(){
  if (moves === 12 || moves === 15 || moves === 18 || moves === 20){
    loseStar();
  }
}


function loseStar(){
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


function startTimer(){
  timerId = setInterval(() => {
    time++;
    displayTimer();
  }, 1000);
}


function displayTimer(){
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
  if (seconds < 10){
    const timer = document.querySelector("#seconds");
    $("#seconds").prepend('0');
  }
  return time;
}


function stopTimer(){
  clearInterval(timerId);
}


function endGame(){
    stopTimer();
    sendModalStats();
    showModal();
}


function startGame(){
  //new variable to hold the newly shuffled list of cards
  const shuffledCards = shuffle(cardList);
  //grab the child element of .card so that we only grab the elements inside the 'li' elements
  var card = $('.card').children();
  //for loop to change className of each card to that of shuffledCards
  for (let i = 0; i < shuffledCards.length; i++) {
    card[i].className = shuffledCards[i];
  }
}

function sendModalStats(){
  const clockTime = document.querySelector('.timer').innerHTML;
  const stars = starCount;
  $(".modal_time").html("Time taken = " + clockTime);
  $(".modal_moves").html("Moves made = " + moves);
  $(".modal_stars").html("Star rating = " + stars + "*");
}

function showModal(){
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

function reset(){
    resetTimer();
    resetMoves();
    resetStars();
    resetCards();
    startGame();
}

function resetTimer(){
  stopTimer();
  timerOff = true;
  time = 0;
  document.querySelector("#minutes").innerHTML = "0";
  displayTimer();
}

function resetMoves(){
  //reset move count to 0
  moves = 0;
  //change the html to the move count
  document.querySelector('.moves').innerHTML = moves + " moves";
}

function resetStars(){
  //reset star count to 5
  starCount = 5;
  const starList = document.querySelectorAll('.stars li');
  //get all stars to display again
  for (star of starList){
    star.style.display = 'inline';
  }
}

function resetCards(){
  const cards = document.querySelectorAll('.match');
  for (let card of cards){
    card.className = 'card';
  }
}

document.querySelector('.close_button').addEventListener('click', () => {
  showModal();
});

document.querySelector('.restart_button').addEventListener('click', () => {
  reset();
  showModal();
});

document.querySelector('.mini_restart_button').addEventListener('click', reset);

openCards();
startGame();
