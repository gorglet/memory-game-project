// Create a list of all the cards
var cardList = ["fa fa-diamond", "fa fa-paper-plane", "fa fa-anchor","fa fa-bolt",
"fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
"fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane", "fa fa-cube"];

// append deck with double of each card


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



//array to store cards that have been matched
var matchedCards = [];

/*
function checkMatch(openedCards){
  if (openedCards.length === 2){
    if (openedCards[0] === openedCards[1]){
      console.log("True");
      matchedCards.push(???);
      //how can I add these cards though?

      //need to change class so that cards stay flipped...
      //so need to grab the element and toggle class disabled?
    }
  }
}

checkMatch();

*/


function openCards(){
  //event listener which flips cards when they are clicked
  $(".card").on("click", function(){
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
    //store cards in a temporary array
    openedCards.push($(".card"));
  })
}

openCards();

//temporary array in which to store cards which have been clicked, in order to check if there's a match
var openedCards = [];
console.log(openedCards);



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
