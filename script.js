// Couple of things to fix:
    // Styling
        // background color
        // try to add different shape sizes of X and O
        // try to add a clickable effect and add some click sound
        // div should not change size when being clicked
        // improve X and O styles
        // indicate the next player
        // need to remove the alert
    // Logic
        // test the computer logic and make sure it works
        // try to make the computer unbeatable  
        // try to use ES6 convention (like let, const, arrow functions)
    // Hosting
        // try and use github pages for hosting
    // New feature
        // learn about web sockets and see how you can implement it here
        // try using electron.js to make it a desktop app 
// Board Coordinates
// [0] [1] [2]
// [3] [4] [5]
// [6] [7] [8] 

const PLAYER_ROLE = {
   PLAYER_ROLE_X: "X",
   PLAYER_ROLE_O: "O"
};
Object.freeze(PLAYER_ROLE);

let COMPUTER_ROLE = "";
let PLAYER = "";

let PLAYER_TURN = false;
let COMPUTER_TURN = false;

const PLAIN_BACKGROUND_IMG = "./images/Background.png";
const X_CHARACTER_IMG = "./images/X-BlueCharacter.png";
const O_CHARACTER_IMG = "./images/O-BlueCharacter.png";

const NEW_BOARD = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// event listener to for button x
document.getElementById("button-x").addEventListener('click', () => {
    PLAYER = PLAYER_ROLE.PLAYER_ROLE_X;
    COMPUTER_ROLE = PLAYER_ROLE.PLAYER_ROLE_O;
    document.getElementById("buttons").style.display = 'none'; 
    startGame();
});

// event listener to for button o
document.getElementById("button-o").addEventListener('click', () => {
    PLAYER = PLAYER_ROLE.PLAYER_ROLE_O;
    COMPUTER_ROLE = PLAYER_ROLE.PLAYER_ROLE_X;
    document.getElementById("buttons").style.display = 'none';
    startGame();
});

// event listener to reset the game
document.getElementById("reset-button").addEventListener('click', () => {
    COMPUTER_ROLE = "";
    PLAYER = "";   
    
    PLAYER_TURN = false;
    COMPUTER_TURN = false;

    for (let i = 0; i < 9; i++){
        NEW_BOARD[i] = 0;
        document.getElementById(`${i}`).src = PLAIN_BACKGROUND_IMG;
    }

    document.getElementById("buttons").style.display = 'block';
    displayMessage("Choose a Symbol");
});

// function to start the game
const startGame = () => {
    let starter = Math.floor(Math.random() * 2);
    if (starter){
        // player starts
        PLAYER_TURN = true;
        displayMessage(`Player ${PLAYER} turn`);
    } else {
        // computer starts
        COMPUTER_TURN = true;
        displayMessage(`Player ${COMPUTER_ROLE} turn`);
        computerMove(PLAYER);
        displayMessage(`Your turn`);
    }
}

// function to check winner
const checkWinner = (playerRole) => {
    if ((NEW_BOARD[0] === playerRole && NEW_BOARD[1] === playerRole && NEW_BOARD[2] === playerRole) ||
        (NEW_BOARD[3] === playerRole && NEW_BOARD[4] === playerRole && NEW_BOARD[5] === playerRole) ||
        (NEW_BOARD[6] === playerRole && NEW_BOARD[7] === playerRole && NEW_BOARD[8] === playerRole) ||

        (NEW_BOARD[0] === playerRole && NEW_BOARD[3] === playerRole && NEW_BOARD[6] === playerRole) ||
        (NEW_BOARD[1] === playerRole && NEW_BOARD[4] === playerRole && NEW_BOARD[7] === playerRole) ||
        (NEW_BOARD[2] === playerRole && NEW_BOARD[5] === playerRole && NEW_BOARD[8] === playerRole) ||

        (NEW_BOARD[0] === playerRole && NEW_BOARD[4] === playerRole && NEW_BOARD[8] === playerRole) ||
        (NEW_BOARD[2] === playerRole && NEW_BOARD[4] === playerRole && NEW_BOARD[6] === playerRole)){
        return true;
    } else {
        return false;
    }
}

// function to set the move to the DOM
const displayToDOM = (position, playerRole) => {
    if (playerRole === PLAYER_ROLE.PLAYER_ROLE_X){
        document.getElementById(`${position}`).src = X_CHARACTER_IMG;
    } else {
        document.getElementById(`${position}`).src = O_CHARACTER_IMG;
    }
}

// function to display message to the DOM
const displayMessage = (msg) => {
    document.getElementById("game-status").innerHTML = msg;
}

// function to return the frequency of an item
const frequency = (arr, playerRole) => {
    let counter = 0;
    for (let i = 0; i < 3; i++){
        if (arr[i] === playerRole){
            counter++;
        }
    }
    return counter;
}

