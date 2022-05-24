'use strict';

//button
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const totalScoreP1 = document.querySelector('#score--0');
const totalScoreP2 = document.querySelector('#score--1');
const currScoreP1 = document.querySelector('#current--0');
const currScoreP2 = document.querySelector('#current--1');
const diceImg = document.querySelector('.dice');
const playerList = document.querySelectorAll('.player');
let diceNumber = 0;
const scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
const winScore = 10;
//

//helper function

function getActivePlayer() {
  return document.querySelector('.player--active');
}
function getActiveCurrScore() {
  return getActivePlayer().querySelector('.current-score');
}
function getActiveTotalScore() {
  return getActivePlayer().querySelector('.score');
}

function updateTotalScore(activePlayer) {
  const currScore = +getActiveCurrScore().textContent;
  getActiveCurrScore().textContent = 0;
  const totalScore = +getActiveTotalScore().textContent + currScore;
  activePlayer.querySelector('.score').textContent = totalScore;

  if (totalScore === winScore) {
    btnNewGame.disabled = 'disabled';
    btnRollDice.disabled = 'disabled';
    btnHold.disabled = 'disabled';
  }
}

function switchActivePlayer() {
  if (getActivePlayer().classList.contains('player--0')) {
    playerList[1].classList.add('player--active');
    playerList[0].classList.remove('player--active');
  } else {
    playerList[0].classList.add('player--active');
    playerList[1].classList.remove('player--active');
  }
}
function initial() {
  totalScoreP1.textContent = 0;
  totalScoreP2.textContent = 0;
  currScoreP1.textContent = 0;
  currScoreP2.textContent = 0;
  diceImg.style.opacity = 0;
}
function rollDice() {
  //get random number
  diceNumber = Math.floor(Math.random() * 6) + 1;
  diceImg.style.opacity = 1;
  diceImg.src = `dice-${diceNumber}.png`;

  //random number === 1, clear current active player's number, switch active player
  if (diceNumber === 1) {
    const activePlayer = getActivePlayer();
    activePlayer.querySelector('.current-score').textContent = 0;
    updateTotalScore(activePlayer);
    switchActivePlayer();
  } else {
    //! 1, add dice number to current number
    let currScore = +getActiveCurrScore().textContent;
    currScore += diceNumber;
    getActiveCurrScore().textContent = currScore;
  }
}
function holdScore() {
  //hold current dice number to current score
  updateTotalScore(getActivePlayer());
  //   getActiveTotalScore().textContent =
  //     +getActiveCurrScore().textContent + +getActiveTotalScore().textContent;
  switchActivePlayer();
}
//event handler
btnNewGame.addEventListener('click', initial);
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
initial();

/* SUMMARY */
//activePlayer => active index of the activePlayer
//totalScores [0,0] -> [player1's score, player2's score]
