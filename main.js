// ---------------------Setup Board------------//
class Board {
    constructor(){
        this.board = [[0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0]];
        this.moved = false;
        this.gameOver = false;
        this.totalScore = 0;
        this.currentScore = 0;
        this.highestScore = localStorage.getItem("highestScore") || 0;
    }
    
    initialBoard(){
        let block1 = [0, 0];
        let block2 = [0, 0];
        while (JSON.stringify(block1) == JSON.stringify(block2)) {
            block1 = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
            block2 = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
            if (JSON.stringify(block1) != JSON.stringify(block2)) {
                if (Math.random() < .9) {
                    this.board[block1[0]][block1[1]] = 2;
                }
                else {
                    this.board[block1[0]][block1[1]] = 4;
                }
                if (Math.random() < .9) {
                    this.board[block2[0]][block2[1]] = 2;
                }
                else {
                    this.board[block2[0]][block2[1]] = 4;
                }
            }
        }

        const mainBoard = document.getElementById("board");
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const block = document.createElement("div");
                block.setAttribute('id', i.toString()+j.toString());
                block.setAttribute("class", "block");

                block.appendChild(document.createTextNode(this.board[i][j] == 0 ? "" : this.board[i][j]));
                mainBoard.appendChild(block);
            }     
        }
        rerenderBoard();
    }

    restart(){
        this.board = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
        this.moved = false;
        this.gameOver = false;
        this.totalScore = 0;
        this.currentScore = 0;
        this.generateBlock();
        this.generateBlock();
        rerenderBoard();
        document.getElementById('game-over').setAttribute("style", "display: none;");
    }

    //generate block at random empty spot
    generateBlock(){
        let done = false;
        while (!done) {
            let row = Math.floor((Math.random() * 4));
            let col = Math.floor((Math.random() * 4));
            if (this.board[row][col] == 0) {
                if (Math.random() < 0.9) {
                    this.board[row][col] = 2;
                }
                else {
                    this.board[row][col] = 4;
                }
                done = true;
            }
        }
        
        
        if (!this.availableSpace() && !this.availableMatch()){
            this.gameOver = true;
            if(this.gameOver){
                document.getElementById('game-over').setAttribute("style", "display: block;");
            }
        };
        
    }

    // ----------------game over validation -------//
    availableSpace(){
        return this.board.flat().includes(0);
    }

    availableMatch(){
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
               if (this.board[i][j] == this.board[i][j+1] || this.board[j][i] == this.board[j+1][i]){
                    return true;
               }
            }
        }
        return false
    }

    //------------------ core action -------------//
    mergeRight(){
        for (let i = 0; i < 4; i++) {
            let originRow = this.board[i];
            let newRow = originRow.filter(num => num != 0);
            this.board[i] = Array(4 - newRow.length).fill(0).concat(newRow);
            
            // merge number
            for (let j = 3; j > 0; j--) {
                if(this.board[i][j] == this.board[i][j-1]){
                    this.board[i][j] = this.board[i][j] * 2;
                    // update score for each move
                    this.totalScore += this.board[i][j];
                    if(this.totalScore > this.highestScore){
                        this.highestScore = this.totalScore;
                        localStorage.setItem("highestScore", this.highestScore);
                    }
                    this.currentScore += this.board[i][j];
                    this.board[i][j - 1] = 0;
                }
            }
            // move right again
            let row = this.board[i];
            row = row.filter(num => num != 0);
            this.board[i] = Array(4 - row.length).fill(0).concat(row);

            // check if moved
            if (JSON.stringify(originRow)!= JSON.stringify(this.board[i]) ){
                this.moved = true
            }
        }

        if(this.moved){
            this.generateBlock();
            // reset currnt turn score
            this.currentScore = 0;
            // reset moved
            this.moved = false;
        }
    }

    // helper function rotate the board
    rotateBoard(){//rotate board conter clockwise
        this.board = this.board.map((col, i) => this.board.map(row => row[3 - i]));
    }

    keyLeft(){
        this.rotateBoard();this.rotateBoard();
        this.mergeRight();
        this.rotateBoard(); this.rotateBoard();
    }
    
    keyUp(){
        this.rotateBoard(); this.rotateBoard(); this.rotateBoard();
        this.mergeRight();
        this.rotateBoard();
    }
    
    keyDown(){
        this.rotateBoard();
        this.mergeRight();
        this.rotateBoard();this.rotateBoard();this.rotateBoard();
    }

}



// ---------------Move ---------------------- //
window.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 39: //arrow right
            board.mergeRight();
            rerenderBoard();
            break;
        case 37: //arrow left
            board.keyLeft();
            rerenderBoard();
            break;
        case 38: //arrow up
            board.keyUp();
            rerenderBoard();
            break;
        case 40: //arrow down
            board.keyDown();
            rerenderBoard();
            break;
    }

});




// ---------------- rerender board -------------- //
function rerenderBoard(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let block = document.getElementById(i.toString() + j.toString());
            let val = board.board[i][j];
            if (val == 0) {
                block.innerHTML = "";
                block.className = 'block block-0';
            } else {
                block.innerHTML = val;
                block.className = `block block-${val}`;
            }
        }
    }

    // update score-board
    document.getElementById('score').innerHTML = board.totalScore;
    document.getElementById('highest').innerHTML = board.highestScore;
}






let board = new Board();
window.addEventListener('DOMContentLoaded', () => {
    board.initialBoard();
})

// window.board = board;

