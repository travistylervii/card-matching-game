const cards = ["🎉", "🍕", "🦄", "🐶", "🍻", "🔥", "🦊", "🤑"];
const cardsPaired = [];

//Find container for cards
const boardDiv = document.querySelector("#container");

//Initialize variables
let nameMatch = [];
let flipCount = 0;
let matchingCards = [];
let j = 0;

//Create card pairs
for (let i = 0; i < cards.length * 2; i++) {
  if (j === cards.length) {
    j = 0;
  }
  cardsPaired.push(cards[j]);
  j++;
}
//Randomize cards
cardsPaired.sort(function () {
  return 0.5 - Math.random();
});

//Create cards
for (let i = 0; i < cards.length * 2; i++) {
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
    flipCard.classList.add("flip-card-flip");
    flipCard.classList.add("disable-click");

    //Add card name to array to compare matching cards with conditional later.
    nameMatch.push(flipCard.textContent);

    //Count each time the cards are clicked/flipped
    flipCount++;

    //Match the card values if two are flipped
    if (flipCount === 2) {
      //disable clicks after 2 cards have been flipped
      document.querySelectorAll(".flip-card-inner").forEach((item) => {
        item.classList.add("disable-click");
      });

      //Temporaly diable click on all cards

      //If cards flipped do NOT match, flip back
      if (nameMatch[0] !== nameMatch[1]) {
        //Delay flip back
        window.setTimeout(function () {
          //Skip every card thats already matched (on matchingCard Array)
          document.querySelectorAll(".flip-card-inner").forEach((item) => {
            //IF name is in matchingCards, don't not flip back
            if (!matchingCards.includes(item.textContent)) {
              item.classList.remove("flip-card-flip");
              item.classList.remove("disable-click");
            }
          });
        }, 1000);

        //Reset Flipcount
        flipCount = 0;

        //Clear Arrays
        nameMatch = [];

        //If cards flipped do match
      } else if (nameMatch[0] === nameMatch[1]) {
        //Add class to both cards
        flipCount = 0;
        nameMatch = [];
        matchingCards.push(flipCard.textContent);

        //Enable clicking back, except for matching cards
        document.querySelectorAll(".flip-card-inner").forEach((item) => {
          if (!matchingCards.includes(item.textContent)) {
            item.classList.remove("disable-click");
          }
        });

        //If just one card is flipped
      }
    }
  });
});
