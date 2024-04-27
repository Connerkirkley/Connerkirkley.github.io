import levels from '../jquerrygame/js/levels'
$(document).ready(function() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let Game = true;
    let input = true;
    
    let playerPOS
    let winningPOS

    currentLevel = levels[0]


    let GameStart = function (gameBoard) {
    let gridCol = gameBoard.length
    let gridRow = gameBoard[0].length

    $('body').append(`<div style="display:grid;grid-template-columns:repeat(${gridCol}, 10px);grid-template-rows:repeat(${gridRow}, 10px)"></div>`)



    let x = 1;
    for (let i of gameBoard) {
        let y = 1;
        for (let j of i) {
            if (j == 1) {
                $(".grid").append(`<div class="wall" style="grid-column: ${x} / ${x + 1 }; grid-row: ${y} / ${y + 1};"></div>`);
            }
            if (j == 2) {
                if (winningPOS == undefined) {
                    $(".grid").append(`<div class="winning" style="grid-column: ${x} / ${x + 1 }; grid-row: ${y} / ${y + 1};"></div>`);
                    winningPOS = [x - 1, y - 1];}
            }
            if (j == 9) {
                if (playerPOS == undefined) {
                $(".grid").append(`<div id="player" style="grid-column: ${x} / ${x + 1}; grid-row: ${y} / ${y + 1};"></div>`);
                playerPOS = [x - 1, y - 1];}
            }
            y++;
        }
        x++;
    }
    console.log(gameBoard.length);
    console.log(gameBoard[0].length);
}
    GameStart(gameBoard);
    

    $(document).on("keydown", (e) => {
        if (input) {
            console.log(e.key);
            inputCheck(e.key);
        }
    });

    $(document).on("keyup", (e) => {
        input = true;
    });

    let inputCheck = function(key) {
        switch (key) {
            case 'w':
            case 'W':
            case 'ArrowUp':
                movePlayer('up');
                break;

            case 'a':
            case 'A':
            case 'ArrowLeft':
                movePlayer('left');
                break;

            case 's':
            case 'S':
            case 'ArrowDown':
                movePlayer('down');
                break;

            case 'd':
            case 'D':
            case 'ArrowRight':
                movePlayer('right');
                break;
        }
    };

    let movePlayer = function(direction) {
        let future;
        let squares = 0;

        switch (direction) {
            case 'up':
                future = [playerPOS[0], playerPOS[1] - 1];
                while (gameBoard[future[0]][future[1]] !== 1) {
                    squares++;
                    future = [future[0], future[1] - 1];
                }
                playerPOS = [playerPOS[0], playerPOS[1] - squares];
                console.log(playerPOS);
                
                $('#player').animate({ top: `-=${squares * 10}px` }, 100);
                break;
            case 'down':
                future = [playerPOS[0], playerPOS[1] + 1];
                while (gameBoard[future[0]][future[1]] !== 1) {
                    squares++;
                    future = [future[0], future[1] + 1];
                }
                playerPOS = [playerPOS[0], playerPOS[1] + squares];
                console.log(playerPOS);
                
                $('#player').animate({ top: `+=${squares * 10}px` }, 100);
                break;
            case 'left':
                future = [playerPOS[0] - 1, playerPOS[1]];
                while (gameBoard[future[0]][future[1]] !== 1) {
                    squares++;
                    future = [future[0] - 1, future[1]];
                }
                playerPOS = [playerPOS[0] - squares, playerPOS[1]];
                console.log(playerPOS);
                
                $('#player').animate({ left: `-=${squares * 10}px` }, 100);
                break;
            case 'right':
                future = [playerPOS[0] + 1, playerPOS[1]];
                while (gameBoard[future[0]][future[1]] !== 1) {
                    squares++;
                    future = [future[0] + 1, future[1]];
                }
                playerPOS = [playerPOS[0] + squares, playerPOS[1]];
                console.log(playerPOS);
                
                $('#player').animate({ left: `+=${squares * 10}px` }, 100);
                break;
        }
    };
    let checkWin = function() {
        if (playerPOS[0] === winningPOS[0] && playerPOS[1] === winningPOS[1]) {
            return true;
        }else{
            return false;
        }}

    let game = async function() {
        while (Game) {
            await sleep(100);
            if (checkWin() === true){
                console.log('you win');
                killAllDivs();
                break;
            }
        }
        console.log('game over');
        playerPOS = undefined;
        winningPOS = undefined;
    };

    let killAllDivs = function() {
        var divs = document.getElementsByTagName('div');
        for (var i = divs.length - 1; i >= 0; i--) {
            divs[i].parentNode.removeChild(divs[i]);
        }
    }
    game();
});