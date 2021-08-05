// Couple of things to fix:
    // Styling
        // background color
        // try to add different shape sizes of X and O
        // try to add a clickable effect and add some click sound
        // div should not change size when being clicked
        // improve X and O styles
        // indicate the next player
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
// [0][0] [0][1] [0][2]
// [1][0] [1][1] [1][2]
// [2][0] [2][1] [2][2] 
// some logic
// so first create a 2D array 9x9
    // [[]]
// when a player makes a move
    // check if cell is empty
        // if so add the player move onto 2D array
    // then check if the cells match
        // if so then, then game over ! and announce winner
        //  Rows
        //  [0][0] === "X" && [0][1] === "X" && [0][2] === "X"
        //  [1][0] === "X" && [1][1] === "X" && [1][2] === "X"
        //  [2][0] === "X" && [2][1] === "X" && [2][2] === "X"
        //  Columns
        //  [0][0] === "X" && [1][0] === "X" && [2][0] === "X"
        //  [0][1] === "X" && [1][1] === "X" && [2][1] === "X"
        //  [0][2] === "X" && [1][2] === "X" && [2][2] === "X"
        //  Diagonals
        //  [0][0] === "X" && [1][1] === "X" && [2][2] === "X"
        //  [0][2] === "X" && [1][1] === "X" && [2][0] === "X"
    // if no match and 2D is full then, then game over and a tie

// Improvised Enum (Javascript does not have enums apparently)
const PLAYER_ROLE = {
   PLAYER_ROLE_X: "X",
   PLAYER_ROLE_O: "O"
};
Object.freeze(PLAYER_ROLE);

let PLAYER_X_TURN = true;
let PLAYER_O_TURN = false;


// const PLAYER_ROLES = [PLAYER_TURN.PLAYER_ROLE_X, PLAYER_TURN.PLAYER_ROLE_O];
const BOARD = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

// function to reset the game
function resetGame(){
    // clear board
    // BOARD = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    // also clear the cell divs
    PLAYER_X_TURN = false;
    PLAYER_O_TURN = false; 
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            BOARD[i][j] = 0;
            let index = i + "" + j;
            document.getElementById(index).src = "./images/Background.png";
        }
    } 
}

// function to check winner
function checkWinner(player_role){
    if ((BOARD[0][0] === player_role && BOARD[0][1] === player_role && BOARD[0][2] === player_role) ||
        (BOARD[1][0] === player_role && BOARD[1][1] === player_role && BOARD[1][2] === player_role) ||
        (BOARD[2][0] === player_role && BOARD[2][1] === player_role && BOARD[2][2] === player_role) ||
             
        (BOARD[0][0] === player_role && BOARD[1][0] === player_role && BOARD[2][0] === player_role) ||
        (BOARD[0][1] === player_role && BOARD[1][1] === player_role && BOARD[2][1] === player_role) ||
        (BOARD[0][2] === player_role && BOARD[1][2] === player_role && BOARD[2][2] === player_role) ||
        
        (BOARD[0][0] === player_role && BOARD[1][1] === player_role && BOARD[2][2] === player_role) ||
        (BOARD[0][2] === player_role && BOARD[1][1] === player_role && BOARD[2][0] === player_role)){
            return true;
    } else {
        return false;
    }
}

// function to set the move to the DOM
function displayToDOM(x, y, player_role){
    let index = x + "" + y;
    if (player_role === "X"){
        document.getElementById(index).src = "./images/X-BlueCharacter.png";
    } else {
        document.getElementById(index).src = "./images/O-BlueCharacter.png";
    }   
}

// function to return the frequency of an item
function frequency(arr, player_role){
    let counter = 0;
    for (let i = 0; i < 3; i++){
        if (arr[i] === player_role){
            counter++;
        }
    }
    return counter;
}

