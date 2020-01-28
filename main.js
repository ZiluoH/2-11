
class Board {
    constructor(){
        this.board = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
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
            const rowDiv = document.createElement("div");
            rowDiv.className = 'row';
            for (let j = 0; j < 4; j++) {
                const block = document.createElement("div");
                block.setAttribute('id', i.toString()+j.toString());
                block.setAttribute("class", "block");

                block.appendChild(document.createTextNode(this.board[i][j] == 0 ? "_" : this.board[i][j]));
                rowDiv.appendChild(block);
            } 
            mainBoard.appendChild(rowDiv);     
        }
    }

    //generate block at random empty spot
    generateBlock(){
        if (!this.board.flat().includes(0)){
            console.log("Game over");
        } else {
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
        }
    }

    mergeRight(){
        for (let i = 0; i < 4; i++) {
            let row = this.board[i];
            row = row.filter(num => num != 0);
            this.board[i] = Array(4 - row.length).fill(0).concat(row);

            // merge number
            for (let j = 3; j > 0; j--) {
                if(this.board[i][j] == this.board[i][j-1]){
                    this.board[i][j] = this.board[i][j] * 2;
                    this.board[i][j - 1] = 0;
                }
            }
            row = this.board[i];
            row = row.filter(num => num != 0);
            this.board[i] = Array(4 - row.length).fill(0).concat(row);

        }

        this.generateBlock();
        console.log(this.board);
        
    }


}


const newBoard = new Board();
window.addEventListener('DOMContentLoaded', () => {
    newBoard.initialBoard();
})

window.newBoard = newBoard;


