/* Create a list of all the cards */

var cardList = $(".card");

// append deck with double of each card
for(let i of cardList){
  console.log(i);
  $('deck').append(i)
}

console.log(cardList);

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

let displayCard = function() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
};

//new variable to store array of shuffled cards
var shuffledCards = shuffle(cardList);
for (let i = 0; i < shuffledCards.length; i++) {
  card = shuffledCards[i];
  $(card).on('click', displayCard);
}



/*
for (let i = 0; i < shuffledCards.length; i++) {
  card = shuffledCards[i];
  $(card).on('click', displayCard);
}
*/

/*NOW I NEED TO GET THE GAME TO START WITH SHUFFLEDCARDS*/



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
