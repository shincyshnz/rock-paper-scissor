
function game(e) {
    //find the player selection from OPTIONS array
    const playerSelection = OPTIONS.find(sel =>
        sel.item == e.target.getAttribute('id')
    );
    const computerSelection = getComputerChoice();
    const result = document.querySelector('.result');

    //find the winner
    if (playerSelection.item == computerSelection) {
        result.textContent = "Tie";
    } else if (playerSelection.beats == computerSelection) {
        result.textContent = "You Win";
        playerScore++;
        addScore('ply');
    } else {
        result.textContent = "You Lose";
        computerScore++;
        addScore('comp');
    }

    //if the score becomes 5
    if (playerScore == 4 || computerScore == 4) {
        setGameOver();
    }
}

function addScore(val) {
    let stars;

    if (val == 'ply') {
        stars = document.querySelectorAll('.fa.ply');
        score = playerScore;
    } else {
        stars = document.querySelectorAll('.fa.comp');
        score = computerScore;
    }
    stars[score].classList.add('checked');
}


function playSound(e) {
    const audio = document.querySelector('audio');
    audio.currentTime = 0;
    audio.play();
}

function getComputerChoice() {
    // const choiceArray = ['rock', 'paper', 'scissor'];
    let index = Math.floor(Math.random() * OPTIONS.length);
    let path = "images/";

    if (OPTIONS[index].item === 'rock') {
        path += "stone.png";
    } else if (OPTIONS[index].item === 'paper') {
        path += "paper.png";
    }
    else {
        path += "scissors.png";
    }

    questionImg.setAttribute('src', path);
    questionImg.setAttribute('alt', OPTIONS[index].item);

    return OPTIONS[index].item;
}

function setGameOver() {
    selections.forEach(selected => {
        selected.removeEventListener('click', playSound),
            selected.removeEventListener('click', game),
            selected.classList.remove('hover'),
            selected.style.pointerEvents = 'none'
    });
    questionImg.setAttribute('src', 'images/question.png');
    questionImg.setAttribute('alt', 'question');

    resetButton = document.createElement('button');
    resetButton.textContent = "play again";
    const restart = document.querySelector('.restartGame');
    restart.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    resetButton.classList.add('resetButton');

}

function resetGame(e) {
    score = -1;
    playerScore = -1;
    computerScore = -1;

    selections.forEach(selected => {
        selected.addEventListener('click', playSound),
            selected.addEventListener('click', game),
            selected.classList.add('hover'),
            selected.style.pointerEvents = 'auto'
    });
    document.querySelector('.result').textContent = ' ';
    e.target.parentNode.removeChild(e.target);

    const allStars = document.querySelectorAll('.fa');
    Array.from(allStars).forEach(star =>
        star.classList.remove('checked'))

}

const selections = document.querySelectorAll('.icon');
const questionImg = document.querySelector('.com');
let playerScore = -1;
let computerScore = -1;
let score = -1;


const OPTIONS = [
    {
        'item': 'rock',
        'beats': 'scissor'
    },
    {
        'item': 'paper',
        'beats': 'rock'
    }, {
        'item': 'scissor',
        'beats': 'paper'
    }
];




selections.forEach(selected => {
    selected.addEventListener('click', playSound),
        selected.addEventListener('click', game)
});



