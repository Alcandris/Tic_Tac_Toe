//Variables et Constantes
let nameOne = "";
let nameTwo = "";
const playerOne = "X";
const playerTwo = "O";
const toast = Math.floor(Math.random() * 2);
let playerturn = toast == 0 ? playerOne : playerTwo;
const cells = document.querySelectorAll(".cell");
const form = document.querySelector("form");

let playerOneCount = 0;
let playerTwoCount = 0;
let drawCount = 0;

const winningPatterns = [
  //[...cells] est désormais un array, chaque cellule correspond donc a un numero
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
countDisplay.innerHTML = `${playerOneCount} : ${drawCount} : ${playerTwoCount} `;
//FONCTIONS

function jouer(e) {
  if (e.target.innerHTML == "") {
    e.target.innerHTML = playerturn;
  } else {
    return;
  }

  if (checkWin(playerturn)) {
    gameStatus("wins" + playerturn);
    endGame();
  } else if (checkDraw()) {
    gameStatus("draw");
    endGame();
  } else {
    gameStatus(playerturn);
  }

  //   gameStatus(playerturn);
  playerturn == playerOne ? (playerturn = playerTwo) : (playerturn = playerOne);
}

function gameStatus(status) {
  let updateStatus;
  switch (status) {
    case "O":
      updateStatus = `Tour de ${nameOne} `;
      break;
    case "X":
      updateStatus = `Tour de ${nameTwo} `;
      break;
    case "winsX":
      updateStatus = `${nameOne} gagne`;
      playerOneCount++;
      break;
    case "winsO":
      updateStatus = `${nameTwo} gagne`;
      playerTwoCount++;
      break;
    case "draw":
      updateStatus = "Egalité !";
      drawCount++;
      break;
  }
  statusDisplay.innerHTML = updateStatus;
  endGameStatus.innerHTML = updateStatus;
  countDisplay.innerHTML = `${playerOneCount} : ${drawCount} : ${playerTwoCount} `;
  //   storeCount();
}
function checkWin(playerturn) {
  return winningPatterns.some((combinaison) => {
    return combinaison.every((index) => {
      return cells[index].innerHTML == playerturn;
    });
  });
}

function checkDraw() {
  //.every fonctionne avec les array, il faut donc transfomer cells (nodelist) en array avec [...cells]
  return [...cells].every((cell) => {
    return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
  });
}

function endGame() {
  document.getElementById("gameEnd").style.display = "block";
}

function getName(e) {
  e.preventDefault();
  if (playerOneName.value != "" && playerTwoName.value != "") {
    nameOne = playerOneName.value;
    nameTwo = playerTwoName.value;
    formulaire.style.display = "none";
    nameDisplay.innerHTML = `${nameOne} : Nul: ${nameTwo} `;
    if (playerturn == playerOne) {
      statusDisplay.innerHTML = `Tour de ${nameOne} `;
    } else {
      statusDisplay.innerHTML = `Tour de ${nameTwo} `;
    }
  }
}

//Ecoutes
cells.forEach((cell) => {
  cell.addEventListener("click", jouer, { once: false });
});

reloadGame.addEventListener("click", () => {
  document.getElementById("gameEnd").style.display = "none";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    if (playerturn == playerOne) {
      statusDisplay.innerHTML = `Tour de ${nameOne} `;
    } else {
      statusDisplay.innerHTML = `Tour de ${nameTwo} `;
    }
  });
  //   window.location.reload();
});

form.addEventListener("submit", getName);
