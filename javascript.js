const cards = ["🎉", "🍕", "🦄", "🐶", "🍻", "🔥", "🦊", "🤑"];
const cardsPaired = [];

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

const boardDiv = document.querySelector("#container");

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
let nameMatch = [];
let flipCount = 0;
let matchingCards = [];

document.querySelectorAll(".flip-card-inner").forEach((flipCard) => {
  flipCard.addEventListener("click", (event) => {
    //Flip card on card click
    flipCard.classList.add("flip-card-flip");
    //Add card name to array to match up later.
    nameMatch.push(flipCard.textContent);

    //Count each time the cards are clicked
    flipCount++;

    //Match the card values
    if (flipCount === 2) {
      //If cards flipped do NOT match
      if (nameMatch[0] !== nameMatch[1]) {
        window.setTimeout(function () {
          //Skip every card on matchingCard Array
          //Remove flipCard.classList.remove("flip-card-flip");

          document.querySelectorAll(".flip-card-inner").forEach((item) => {
            //IF name is in matchingCards, don't remove

            if (!matchingCards.includes(item.textContent)) {
              item.classList.remove("flip-card-flip");
            }
          });
        }, 1000);
        //Reset Flipcount
        flipCount = 0;

        //Clear Array
        nameMatch = [];
        nameMatch.pop();
        nameMatch.pop();

        //If cards flipped do match
      } else if (nameMatch[0] === nameMatch[1]) {
        //Add class to both cards
        flipCount = 0;
        nameMatch = [];
        matchingCards.push(flipCard.textContent);
        console.log("flipCount: ", flipCount);
        console.log("Name Match: ", nameMatch);
        console.log("Matching Cards: ", matchingCards);

        //If just one card is flipped
      } else {
        //Do nothing
      }
    }
  });
});
