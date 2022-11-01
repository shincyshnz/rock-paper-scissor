let rounds = 1, winP = 0, winC = 0;
let resetButton;

const result = document.querySelector('.result');
const scoreP = document.querySelector('.scoreP'); const scoreC = document.querySelector('.scoreC');
const round = document.querySelector('.round');
const imgClick = document.querySelectorAll('.hover');
const resetParas = document.querySelector('.resetParas');


function game(val) {
    const playerSelection = val;
    const computerSelection = getComputerChoice();

    if (rounds < 5) {
        playRound(playerSelection, computerSelection);
    } else {
        if (winC == winP) {
            textChange("Tie. GAME OVER");
        } else if (winC > winP) {
            textChange("You Lose. GAME OVER");
        } else {
            textChange("You Win. GAME OVER");
        }
        setGameOver();
    }

}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        textChange("Tie");
    } else if (playerSelection === 'rock') {
        if (computerSelection === 'paper') {
            winC++;
            textChange("You Lose! Paper beats Rock");

        }
        if (computerSelection === 'scissor') {
            winP++;
            textChange("You Win! Rock crushes Scissor");

        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            winP++;
            textChange("You Win! Paper beats Rock");

        }
        if (computerSelection === 'scissor') {
            winC++;
            textChange("You Lose! Scissor cuts Paper");

        }
    } else if (playerSelection === 'scissor') {
        if (computerSelection === 'rock') {
            winC++;
            textChange("You Lose! Rock crushes Scissor");

        }
        if (computerSelection === 'paper') {
            winP++;
            textChange("You Win! Scissor cuts Paper");

        }
    }
    rounds++;
}

function getComputerChoice() {
    const choiceArray = ['rock', 'paper', 'scissor'];
    let index = Math.floor(Math.random() * choiceArray.length);
    const imgC = document.getElementById(index);
    imgC.style.webkitTransform = 'scale(1.5)';
    imgC.style.msTransform = 'scale(1.5)';
    imgC.style.transform = 'scale(1.5)';

    setTimeout(function () {
        imgC.style.webkitTransform = 'scale(1)';
        imgC.style.msTransform = 'scale(1)';
        imgC.style.transform = 'scale(1)';
    }, 100);
    return choiceArray[index];
}

function textChange(res) {
    result.textContent = res;
    scoreP.textContent = "PLAYER : " + winP;
    scoreC.textContent = "COMPUTER : " + winC;
    round.textContent = "ROUND : " + rounds;
}

function setGameOver() {
    for (img of imgClick) {
        img.classList.remove('hover');
        //img.onclick = null;
        img.style.pointerEvents = 'none';
    }
    resetButton = document.createElement('button');
    resetButton.textContent = "play again";
    const result = document.getElementsByClassName('resultParas');
    result[0].appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    resetButton.classList.add('resetButton');
}
function resetGame() {
    rounds = 1;
    winP = 0;
    winC = 0;
    for (img of imgClick) {
        img.classList.add('hover');
        //to disable click event on the image
        img.style.pointerEvents = 'auto';

    }

    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
}
