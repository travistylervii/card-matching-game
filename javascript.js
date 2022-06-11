//Add pairs matched
//Add total Moves
//Add End game button
//Add reset game button

let cards = ["🎉", "🍕", "🦄", "🐶", "🍻", "🔥", "🦊", "🤑", "🍔", "🌮"];
let cardsPaired = [];
let totalMoves = 0;
let matchingPairMoves = 0;
let nameMatch = [];
let flipCount = 0;
let matchingCards = [];
let j = 0;

//Creating board cards divs

//Define gameboard
const boardDiv = document.querySelector("#game-board");

function gameReset() {
  cardsPaired = [];
  flipCount = 0;
  nameMatch = [];
  totalMoves = 0;
  matchingPairMoves = 0;
  nameMatch = [];
  flipCount = 0;
  matchingCards = [];
  j = 0;
  document.getElementById("game-board").innerHTML = "";
}

function gameDifficulty(difficulty) {
  console.log("gameDifficulty");
  if (difficulty === "easy") {
    console.log("gameDifficulty - Easy");
    cards = ["🎉", "🍕", "🦄", "🐶"];
  } else if (difficulty === "medium") {
    cards = ["🎉", "🍕", "🦄", "🐶", "🍔", "🌮"];
  } else {
    cards = ["🎉", "🍕", "🦄", "🐶", "🍻", "🔥", "🦊", "🤑", "🍔", "🌮"];
  }
}

function main() {
  //Create card pairs array
  for (let i = 0; i < cards.length * 2; i++) {
    if (j >= cards.length) j = 0;
    cardsPaired.push(cards[j]);
    j++;
  }

  //Randomize cards
  cardsPaired.sort(() => 0.5 - Math.random());

  //Create cards
  for (let i = 0; i < cardsPaired.length; i++) {
    const flipCard = document.createElement("div");
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardBack = document.createElement("div");

    flipCard.classList.add("flip-card");
    flipCardInner.classList.add("flip-card-inner");
    flipCardFront.classList.add("flip-card-front");
    flipCardBack.classList.add("flip-card-back");

    boardDiv.appendChild(flipCard);
    flipCard.appendChild(flipCardInner);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCardBack.textContent = cardsPaired[i];
  }

  document.querySelectorAll(".flip-card-inner").forEach((flipCard) => {
    flipCard.addEventListener("click", () => {
      //Flip card on card click
      flipCard.classList.add("flip-card-flip", "disable-click");

      //Add card name to array to compare matching cards with conditional later.
      nameMatch.push(flipCard.textContent);

      //Count each time the cards are clicked/flipped
      flipCount++;

      //Match the card values if two are flipped
      if (flipCount >= 2) {
        //Add to totalMoves count
        const totalMovesScore = document.querySelector(".total-moves");
        totalMoves++;
        totalMovesScore.textContent = totalMoves;

        //disable clicks after 2 cards have been flipped
        document.querySelectorAll(".flip-card-inner").forEach((flipCard) => {
          flipCard.classList.add("disable-click");
        });

        //If cards flipped do match
        if (nameMatch[0] === nameMatch[1]) {
          //Add card value to matching cards array
          matchingCards.push(flipCard.textContent);

          //Enable clicking again, except for matching cards
          document.querySelectorAll(".flip-card-inner").forEach((flipCard) => {
            if (!matchingCards.includes(flipCard.textContent))
              flipCard.classList.remove("disable-click");
          });

          matchingPairMoves++;
          console.log(matchingPairMoves);

          const matchinPairsScore = document.querySelector(
            ".matching-pairs-score"
          );
          matchinPairsScore.textContent = matchingPairMoves;

          //Else they don't match
        } else {
          //Delay flip back
          window.setTimeout(function () {
            //Skip every card thats already matched (on matchingCard Array)
            document
              .querySelectorAll(".flip-card-inner")
              .forEach((flipCard) => {
                //IF name is in matchingCards, don't not flip back
                if (!matchingCards.includes(flipCard.textContent))
                  flipCard.classList.remove("flip-card-flip", "disable-click");
              });
          }, 1000);
        }
        //Reset variables / clear array
        flipCount = 0;
        nameMatch = [];
      }
    });
  });
}
//Change card array based on difficulty
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    gameReset();
    gameDifficulty(button.className);
    main();
  });
});
main();
