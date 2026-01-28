document.addEventListener("DOMContentLoaded", () => {
    // Query all DOM elements first
    const rockBtn = document.getElementById("rockBtn");
    const paperBtn = document.getElementById("paperBtn");
    const sissorsBtn = document.getElementById("sissorsBtn");
    const spockBtn = document.getElementById("spockBtn");
    const lizardBtn = document.getElementById("lizardBtn");
    const playAgain = document.getElementById("playAgain");
    const homeBtn = document.getElementById("homeBtn");
    const gameResult = document.getElementById("gameResult");
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const playGameBtn = document.getElementById("playBtn");
    const howToPlayBtn = document.getElementById("howtoplay");
    const rulesModal = document.getElementById("rules");
    const closeRulesBtn = document.getElementById("closeRules");
    let playeranswer = "rock";
    let cpuanswer = "paper";
    let gameMode = "cpu"; // "cpu" or "pvp"

    // Play Again button handler (must be after DOM queries)
    if (playAgain) {
        playAgain.addEventListener("click", () => {
            if (isMatchOver()) {
                localStorage.removeItem("p1Wins");
                localStorage.removeItem("p2Wins");
                localStorage.removeItem("bestOf");
                window.location.href = "/index.html";
            } else {
                window.location.href = "/Pages/Selection.html";
            }
        });
    }

    // -------- CPU FETCH --------
    async function getCpuAnswer() {
        const response = await fetch(
            "http://localhost:5000/api/rpsls"
        );
        cpuanswer = (await response.text()).trim();
    }

    // -------- DETECT WHICH PAGE WE'RE ON --------
    const isSelectionPage = !!(rockBtn && paperBtn && sissorsBtn && spockBtn && lizardBtn);
    const isGamePage = !!(gameResult && img1 && img2);

    // -------- SELECTION PAGE LOGIC --------
    if (isSelectionPage) {
        const currentGameMode = localStorage.getItem("gameMode") || "cpu";
        const playerNum = currentGameMode === "pvp" && localStorage.getItem("playeranswer") !== null ? "2" : "1";

        if (rockBtn) {
            rockBtn.addEventListener("click", () => {
                const answerKey = playerNum === "1" ? "playeranswer" : "player2answer";
                localStorage.setItem(answerKey, "rock");
                localStorage.getItem(answerKey); // force sync
                if (currentGameMode === "pvp" && playerNum === "1") {
                    window.location.href = "/Pages/Selection2.html";
                } else {
                    window.location.href = "/Pages/Game.html";
                }
            });
        }
        if (paperBtn) {
            paperBtn.addEventListener("click", () => {
                const answerKey = playerNum === "1" ? "playeranswer" : "player2answer";
                localStorage.setItem(answerKey, "paper");
                localStorage.getItem(answerKey);
                if (currentGameMode === "pvp" && playerNum === "1") {
                    window.location.href = "/Pages/Selection2.html";
                } else {
                    window.location.href = "/Pages/Game.html";
                }
            });
        }
        if (sissorsBtn) {
            sissorsBtn.addEventListener("click", () => {
                const answerKey = playerNum === "1" ? "playeranswer" : "player2answer";
                localStorage.setItem(answerKey, "scissors");
                localStorage.getItem(answerKey);
                if (currentGameMode === "pvp" && playerNum === "1") {
                    window.location.href = "/Pages/Selection2.html";
                } else {
                    window.location.href = "/Pages/Game.html";
                }
            });
        }
        if (spockBtn) {
            spockBtn.addEventListener("click", () => {
                const answerKey = playerNum === "1" ? "playeranswer" : "player2answer";
                localStorage.setItem(answerKey, "spock");
                localStorage.getItem(answerKey);
                if (currentGameMode === "pvp" && playerNum === "1") {
                    window.location.href = "/Pages/Selection2.html";
                } else {
                    window.location.href = "/Pages/Game.html";
                }
            });
        }
        if (lizardBtn) {
            lizardBtn.addEventListener("click", () => {
                const answerKey = playerNum === "1" ? "playeranswer" : "player2answer";
                localStorage.setItem(answerKey, "lizard");
                localStorage.getItem(answerKey);
                if (currentGameMode === "pvp" && playerNum === "1") {
                    window.location.href = "/Pages/Selection2.html";
                } else {
                    window.location.href = "/Pages/Game.html";
                }
            });
        }
    }

    // -------- GAME PAGE LOGIC --------
    if (isGamePage) {
        gameMode = localStorage.getItem("gameMode") || "cpu";
        const savedPlayer = localStorage.getItem("playeranswer") || "rock";
        const savedPlayer2 = localStorage.getItem("player2answer");

        // Update global variables
        playeranswer = savedPlayer;
        if (gameMode === "pvp" && savedPlayer2) {
            cpuanswer = savedPlayer2;
        } else if (gameMode === "cpu") {
            // CPU mode will fetch the CPU answer
            cpuanswer = "paper"; // temporary default
        }

        // map a choice string to the actual asset filename (lowercase)
        const toImage = (choice) => {
            if (!choice) return "rock.png";
            return choice.toLowerCase() + ".png";
        };

        // ensure we have a player choice; if not, go back to selection
        if (!savedPlayer) {
            // nothing selected — send user back to selection
            window.location.href = "/Pages/Selection.html";
        } else {
            (async() => {
                if (gameMode === "cpu") {
                    await getCpuAnswer();
                    // ensure cpuanswer falls back safely
                    cpuanswer = (cpuanswer || "paper").toLowerCase();
                } else if (gameMode === "pvp") {
                    cpuanswer = (savedPlayer2 || "").toLowerCase();
                    if (!cpuanswer) {
                        // missing player2 selection — redirect to player 2 selection
                        window.location.href = "/Pages/Selection2.html";
                        return;
                    }
                }

                // normalize playeranswer
                playeranswer = savedPlayer.toLowerCase();

                img1.src = `/Assets/${toImage(playeranswer)}`;
                img2.src = `/Assets/${toImage(cpuanswer)}`;
                win();
            })();
        }
    }

    // -------- HOME PAGE BUTTONS --------
    if (playGameBtn) {
        playGameBtn.addEventListener("click", () => {
            localStorage.removeItem("p1Wins");
            localStorage.removeItem("p2Wins");
            localStorage.removeItem("bestOf");
            localStorage.removeItem("playeranswer");
            localStorage.removeItem("player2answer");
            sessionStorage.removeItem("playeranswer");
            sessionStorage.removeItem("player2answer");
            localStorage.setItem("gameMode", "cpu");
            window.location.href = "/Pages/Selection.html";
        });
    }

    const pvpBtn = document.getElementById("pvpBtn");
    if (pvpBtn) {
        pvpBtn.addEventListener("click", () => {
            localStorage.removeItem("p1Wins");
            localStorage.removeItem("p2Wins");
            localStorage.removeItem("bestOf");
            localStorage.removeItem("playeranswer");
            localStorage.removeItem("player2answer");
            sessionStorage.removeItem("playeranswer");
            sessionStorage.removeItem("player2answer");
            localStorage.setItem("gameMode", "pvp");
            window.location.href = "/Pages/Selection.html";
        });
    }

    if (howToPlayBtn) {
        howToPlayBtn.addEventListener("click", () => {
            if (rulesModal) {
                rulesModal.classList.remove("hidden");
            }
        });
    }

    if (closeRulesBtn) {
        closeRulesBtn.addEventListener("click", () => {
            if (rulesModal) {
                rulesModal.classList.add("hidden");
            }
        });
    }

    // Close rules modal when clicking outside
    if (rulesModal) {
        rulesModal.addEventListener("click", (e) => {
            if (e.target === rulesModal) {
                rulesModal.classList.add("hidden");
            }
        });
    }

    // Home button navigation
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.href = "/index.html";
        });
    }

    // ...existing code...
});

