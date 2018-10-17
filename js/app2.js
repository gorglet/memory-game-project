
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


//temporary array in which to store cards which have been clicked
var clickedCards = [];


function openCards(){
  //event listener which flips cards when they are clicked
    $(".card").on("click", function(click){
      //add the following classes to the card when clicked
       this.classList.toggle('open');
       this.classList.toggle('show');
       this.classList.toggle('disabled');
      //add card to clickedCards array when clicked
      clickedCards.push($(this));
    })
  }


/*function checkMatch(array){
  //check length of array
  if (array.length === 2){
    //determines if the 2 cards in the clickedCards array are a match
    if (array[0].children()[0].className === array[1].children()[1].className){
      //adds class 'match' to cards
      array[0].addClass("match");
      array[1].addClass("match");
      console.log("Yes!");
      array = [];
    } else {
      console.log("nope!");
      array = [];
    }
  }
}*/





//probably need to put this inside a loop of some sort inside a startgame function, so
//that it keeps checking for matches
//checkMatch(clickedCards);



openCards();



function reset(){

  //new variable to hold the newly shuffled list of cards
  const shuffledCards = shuffle(cardList);
  //grab the child element of .card so that we only grab the elements inside the 'li' elements
  var card = $('.card').children();
  //for loop to change className of each card to that of shuffledCards
  for (let i = 0; i < shuffledCards.length; i++) {
    card[i].className = shuffledCards[i];
  }
}

reset();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
