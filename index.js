let container = document.getElementById("container");

let images = [
  "+",
  "-",
  "/",
  "%",
  "$",
  "=",
  "*",
  "&",
  "+",
  "-",
  "/",
  "%",
  "$",
  "=",
  "*",
  "&",
];

let openedCards = 0;
let pairOfImages = [];
let pairOfHTMLElements = [];
let allCards = document.getElementsByClassName("single-element");
let resetButton = document.getElementById("resetButton");
let count = 0;

resetButton.addEventListener("click", function () {
  window.location.reload();
});

let message = document.getElementById("message");

for (let i = 1; i <= 16; i++) {
  let element = document.createElement("div");
  element.className = "single-element";
  element.id = "singleElement" + i;
  element.textContent = contentOfCard();
  container.appendChild(element);
  element.addEventListener("click", onCardClick);
}

function contentOfCard() {
  let randomIndex = Math.floor(Math.random() * images.length);
  let randomImage = images[randomIndex];
  images.splice(randomIndex, 1);
  return randomImage;
}

function onCardClick(event) {
  if (!event.target.classList.contains("opened") && openedCards < 2) {
    event.target.classList.add("opened");

    pairOfImages.push(event.target.textContent);
    openedCards++;
    pairOfHTMLElements.push(event.target);
  }

  if (openedCards === 2) {
    Array.from(allCards).forEach((card) => {
      if (!card.classList.contains("opened")) {
        card.removeEventListener("click", onCardClick);
      }
    });
    setTimeout(() => {
      if (pairOfImages[0] === pairOfImages[1]) {
        pairOfHTMLElements.forEach((htmlElement) =>
          htmlElement.classList.add("matchingCards")
        );
        Array.from(allCards).forEach((card) => {
          if (!card.classList.contains("matchingCards")) {
            card.addEventListener("click", onCardClick);
          }
        });
        count++;
      } else {
        pairOfHTMLElements.forEach((htmlElement) => {
          htmlElement.classList.add("rotation");
          htmlElement.classList.remove("opened");
          setTimeout(() => {
            htmlElement.classList.remove("rotation");
          }, 500);
        });

        Array.from(allCards).forEach((card) => {
          card.addEventListener("click", onCardClick);
        });
      }

      if (count === 8) {
        setTimeout(showMessage, 800);
        setTimeout(hideMessage, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      openedCards = 0;
      pairOfImages = [];
      pairOfHTMLElements = [];
      console.log(pairOfHTMLElements);
    }, 1100);
  }
}

function showMessage() {
  let element = document.createElement("div");
  element.id = "message";
  element.textContent = "The game has finished";
  containerOfMessageAndResetButton.appendChild(element);
}

function hideMessage() {
  let element = document.getElementById("message");
  element.remove();
}
