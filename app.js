let msgcontainer = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");
let count = 0;
// check turn
const soundO = new Audio("./sound/o.mp3");
const soundX = new Audio("./sound/x.mp3");
// const winnersound=new Audio("./sound/conffiti.mp3");
let buttons = document.querySelectorAll(".box");
let turn = "o";
let winnerTurn = "O";
let win = false;
buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    count++;
    console.log(count);
    if (turn === "o") {
      await soundO.play();
      button.innerText = "O";
      turn = "x";
      winnerTurn = "O";
    } else {
      soundX.play();
      button.innerText = "X";
      turn = "o";
      winnerTurn = "X";
    }
    button.disabled = true;
    if (win == true) {
      winner();
    } else {
      checkWin();
    }
  });
});

//match draw
function matchdraw() {
  msg.innerText = `Match Tie, Try Again`;
  msgcontainer.classList.remove("hide");
  buttons.disabled = true;
}
//winner pattern
const winnerpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// winner msg
function winner() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
  // winnersound.play
  dissableAllBtn();
  msg.innerText = `Winner:${winnerTurn}`;
  msgcontainer.classList.remove("hide");
  buttons.disabled = true;
}

// check winner
let pattern1;
let pattern2;
let pattern3;
function checkWin() {
  winnerpatterns.forEach((pattern) => {
    pattern1 = buttons[pattern[0]].innerText;
    pattern2 = buttons[pattern[1]].innerText;
    pattern3 = buttons[pattern[2]].innerText;
    if (pattern1 != "" && pattern2 != "" && pattern3 != "") {
      if (pattern1 === pattern2 && pattern2 === pattern3) {
        win = true;
        winner();
      } else if (count == 9) {
        matchdraw();
      }
    }
  });
}

function dissableAllBtn() {
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
}
const resetButton = document
  .querySelector(".reset-btn")
  .addEventListener("click", () => {
    resetBtn();
    count = 0;
  });
// fuctin for reset btn
function resetBtn() {
  buttons.forEach((btn) => {
    btn.innerText = "";
    btn.disabled = false;
  });
  turn = "o";
  win = false;
  winnerTurn = "O";
  msgcontainer.classList.add("hide");
}
