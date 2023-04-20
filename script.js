var cardValues = [
  "🤣",
  "🤣",
  "🙃",
  "🙃",
  "😇",
  "😇",
  "😇",
  "😇",
  "😘",
  "😘",
  "😋",
  "😋",
  "🤑",
  "🤑",
  "🤭",
  "🤭",
  "🤐",
  "🤐",
  "😒",
  "😒",
];
var cardsFlipped = 0;
var firstCard = null;
var secondCard = null;

shuffleArray(cardValues);

var gameContainer = document.querySelector(".grid-container");
for (var i = 0; i < cardValues.length; i++) {
  var card = document.createElement("div");
  card.className = "card";
  card.dataset.value = cardValues[i];
  card.addEventListener("click", flipCard);
  gameContainer.appendChild(card);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function flipCard() {
  if (this.classList.contains("flipped")) {
    return;
  }
  if (cardsFlipped === 0) {
    this.classList.add("flipped");
    firstCard = this;
    cardsFlipped = 1;
    this.innerHTML = this.dataset.value;
  } else {
    this.classList.add("flipped");
    secondCard = this;
    cardsFlipped = 2;
    this.innerHTML = this.dataset.value;
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add("gotIt");
    secondCard.classList.add("gotIt");
    resetCards();
  } else {
    setTimeout(resetCards, 1000);
  }
}

function resetCards() {
  firstCard.classList.remove("flipped");
  secondCard.classList.remove("flipped");
  firstCard.innerHTML = null;
  secondCard.innerHTML = null;
  firstCard = null;
  secondCard = null;
  cardsFlipped = 0;
}

function resetGame() {
  var cards = document.querySelectorAll(".card");
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("flipped");
    cards[i].addEventListener("click", flipCard);
  }
  shuffleArray(cardValues);
  for (var i = 0; i < cards.length; i++) {
    cards[i].dataset.value = cardValues[i];
  }
}
