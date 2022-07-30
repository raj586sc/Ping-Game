'use strict'
const player1 = document.querySelector('.player1-section');
const player2 = document.querySelector('.player2-section');
let totalScore = Number(document.querySelector('.active .totalScore').innerHTML);
const diceRollNumber = document.querySelector('.dice');
let currentSocre = 0;
let playing = true;
let diceNumber;
//check current score
const checkCurrentScore = function () {
    currentSocre = Number(document.querySelector('.active .score').innerHTML);
    return currentSocre;
}

// roll dice
const diceRoll = function () {
    if (playing) {
        diceNumber = Math.trunc(Math.random() * 6 + 1);
        diceRollNumber.style.display = "block";
        diceRollNumber.innerHTML = diceNumber;
        if (diceNumber == 1) {
            switchPlayer();

        } else {
            checkCurrentScore();
            currentSocre += diceNumber;
            document.querySelector('.active .score').innerHTML = currentSocre;
        }
    }
}

// update score
const updateCurrentScore = function () {
    if (player1.classList.contains('active')) {

        totalScore = Number(document.querySelector('.player1-section .totalScore').innerHTML);
        totalScore = totalScore + currentSocre;
        document.querySelector('.player1-section .totalScore').innerHTML = totalScore;
        currentSocre = 0;
    } else {
        totalScore = Number(document.querySelector('.player2-section .totalScore').innerHTML);
        totalScore += currentSocre;
        document.querySelector('.player2-section .totalScore').innerHTML = totalScore;
        currentSocre = 0;
    }
}

// hold function
const holdPlayer = function () {
    if (playing) {
        if (diceNumber == 1) {
            document.querySelector('.active .score').innerHTML = 0;
            switchPlayer();
        }
        else {
            updateCurrentScore();
            document.querySelector('.active .score').innerHTML = 0;

            if (totalScore >= 20) {
                playing = false;
                document.querySelector('.player.active').classList.add('winner');
            } else {
                switchPlayer();
            }
        }

    }
}

// switch player
const switchPlayer = function () {
    document.querySelector('.active .score').innerHTML = 0;

    player1.classList.toggle('active');
    player2.classList.toggle('active');
}

// reset
const resetGame = function () {
    diceRollNumber.style.display = "none";
    document.querySelector('.player.active').classList.remove('winner');
    player2.classList.remove('active');
    player1.classList.add('active');
    currentSocre = 0;
    document.querySelector('.player1-section .totalScore').innerHTML = 0;
    document.querySelector('.player2-section .totalScore').innerHTML = 0;
    playing = true;
}

document.querySelector('.btn--roll').addEventListener('click', diceRoll);
document.querySelector('.btn--hold').addEventListener('click', holdPlayer);
document.querySelector('.btn--new').addEventListener('click', resetGame);
