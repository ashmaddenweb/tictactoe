let tile = document.querySelectorAll(".tile");
let resetButton = document.getElementById("reset-button");

// Creates a new player object 
function createPlayer(playerName, playerChar) {
    return {
        playerName: playerName,
        playerChar: playerChar,
        playerScore: [],
        playerTries: 0,
        playerScoreDisplay() {
            return this.playerScore;
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

const player = createPlayer();
const newGame = gameRules();

// Whichever tile the player clicks will display an "X" character
for (let i = 0; i < tile.length; i++) {
    tile[i].addEventListener("click", function() {
        if (tile[i].innerHTML === "") {
            player.playerScore.push(parseInt(tile[i].id));
            player.playerTries++;
            tile[i].className = "text-style";
            tile[i].appendChild(document.createTextNode("X"));
        }
        if (player.playerTries > 2) {
            for (let i = 0; i < newGame.win.length; i++) {
                console.log(player.playerScore.sort(), "Score")
                console.log(newGame.win[i]);
                if (player.playerScore.includes(newGame.win[i][0]) && player.playerScore.includes(newGame.win[i][1]) && player.playerScore.includes(newGame.win[i][2])) {
                    alert("Win");
                }
            }
        }
    });
}

// Reloads the page when you click the "Reset" button
resetButton.addEventListener("click", function() {
    window.location.reload();
});