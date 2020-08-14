//collecting the buttons from DOM

let selection = document.querySelectorAll("[data-selection]");
let finalColumn = document.querySelector("[data-final-column]");
let resultAnounce = document.getElementById("result-announce");
let restartButton = document.getElementById("restart");

//generating object to store data about the game

let options = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌",
    beats: "paper",
  },
];

//To make the computer respond each time the game is played

selection.forEach((selected) => {
  selected.addEventListener("click", (e) => {
    let name = selected.dataset.selection;
    let option = options.find((option) => option.name === name);
    makeSelection(option);
  });
});

//counter variables

let i = 0;
let j = 0;
let count = 0;

//This function makes the computer select any of the buttons randomly

//This function also finds the winner and declares it on the DOM

function makeSelection(name) {

  //User can play upto 5 rounds

  if (count < 5) {
    let computer = randomSelection();
    let youWinner = isWinner(name, computer);
    let compWinner = isWinner(computer, name);
    if (youWinner) {
      i++;
      document.querySelector("[data-score-user]").innerText = i;
    } else if (compWinner) {
      j++;
      document.querySelector("[data-score-computer]").innerText = j;
    }
    count++;
    addSelected(name, youWinner);
    addSelected(computer, compWinner);
  }

//on the 5th round results are declared

  if (count == 5) {
    if (i > j) {
      resultAnnounce("You Have Won", "success");
      document.querySelector("#comp-result").style.opacity = ".1";
      finalColumn.style.opacity = "2";
    }
    if (j > i) {
      resultAnnounce("Computer Has Won", "danger");
      document.querySelector("#comp-result").style.opacity = "2";
      finalColumn.style.opacity = ".1";
    }
    if (i == j) {
      resultAnnounce("The Game is Drawn", "primary");
    }
    function resultAnnounce(message, color) {
      resultAnounce.innerHTML = `<b>${message}</b>`;
      resultAnounce.className = `alert text-center alert-${color}`;
      resultAnounce.style.borderRadius = ".25rem";
    }
  }
}

//selected emoji is generated in the div element for both the players

function addSelected(Selected, winner) {
  var div = document.createElement("div");
  div.innerText = Selected.emoji;
  div.className = "result-selection";
  if (winner) div.className = "winner";
  finalColumn.after(div);
}

// checks who wins

function isWinner(selected, beaten) {
  return selected.name === beaten.beats;
}

//Makes the computer select random options

function randomSelection() {
  let random = Math.floor(Math.random() * selection.length);
  return options[random];
}

//Restart button

restartButton.addEventListener("click", () => {
  window.location.reload();
});
