const playBtn = document.getElementById("playBtn");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const sissorsBtn = document.getElementById("sissorsBtn");
const spockBtn = document.getElementById("spockBtn");
const lizardBtn = document.getElementById("lizardBtn");
const pvpBtn = document.getElementById("pvpBtn");
const playAgain = document.getElementById("playAgain");
const howtoplay = document.getElementById("howtoplay")
const homeBtn = document.getElementById("homeBtn");
const gameResult = document.getElementById("gameResult");
const bo1 = document.getElementById("bo1");
const bo5 = document.getElementById("bo5");
const bo7 = document.getElementById("bo7");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const rules = document.getElementById("rules");
const closeRules = document.getElementById("closeRules");
const gameOptions = document.getElementById("gameOptions");

let playeranswer = "rock";
let cpuanswer = "paper";

howtoplay?.addEventListener("click", () => {
  playBtn.classList.add("hidden");
  pvpBtn.classList.add("hidden");
  howtoplay.classList.add("hidden");

  rules.classList.remove("hidden");
});
closeRules?.addEventListener("click", () => {
  rules.classList.add("hidden");

  playBtn.classList.remove("hidden");
  pvpBtn.classList.remove("hidden");
  howtoplay.classList.remove("hidden");
});

function showOptions() {
  playBtn?.classList.add("hidden");
  pvpBtn?.classList.add("hidden");
  howtoplay?.classList.add("hidden");
  gameOptions?.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("mode") !== "pvp") return;

  const turnText = document.getElementById("turnText");
  if (!turnText) return;

  if (localStorage.getItem("turn") === "2") {
    turnText.textContent = "P -2";
  } else {
    turnText.textContent = "P -1";
  }
});

playBtn?.addEventListener("click", () => {
  localStorage.setItem("mode", "cpu");
  localStorage.setItem("turn", "1");
  showOptions();
});

pvpBtn?.addEventListener("click", () => {
  localStorage.setItem("mode", "pvp");
  localStorage.setItem("turn", "1");
  localStorage.removeItem("player1answer");
  localStorage.removeItem("player2answer");
  showOptions();
});

if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}

            //! BEST OF START FUNCTION
function startSeries(bestOf) {
  localStorage.setItem("bestOf", String(bestOf));
  localStorage.setItem("p1Wins", "0");
  localStorage.setItem("p2Wins", "0");
  window.location.href = "/Pages/Selection.html";
}

if (bo1) bo1.addEventListener("click", () => startSeries(1));
if (bo5) bo5.addEventListener("click", () => startSeries(5));
if (bo7) bo7.addEventListener("click", () => startSeries(7));

                //! TELLS US HOW MANY GAME WINS NEEDED
function winsNeeded() {
  const bestOf = localStorage.getItem("bestOf");

  if (bestOf === "1") return 1;
  if (bestOf === "5") return 3;
  if (bestOf === "7") return 4;

  return 1;
}

function isMatchOver() {
  const p1 = Number(localStorage.getItem("p1Wins") || "0");
  const p2 = Number(localStorage.getItem("p2Wins") || "0");
  const needed = winsNeeded();

  if (p1 >= needed || p2 >= needed) {
    return true;
  }
  return false;
}

                  //! FUNCTION TO INDICATE IF THE GAME IS STILL GOING
if (playAgain) {
  playAgain.addEventListener("click", () => {
    if (isMatchOver()) {
      localStorage.removeItem("p1Wins");
      localStorage.removeItem("p2Wins");
      localStorage.removeItem("bestOf");
      window.location.href = "../index.html";
    } else {
      window.location.href = "../Pages/Selection.html";
    }
  });
}

// -------- CPU FETCH --------
async function getCpuAnswer() {
  const response = await fetch(
    "https://rpsls-fabnhph6h0gpfmh9.westus3-01.azurewebsites.net/api/rpsls"
  );
  cpuanswer = (await response.text()).trim();
}

//            VARIABLE CHANGES
if (rockBtn) {
  rockBtn.addEventListener("click", () => {
    const mode = localStorage.getItem("mode") || "cpu";
    if (mode === "pvp") {
      const turn = localStorage.getItem("turn") || "1";
      if (turn === "1") {
        localStorage.setItem("player1answer", "rock");
        localStorage.setItem("turn", "2");
        window.location.href = "../Pages/Selection.html";
      } else {
        localStorage.setItem("player2answer", "rock");
        localStorage.setItem("turn", "1");
        window.location.href = "../Pages/Game.html";
      }
      return;
    }

    playeranswer = "rock";
    localStorage.setItem("playeranswer", playeranswer);
    window.location.href = "../Pages/Game.html";
  });
}

if (paperBtn) {
  paperBtn.addEventListener("click", () => {
    const mode = localStorage.getItem("mode") || "cpu";
    if (mode === "pvp") {
      const turn = localStorage.getItem("turn") || "1";
      if (turn === "1") {
        localStorage.setItem("player1answer", "paper");
        localStorage.setItem("turn", "2");
        window.location.href = "../Pages/Selection.html";
      } else {
        localStorage.setItem("player2answer", "paper");
        localStorage.setItem("turn", "1");
        window.location.href = "../Pages/Game.html";
      }
      return;
    }

    playeranswer = "paper";
    localStorage.setItem("playeranswer", playeranswer);
    window.location.href = "../Pages/Game.html";
  });
}