//! TELLS US HOW MANY GAME WINS NEEDED
function winsNeeded() {
    const bestOf = localStorage.getItem("bestOf") || "1";
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



//!           CODE FOR WINNER
function win() {
    const youWin =
        (playeranswer === "rock" && (cpuanswer === "lizard" || cpuanswer === "scissors")) ||
        (playeranswer === "paper" && (cpuanswer === "spock" || cpuanswer === "rock")) ||
        (playeranswer === "scissors" && (cpuanswer === "lizard" || cpuanswer === "paper")) ||
        (playeranswer === "spock" && (cpuanswer === "rock" || cpuanswer === "scissors")) ||
        (playeranswer === "lizard" && (cpuanswer === "spock" || cpuanswer === "paper"));

    let p1 = Number(localStorage.getItem("p1Wins") || "0");
    let p2 = Number(localStorage.getItem("p2Wins") || "0");
    const needed = winsNeeded();

    // TIE → show tie message
    if (playeranswer === cpuanswer) {
        if (gameResult) gameResult.textContent = "It's a tie!";
        const resultDetail = document.getElementById("resultDetail");
        if (resultDetail) resultDetail.textContent = "Both chose the same. Play again!";
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

    // Show round result (winner/loser) every round
    let roundWinner = "";
    let roundLoser = "";
    if (gameMode === "pvp") {
        if (youWin) {
            roundWinner = "PLAYER 1 WINS!";
            roundLoser = "PLAYER 2 LOSES!";
        } else {
            roundWinner = "PLAYER 2 WINS!";
            roundLoser = "PLAYER 1 LOSES!";
        }
    } else {
        if (youWin) {
            roundWinner = "YOU WIN!";
            roundLoser = "CPU LOSES!";
        } else {
            roundWinner = "CPU WINS!";
            roundLoser = "YOU LOSE!";
        }
    }
    if (gameResult) gameResult.textContent = roundWinner;
    const resultDetail = document.getElementById("resultDetail");
    if (resultDetail) resultDetail.textContent = roundLoser;

    // If match is finished, update button and show final result
    if (p1 >= needed || p2 >= needed) {
        if (playAgain) {
            playAgain.textContent = "New Match";
        }
    } else {
        if (playAgain) {
            playAgain.textContent = "NEXT RND";
        }
    }
}