import  "../style/style.css";
import { renderStartPage, renderGamePage, suitePict } from "./render.js";
import { createRandomCardCollection } from "./tools.js";

let contentElement = document.querySelector(".container");
let levelOfGame;

gameStart();

function gameStart() {
    renderStartPage({ contentElement });

    let startButton = document.querySelector(".select__startbutton");

    startButton.addEventListener("click", () => {
        if (startButton.disabled === true) {
            alert("Выберите сложность!");
            return;
        }

        levelOfGame = window.localStorage.getItem("level");

        createRandomCardCollection({ levelOfGame });

        renderGamePage({ contentElement });

        setTimeout(() => gameTime(), 7001);
    });
}

function gameTime() {
    let reStartButton = document.querySelector(".header__button");

    reStartButton.classList.remove("global__button--disabled");

    reStartButton.addEventListener("click", () => {
        gameStart();
    });

    let cardsElement = document.querySelectorAll(".card__items");

    let controlArray = [];
    for (let key of cardsElement) {
        key.addEventListener("click", () => {
            key.classList.remove("card__items--close");
            key.classList.add("card__items--open");

            key.innerHTML = cardPictureOnClick(key);
            let clickCard = key.dataset.suite + key.dataset.dignity;
            controlArray.push(clickCard);

            setTimeout(() => {
                if (controlArray.length > 0 && controlArray.length % 2 === 0) {
                    if (
                        controlArray[controlArray.length - 1] !==
                        controlArray[controlArray.length - 2]
                    ) {
                        alert("Вы проиграли!");
                        gameStart();
                    }
                }
                if (controlArray.length === cardsElement.length) {
                    alert("Вы выиграли!");
                    gameStart();
                }
            }, 5);
        });
    }
}

function cardPictureOnClick(key) {
    return `<div class ="card__firstSymbol">
                        ${
                            key.dataset.dignity === "1"
                                ? "10"
                                : key.dataset.dignity
                        }
                    </div>
                    <div class ="card__secondSymbol">
                        <img src=${suitePict(key.dataset.suite)}>
                    </div>
                    <div class ="card__thirdSymbol">
                        <img src=${suitePict(
                            key.dataset.suite
                        )} class = 'card__centerPicture'>
                    </div>
                    <div class ="card__fourSymbol ">
                        <img src=${suitePict(key.dataset.suite)}>
                    </div>
                    <div class ="card__fiveSymbol">
                        ${
                            key.dataset.dignity === "1"
                                ? "10"
                                : key.dataset.dignity
                        }
                    </div>`;
}