if (sissorsBtn) {
  sissorsBtn.addEventListener("click", () => {
    const mode = localStorage.getItem("mode") || "cpu";
    if (mode === "pvp") {
      const turn = localStorage.getItem("turn") || "1";
      if (turn === "1") {
        localStorage.setItem("player1answer", "scissors");
        localStorage.setItem("turn", "2");
        window.location.href = "../Pages/Selection.html";
      } else {
        localStorage.setItem("player2answer", "scissors");
        localStorage.setItem("turn", "1");
        window.location.href = "../Pages/Game.html";
      }
      return;
    }

    playeranswer = "scissors";
    localStorage.setItem("playeranswer", playeranswer);
    window.location.href = "../Pages/Game.html";
  });
}

if (spockBtn) {
  spockBtn.addEventListener("click", () => {
    const mode = localStorage.getItem("mode") || "cpu";
    if (mode === "pvp") {
      const turn = localStorage.getItem("turn") || "1";
      if (turn === "1") {
        localStorage.setItem("player1answer", "spock");
        localStorage.setItem("turn", "2");
        window.location.href = "../Pages/Selection.html";
      } else {
        localStorage.setItem("player2answer", "spock");
        localStorage.setItem("turn", "1");
        window.location.href = "../Pages/Game.html";
      }
      return;
    }

    playeranswer = "spock";
    localStorage.setItem("playeranswer", playeranswer);
    window.location.href = "../Pages/Game.html";
  });
}

if (lizardBtn) {
  lizardBtn.addEventListener("click", () => {
    const mode = localStorage.getItem("mode") || "cpu";
    if (mode === "pvp") {
      const turn = localStorage.getItem("turn") || "1";
      if (turn === "1") {
        localStorage.setItem("player1answer", "lizard");
        localStorage.setItem("turn", "2");
        window.location.href = "../Pages/Selection.html";
      } else {
        localStorage.setItem("player2answer", "lizard");
        localStorage.setItem("turn", "1");
        window.location.href = "../Pages/Game.html";
      }
      return;
    }

    playeranswer = "lizard";
    localStorage.setItem("playeranswer", playeranswer);
    window.location.href = "../Pages/Game.html";
  });
}

// -------- GAME PAGE LOAD
const mode = localStorage.getItem("mode") || "cpu";

if (mode === "pvp") {
  const p1 = localStorage.getItem("player1answer");
  const p2 = localStorage.getItem("player2answer");
  if (p1) playeranswer = p1;
  if (p2) cpuanswer = p2;
} else {
  const savedPlayer = localStorage.getItem("playeranswer");
  if (savedPlayer) playeranswer = savedPlayer;
}

const toImage = (choice) => choice + ".png";

if (gameResult && img1 && img2) {
  (async () => {
    if (mode !== "pvp") {
      await getCpuAnswer();
    }

    img1.src = `../Assets/${toImage(playeranswer)}`;
    img2.src = `../Assets/${toImage(cpuanswer)}`;

    win();
  })();
}

          //!           CODE FOR WINNER
function win() {
  const youWin =
    (playeranswer === "rock"     && (cpuanswer === "lizard"  || cpuanswer === "scissors")) ||
    (playeranswer === "paper"    && (cpuanswer === "spock"   || cpuanswer === "rock"))     ||
    (playeranswer === "scissors" && (cpuanswer === "lizard"  || cpuanswer === "paper"))    ||
    (playeranswer === "spock"    && (cpuanswer === "rock"    || cpuanswer === "scissors")) ||
    (playeranswer === "lizard"   && (cpuanswer === "spock"   || cpuanswer === "paper"));

  let p1 = Number(localStorage.getItem("p1Wins") || "0");
  let p2 = Number(localStorage.getItem("p2Wins") || "0");
  const needed = winsNeeded();

  // TIE → show current score
  if (playeranswer === cpuanswer) {
    if (gameResult) gameResult.textContent = `${p1} - ${p2}`;
    return;
  }

  // Update score
  if (youWin) {
    p1++;
    localStorage.setItem("p1Wins", String(p1));
  } else {
    p2++;
    localStorage.setItem("p2Wins", String(p2));
  }

  // Match finished → show winner
if (p1 >= needed || p2 >= needed) {
  if (gameResult) {
    if (p1 > p2) {
      gameResult.textContent = "P1 WINS";
    } else {
      if (localStorage.getItem("mode") === "pvp") {
        gameResult.textContent = "P2 WINS";
      } else {
        gameResult.textContent = "CPU WINS";
      }
    }
  }

  if (playAgain) {
    playAgain.textContent = "New Match";
  }

  return;
}

  // Match continues → show score
  if (gameResult) gameResult.textContent = `${p1} - ${p2}`;
}
