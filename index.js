//Variables et Constantes

const playerOne = "X";
const playerTwo = "O";
let playerturn = playerOne;
const cells = document.querySelectorAll(".cell");

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

// function storeCount() {
//   window.localStorage.Count = {
//     playerOneCount: playerOneCount,
//     drawCount: drawCount,
//     playerTwoCount: playerTwoCount,
//   };
// }

// function getCount() {
//   playerOneCount = window.localStorage.Count.playerOneCount;
//   playerTwoCount = window.localStorage.Count.playerTwoCount;
//   drawCount = window.localStorage.Count.drawCount;
// }
// getCount();

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
      updateStatus = "Tour du joueur 1";
      break;
    case "X":
      updateStatus = "Tour du joueur 2";
      break;
    case "winsX":
      updateStatus = "le joueur 1 gagne";
      playerOneCount++;
      break;
    case "winsO":
      updateStatus = "le joueur 2 gagne";
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

//Ecoutes
cells.forEach((cell) => {
  cell.addEventListener("click", jouer, { once: false });
});

reloadGame.addEventListener("click", () => {
  document.getElementById("gameEnd").style.display = "none";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    statusDisplay.innerHTML = "le joueur 1 commence";
  });
  //   window.location.reload();
});
