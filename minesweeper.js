var MineSweeper = function(mines,height,width){
//create empty int[][]
this.grid = [];
for (let i=0;i<height;i++) this.grid.push(new Array(width))
//add bombs to random positions

let bombs = mines;
while(bombs>0){
    let x = Math.floor(Math.random() * (width-1))
    let y = Math.floor(Math.random() * (height-1))
   
    if(!this.grid[y][x]){
        this.grid[y][x]=9;        
        bombs--;
    }
} 

// fill grid with the correct int for bombs in vicinity
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {           
            if (this.grid[y][x] !== 9){
                let bombCount = this.getBombCountInVicinity([x, y]);
            this.grid[y][x] = bombCount;
            }
        }
    }


//create grid for game play
this.gameGrid = this.grid.map(row=>row.map(col=>'-'))
}

MineSweeper.prototype.getBombCountInVicinity = function (coordinates) {
    let bombCount = 0;

    for (let y = coordinates[1] - 1; y < coordinates[1] + 2 && y < this.grid.length; y++) {
        if (y == -1) y = 0;
        for (x = coordinates[0] - 1; x < coordinates[0] + 2 && x < this.grid[0].length; x++) {
            if (x == -1) x = 0;
            if (this.grid[y][x] === 9) bombCount++;
        }
    }
    return bombCount;
}

MineSweeper.prototype.getGameBoard=function(){
    console.log(this.gameGrid);
    return this.gameGrid;
}

MineSweeper.prototype.getValueAt=function(coordinates){
return this.grid[coordinates[1]][coordinates[0]];
}

MineSweeper.prototype.unveilSquare=function([x,y]){
    //return false if square doesn't need to be unveiled
    if(this.gameGrid[y][x]!=='-') return false; 
    this.gameGrid[y][x] = this.grid[y][x].toString();
    return true;
}

MineSweeper.prototype.makeSelection=function(coordinates){
let squareValue = this.getValueAt(coordinates);

if(squareValue === 9) this.gameGrid=this.grid
else if(squareValue>0) this.unveilSquare(coordinates);
else{
//if value is 0
this.unveilVicinityOfZeroSquare(coordinates);
}
//output the current board state
console.log(this.gameGrid);
return this.gameGrid;
}

//helper function that recursively unveils all surrounding empty space of the grid 
MineSweeper.prototype.unveilVicinityOfZeroSquare = function (coordinates) {

    for (let y = coordinates[1] - 1; y < coordinates[1] + 2 && y < this.grid.length; y++) {
        if (y === -1) y = 0;
        for (let x = coordinates[0] - 1; x < coordinates[0] + 2 && x < this.grid[0].length; x++) {
            if (x === -1) x = 0;

            if (this.grid[y][x] !== 0) this.unveilSquare([x, y])
            else {
                //make recursive invocation for each square of value 0 that was unveiled
                if (this.unveilSquare([x, y])) this.unveilVicinityOfZeroSquare([x, y])
            }
        }
    }
}

//example-tests:
// let game = new MineSweeper(10,7,5);
// game.getGameBoard();
// game.makeSelection([4,0]);

