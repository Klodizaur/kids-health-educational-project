/* Global letiables */

/* List of food items */
let foodItems = [
  "&#127822;", //Apple
  "&#127822;", //Apple
  "&#127819;", //Lemon
  "&#127819;", //Lemon
  "&#127828;", //Hamburger
  "&#127828;", //Hamburger
  "&#129473;", //Cupcake
  "&#129473;", //Cupcake
  "&#129361;", //Avocado
  "&#129361;", //Avocado
  "&#127853;", //Candy
  "&#127853;", //Candy
  "&#129367;", //Salad
  "&#129367;", //Salad
  "&#127829;", //Pizza
  "&#127829;", //Pizza
];

let score = 0;
let flippedCards = [];
let matchedCards = [];
let locked = false;
let flipTimeout = 1000;

/* Randomize cards */
function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function getRandomFace(randomIndex) {
  let face;
  randomIndex = getRandomIndex(foodItems.length);
  face = foodItems[randomIndex];
  foodItems.splice(randomIndex, 1);
  return face;
}

/* Assign items to cards */
function assignCardFaces($cardFaces) {
  for (let i = 0; i < 16; i++) {
    $($cardFaces[i]).html("<h2>" + getRandomFace() + "</h2>");
  }
  foodItems = [
    "&#127822;", //Apple
    "&#127822;", //Apple
    "&#127819;", //Lemon
    "&#127819;", //Lemon
    "&#127828;", //Hamburger
    "&#127828;", //Hamburger
    "&#129473;", //Cupcake
    "&#129473;", //Cupcake
    "&#129361;", //Avocado
    "&#129361;", //Avocado
    "&#127853;", //Candy
    "&#127853;", //Candy
    "&#129367;", //Salad
    "&#129367;", //Salad
    "&#127829;", //Pizza
    "&#127829;", //Pizza
  ];
}

/* Card flipping functions */
function isNotFlipped($card) {
  return !$card.hasClass("flipped");
}

function areMatching(flippedCards) {
  return (flippedCards[0].html() === flippedCards[1].html());
}

function hideCards(flippedCards) {
  setTimeout(function() {
    $(flippedCards[0]).removeClass("flipped");
    $(flippedCards[1]).removeClass("flipped");
    locked = false;
  }, flipTimeout);
}

/* Score board functions */
function hideScoreBoard($scoreBoard) {
  $scoreBoard.addClass("hidden");
}

function renderWinScreen($winScreen) {
  setTimeout(function() {
    $winScreen.addClass("visible");
  }, 400);
}

/* Reset after game */
function reset($cardFaces, $gameClicks, $gameCardElements, $winScreen, $scoreBoard) {
  assignCardFaces($cardFaces);
  matchedCards = [];
  score = 0;
  $gameClicks.text("Total Clicks: " + score);
  $winScreen.removeClass("visible");
  $scoreBoard.removeClass("hidden");
  $gameCardElements.removeClass("flipped");
}

/* jQuery code */
$(document).ready(function(){
  let $gameContainer = $("#game-container");
  let $gameCardElements = $(".game-card");
  let $cardFaces = $(".game-card .back");
  let $scoreBoard = $("#score-board");
  let $gameClicks = $(".click-count");
  let $winScreen = $("#win-screen");
  let $replay = $("#replay-button");

  assignCardFaces($cardFaces);

  $gameContainer.on("click", ".front, .front h2", function(event) {
    if(event.target != this || locked){ 
        return true; 
    }

  let $card = $(event.target).closest(".game-card");

  /* Add class to card */
  if (isNotFlipped($card)) {
    $card.addClass("flipped");
    flippedCards.push($card);
    score++;
    $gameClicks.text("Total Clicks: " + score);
  }

  /* Lock matching cards and leave them visible */
  if (flippedCards.length === 2) {
    if (areMatching(flippedCards)) {
      matchedCards.push(flippedCards[0], flippedCards[1]);
    } else {
      locked = true;
      hideCards(flippedCards);
    }
    flippedCards = [];
  }

  if(matchedCards.length === $gameCardElements.length) {
    hideScoreBoard($scoreBoard);
    renderWinScreen($winScreen);
  }
});

  /* Replay button reset game */
  $replay.on("click", function() {
    reset($cardFaces, $gameClicks, $gameCardElements, $winScreen, $scoreBoard);
  });

})