// function that plays against (computer player)
const computerMove = (playerRole) => {
    let rows = [];
    for (let i = 0; i < 9; i += 3){
        rows = NEW_BOARD.slice(i, i+3);
        if (frequency(rows, playerRole) === 2 && rows.includes(0) && COMPUTER_TURN === true){
            let index = rows.indexOf(0) + i;
            NEW_BOARD[index] = COMPUTER_ROLE;
            displayToDOM(index, COMPUTER_ROLE);
            PLAYER_TURN = true;
            COMPUTER_TURN = false;
        }
    }

    let column1 = [];
    for (let j = 0; j < 9; j += 3){
        column1.push(NEW_BOARD[j]);
    }

    if (frequency(column1, playerRole) === 2 && column1.includes(0) && COMPUTER_TURN === true){
        let index1 = column1.indexOf(0) * 3;
        NEW_BOARD[index1] = COMPUTER_ROLE;
        displayToDOM(index1, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    }
    
    let column2 = [];
    for (let k = 1; k < 9; k += 3){
        column2.push(NEW_BOARD[k]);
    }

    if (frequency(column2, playerRole) === 2 && column2.includes(0) && COMPUTER_TURN === true){
        let index2 = (column2.indexOf(0) * 3) + 1;
        NEW_BOARD[index2] = COMPUTER_ROLE;
        displayToDOM(index2, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    }

    let column3 = [];
    for (let l = 2; l < 9; l += 3){
        column3.push(NEW_BOARD[l]);
    }

    if (frequency(column3, playerRole) === 2 && column3.includes(0) && COMPUTER_TURN === true){
        let index3 = (column3.indexOf(0) * 3) + 2;
        NEW_BOARD[index3] = COMPUTER_ROLE;
        displayToDOM(index3, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    }
    
    // block diagonal match
    // 0 * * || X * * || X * * 0 1 2
    // * X * || * 0 * || * X * 3 4 5
    // * * X || * * X || * * 0 6 7 8

    let diagonal1 = [];
    for (let n = 0; n < 9; n += 4){
        diagonal1.push(NEW_BOARD[n]);
    }

    if (frequency(diagonal1, playerRole) === 2 && diagonal1.includes(0) && COMPUTER_TURN === true){
        let diagonalIndex1 = diagonal1.indexOf(0) * 4;
        NEW_BOARD[diagonalIndex1] = COMPUTER_ROLE;
        displayToDOM(diagonalIndex1, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    }

    // * * 0 || * * X || * * X
    // * X * || * 0 * || * X *
    // X * * || X * * || 0 * *
    
    let diagonal2 = [];
    for (let t = 2; t < 7; t += 2){
        diagonal2.push(NEW_BOARD[t]);
    }

    if (frequency(diagonal2, playerRole) === 2 && diagonal2.includes(0) && COMPUTER_TURN === true){
        let diagonalIndex2 = (diagonal2.indexOf(0) * 2) + 2;
        NEW_BOARD[diagonalIndex2] = COMPUTER_ROLE;
        displayToDOM(diagonalIndex2, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    }
    
    let tempRow = [];
    for (let m = 0; m < 9; m += 3){
        tempRow = NEW_BOARD.slice(m, m+3);
        if ((tempRow.includes(COMPUTER_ROLE) || tempRow.includes(0)) && 
            tempRow.includes(playerRole) !== true && COMPUTER_TURN === true){
            let index4 = tempRow.indexOf(0) + m;
            NEW_BOARD[index4] = COMPUTER_ROLE;
            displayToDOM(index4, COMPUTER_ROLE);
            PLAYER_TURN = true;
            COMPUTER_TURN = false;
        }
    }

    // we need to do the same for columns
    if ((column1.includes(COMPUTER_ROLE) || column1.includes(0)) && 
        column1.includes(playerRole) !== true && COMPUTER_TURN === true){
        let columnIndex1 = column1.indexOf(0) * 3;
        NEW_BOARD[columnIndex1] = COMPUTER_ROLE;
        displayToDOM(columnIndex1, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;   
    } else if ((column2.includes(COMPUTER_ROLE) || column2.includes(0)) && 
        column2.includes(playerRole) !== true && COMPUTER_TURN === true){
        let columnIndex2 = (column2.indexOf(0) * 3) + 1;
        NEW_BOARD[columnIndex2] = COMPUTER_ROLE;
        displayToDOM(columnIndex2, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    } else if ((column3.includes(COMPUTER_ROLE) || column3.includes(0)) && 
        column3.includes(playerRole) !== true && COMPUTER_TURN === true){
        let columnIndex3 = (column3.indexOf(0) * 3) + 2;
        NEW_BOARD[columnIndex3] = COMPUTER_ROLE;
        displayToDOM(columnIndex3, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    }

    // we need to do the same for the diagonals 
    if ((diagonal1.includes(COMPUTER_ROLE) || diagonal1.includes(0)) && 
        diagonal1.includes(playerRole) !== true && COMPUTER_TURN === true){
        let id1 = diagonal1.indexOf(0) * 4;
        NEW_BOARD[id1] = COMPUTER_ROLE;
        displayToDOM(id1, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;   
    } else if ((diagonal2.includes(COMPUTER_ROLE) || diagonal2.includes(0)) && 
        diagonal2.includes(playerRole) !== true && COMPUTER_TURN === true){
        let id2 = (diagonal2.indexOf(0) * 2) + 2;
        NEW_BOARD[id2] = COMPUTER_ROLE;
        displayToDOM(id2, COMPUTER_ROLE);
        PLAYER_TURN = true;
        COMPUTER_TURN = false;
    }
}

// function adds the move into the array
const handleMove = (position) => {
    if (PLAYER_TURN){
        if (NEW_BOARD[position] === 0){
            NEW_BOARD[position] = PLAYER;
            displayMessage(`Your turn`);
            displayToDOM(position, PLAYER);
            console.log(NEW_BOARD,"player");
            if (checkWinner(PLAYER)){
                displayMessage(`Player ${PLAYER} Wins`);
            } else {
                PLAYER_TURN = false;
                COMPUTER_TURN = true;
                displayMessage(`Player ${COMPUTER_ROLE} turn`);
                computerMove(PLAYER);
                if (checkWinner(COMPUTER_ROLE)){
                    displayMessage(`Player ${COMPUTER_ROLE} Wins`);
                } else {
                    displayMessage(`Your turn`);
                    PLAYER_TURN = true;
                    COMPUTER_TURN = false;
                }
            }
        }
    }
}
