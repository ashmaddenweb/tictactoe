let tile = document.querySelectorAll(".tile");
let resetButton = document.getElementById("reset-button");
const player = createPlayer();
const opponent = createPlayer();
const newGame = gameRules();

// Creates a new player object 
function createPlayer(playerName, playerChar) {
    return {
        playerName: playerName,
        playerChar: playerChar,
        score: [],
        playerTries: 0,
        playerScoreDisplay() {
            return this.score;
        }
    };
}

// Creates a new game environment with rules and settings
function gameRules() {
    return {
        win: [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [3, 5, 7],
            [4, 5, 6],
            [7, 8, 9]
        ]
    }
}

// Whichever tile the player clicks will display an "X" character
function startGame() {

    // checks if space on board is taken or not for players move
    for (let i = 0; i < tile.length; i++) {
        tile[i].addEventListener("click", function() {
            if (tile[i].innerHTML === "") {
                player.score.push(parseInt(tile[i].id));
                player.playerTries++;
                tile[i].appendChild(document.createTextNode("X"));
                return opponentTurn(newGame.win, opponent, player);
            }

            // Checks the squares selected by the player once they have had 3 turns and calculates if it's a win or not. 
            if (player.playerTries > 2) {
                for (let i = 0; i < newGame.win.length; i++) {
                    if (player.score.includes(newGame.win[i][0]) && player.score.includes(newGame.win[i][1]) && player.score.includes(newGame.win[i][2])) {
                        return alert("You Win!");
                    }
                }
            }
        });
    };
}

// Chooses opponents move based on situation 
function opponentTurn(gameRules, opponent, player) {
    opponent.playerTries++;

    // Loops through all of the tiles on each instance of this function, to ensure none have been missed
    for (let i = 0; i < tile.length; i++) {
        if (tile[i].innerHTML === "") {

            // Logic for the AI 
            for (let j = 0; j < gameRules.length; j++) {
                if (opponent.score.includes(gameRules[j][0]) && opponent.score.includes(gameRules[j][1])) {
                    if (document.getElementById(gameRules[j][2]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[j][2]));
                        document.getElementById(gameRules[j][2]).innerHTML = "O";
                        return alert("Opponent Wins!");
                    }
                }
                if (opponent.score.includes(gameRules[j][1]) && opponent.score.includes(gameRules[j][2])) {
                    if (document.getElementById(gameRules[j][0]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[j][0]));
                        document.getElementById(gameRules[j][0]).innerHTML = "O";
                        return alert("Opponent Wins!");

                    }
                }
                if (opponent.score.includes(gameRules[j][2]) && opponent.score.includes(gameRules[j][0])) {
                    if (document.getElementById(gameRules[j][1]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[j][1]));
                        document.getElementById(gameRules[j][1]).innerHTML = "O";
                        return alert("Opponent Wins!");
                    }
                }
            }

            for (let k = 0; k < gameRules.length; k++) {
                if (player.score.includes(gameRules[k][0]) && player.score.includes(gameRules[k][1])) {
                    if (document.getElementById(gameRules[k][2]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[k][2]));
                        return document.getElementById(gameRules[k][2]).innerHTML = "O";
                    }
                }
                if (player.score.includes(gameRules[k][2]) && player.score.includes(gameRules[k][0])) {
                    if (document.getElementById(gameRules[k][1]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[k][1]));
                        return document.getElementById(gameRules[k][1]).innerHTML = "O";
                    }
                }
                if (player.score.includes(gameRules[k][1]) && player.score.includes(gameRules[k][2])) {
                    if (document.getElementById(gameRules[k][0]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[k][0]));
                        return document.getElementById(gameRules[k][0]).innerHTML = "O";
                    }
                }
            }
        };
    }

    function randomMove() {
        for (let i = 0; i < tile.length; i++) {
            let num = Math.floor(Math.random() * 9) + 1;
            if (document.getElementById(num).innerHTML === "") {
                opponent.score.push(parseInt(num));
                return document.getElementById(num).innerHTML = "O";
            }
        }
    }
    randomMove();
}

// Reloads the page when you click the "Reset" button
resetButton.addEventListener("click", function() {
    window.location.reload();
});

startGame();