// function that plays against (computer player)
function computerPlayer(player_type){
    // [0][0] [0][1] [0][2]
    // [1][0] [1][1] [1][2]
    // [2][0] [2][1] [2][2]
    // defense side or blocking
        // so if player has two matches in a row or column or diagonal
        // block the third match
        // Row matches (use of some array methods here)
        // X X 0 || 0 X X || X 0 X
        // * * * || * * * || * * *
        // * * * || * * * || * * *
        
        // * * * || * * * || * * *
        // X X 0 || 0 X X || X 0 X
        // * * * || * * * || * * *

        // * * * || * * * || * * *
        // * * * || * * * || * * *
        // X X 0 || 0 X X || X 0 X

        // ([0][0] === "X" && [0][1] === "X") || ([0][1] === "X" && [0][2] === "X") || ([0][0] === "X" && [0][2] === "X")
            // check two matches in the row, if they exist, see if there is a null position, if so return the index
        // ([1][0] === "X" && [1][1] === "X") || ([1][1] === "X" && [1][2] === "X") || ([1][0] === "X" && [1][2] === "X")
            // check two matches in the row, if they exist, see if there is a null position, if so return the index
        // ([2][0] === "X" && [2][1] === "X") || ([2][1] === "X" && [2][2] === "X") || ([2][0] === "X" && [2][2] === "X")
            // check two matches in the row, if they exist, see if there is a null position, if so return the index

        for (let i = 0; i < 3; i++){
            if (frequency(BOARD[i], player_type) === 2 && BOARD[i].includes(0) && PLAYER_O_TURN === true){
                let index = BOARD[i].indexOf(0);
                BOARD[i][index] = player_type;
                displayToDOM(i, index, player_type);
                PLAYER_X_TURN = true;
                PLAYER_O_TURN = false;
            }
        }

        // Column matches (use of some array methods here)
        // X * * || 0 * * || X * *
        // X * * || X * * || 0 * *
        // 0 * * || X * * || X * *
        
        // * * X || * 0 * || * X *
        // * * X || * X * || * 0 *
        // * * 0 || * X * || * X *

        // * * X || * * 0 || * * X
        // * * X || * * X || * * 0
        // * * 0 || * * X || * * X

        // ([0][1] === "X" && [1][0] === "X") || ([1][0] === "X" && [2][0] === "X") || ([0][0] === "X" && [2][0] === "X")
            // check two matches in the row, if they exist, see if there is a null position, if so return the index
        // ([0][1] === "X" && [1][1] === "X") || ([1][1] === "X" && [2][1] === "X") || ([0][1] === "X" && [2][1] === "X")
            // check two matches in the row, if they exist, see if there is a null position, if so return the index
        // ([0][2] === "X" && [1][2] === "X") || ([1][2] === "X" && [2][2] === "X") || ([0][2] === "X" && [2][2] === "X")
            // check two matches in the row, if they exist, see if there is a null position, if so return the index

        let columnArr1 = [];
        for (let j = 0; j < 3; j++){
            columnArr1.push(BOARD[j][0]);
        }

        if (frequency(columnArr1, player_type) === 2 && columnArr1.includes(0) && PLAYER_O_TURN === true){
            let index1 = columnArr1.indexOf(0);
            BOARD[index1][0] = player_type;
            displayToDOM(index1, 0, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        }
        
        let columnArr2 = [];
        for (let k = 0; k < 3; k++){
            columnArr2.push(BOARD[k][1]);
        }

        if (frequency(columnArr2, player_type) === 2 && columnArr2.includes(0) && PLAYER_O_TURN === true){
            let index2 = columnArr2.indexOf(0);
            BOARD[index2][1] = player_type;
            displayToDOM(index2, 1, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        }

        let columnArr3 = [];
        for (let l = 0; l < 3; l++){
            columnArr3.push(BOARD[l][2]);
        }

        if (frequency(columnArr3, player_type) === 2 && columnArr3.includes(0) && PLAYER_O_TURN === true){
            let index3 = columnArr3.indexOf(0);
            BOARD[index3][2] = player_type;
            displayToDOM(index3, 2, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        }

        // block diagonal match
        // 0 * * || X * * || X * *
        // * X * || * 0 * || * X *
        // * * X || * * X || * * 0

        let diagonalArr1 = [];
        for (let n = 0; n < 3; n++){
            diagonalArr1.push(BOARD[n][n]);
        }

        if (frequency(diagonalArr1, player_type) === 2 && diagonalArr1.includes(0) && PLAYER_O_TURN === true){
            let ind1 = diagonalArr1.indexOf(0);
            BOARD[ind1][ind1] = player_type;
            displayToDOM(ind1, ind1, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        }

        // * * 0 || * * X || * * X
        // * X * || * 0 * || * X *
        // X * * || X * * || 0 * *
        let diagonalArr2 = [];
        let last = 2; 
        for (let t = 0; t < 3; t++){
            diagonalArr2.push(BOARD[t][last]);
            last--;
        }

        if (frequency(diagonalArr2, player_type) === 2 && diagonalArr2.includes(0) && PLAYER_O_TURN === true){
            let ind2 = diagonalArr2.indexOf(0);
            BOARD[ind2][2-ind1] = player_type;
            displayToDOM(ind2, 2-ind1, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        }

    // offesive side or attacking
        // so try to match three cells in a row or column or diagonal
        // so try to checkmate the player like here visually (of course will turn it into code)
        // * * * || X * * || X X * || X X X
        // * * * || * * * || * * * || * * *
        // * * * || * * * || * * * || * * *
        // if the row includes an X only and not only O and there's a 0
            // then add a move
            // so we do this check for all the rows
        for (let m = 0; m < 3; m++){
            if ((BOARD[m].includes(PLAYER_ROLE.PLAYER_ROLE_O) || BOARD[m].includes(0)) && BOARD[m].includes(PLAYER_ROLE.PLAYER_ROLE_X) !== true && PLAYER_O_TURN === true){
                let index4 = BOARD[m].indexOf(0);
                BOARD[m][index4] = player_type;
                displayToDOM(m, index4, player_type);
                PLAYER_X_TURN = true;
                PLAYER_O_TURN = false;
            }
        }

        // we need to do the same for columns
        if ((columnArr1.includes(PLAYER_ROLE.PLAYER_ROLE_O) || columnArr1.includes(0)) && columnArr1.includes(PLAYER_ROLE.PLAYER_ROLE_X) !== true && PLAYER_O_TURN === true){
            let indx1 = columnArr1.indexOf(0);
            BOARD[indx1][0] = player_type;
            displayToDOM(indx1, 0, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;   
        } else if ((columnArr2.includes(PLAYER_ROLE.PLAYER_ROLE_O) || columnArr2.includes(0)) && columnArr2.includes(PLAYER_ROLE.PLAYER_ROLE_X) !== true && PLAYER_O_TURN === true){
            let indx2 = columnArr2.indexOf(0);
            BOARD[indx2][1] = player_type;
            displayToDOM(indx2, 1, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        } else if ((columnArr3.includes(PLAYER_ROLE.PLAYER_ROLE_O) || columnArr3.includes(0)) && columnArr3.includes(PLAYER_ROLE.PLAYER_ROLE_X) !== true && PLAYER_O_TURN === true){
            let indx3 = columnArr3.indexOf(0);
            BOARD[indx3][2] = player_type;
            displayToDOM(indx3, 2, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        }

        // we need to do the same for the diagonals 
        if ((diagonalArr1.includes(PLAYER_ROLE.PLAYER_ROLE_O) || diagonalArr1.includes(0)) && diagonalArr1.includes(PLAYER_ROLE.PLAYER_ROLE_X) !== true && PLAYER_O_TURN === true){
            let id1 = diagonalArr1.indexOf(0);
            BOARD[id1][id1] = player_type;
            displayToDOM(id1, id1, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;   
        } else if ((diagonalArr2.includes(PLAYER_ROLE.PLAYER_ROLE_O) || diagonalArr2.includes(0)) && diagonalArr2.includes(PLAYER_ROLE.PLAYER_ROLE_X) !== true && PLAYER_O_TURN === true){
            let id2 = diagonalArr2.indexOf(0);
            BOARD[id2][2-id2] = player_type;
            displayToDOM(id2, 2-id2, player_type);
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        } 

        // What's next?
            // Implement this attack pattern
            // X * X
            // * * *
            // X * *
            // or
            // * * X
            // * * *
            // X * X
            // or 
            // X * *
            // * * *
            // X * X
            // or 
            // X * X
            // * * *
            // * * X
}

// starter();

// function adds the move into the array
function handleMove(x, y){
    if (PLAYER_X_TURN){
        if (BOARD[x][y] === 0){
            BOARD[x][y] = PLAYER_ROLE.PLAYER_ROLE_X;
            displayToDOM(x, y, PLAYER_ROLE.PLAYER_ROLE_X);

            if (checkWinner(PLAYER_ROLE.PLAYER_ROLE_X)){
                alert("Game Over !\nPlayer " + PLAYER_ROLE.PLAYER_ROLE_X + " Wins");
            } else {
                PLAYER_X_TURN = false;
                PLAYER_O_TURN = true;
                computerPlayer(PLAYER_ROLE.PLAYER_ROLE_O);
                if (checkWinner(PLAYER_ROLE.PLAYER_ROLE_O)){
                    alert("Game Over !\nPlayer " + PLAYER_ROLE.PLAYER_ROLE_O + " Wins");
                } else {
                    PLAYER_X_TURN = true;
                    PLAYER_O_TURN = false;
                }
            }
        }
    } else {
        //  computer's turn
        computerPlayer(PLAYER_ROLE.PLAYER_ROLE_O);
        if (checkWinner(PLAYER_ROLE.PLAYER_ROLE_O)){
            alert("Game Over !\nPlayer " + PLAYER_ROLE.PLAYER_ROLE_O + " Wins");
        } else {
            PLAYER_X_TURN = true;
            PLAYER_O_TURN = false;
        }

    }   
}
