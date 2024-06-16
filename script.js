const box = document.querySelectorAll(".box");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");
let X ="<img src='x.png'>";
let O = "<img src='o.png'>";
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = X;
let player="X";
let running = false;
init();
function init() {
    box.forEach(box=>box.addEventListener("click",boxClick));
    resetButton.addEventListener("click",resetBoard);
    statusText.textContent = `${player} turn`;
    running=true;
}

function boxClick()
{   
    console.log(this.dataset.index);
    if(options[this.dataset.index] != "" || !running)
    {
        return;
    }
    updateBox(this,this.dataset.index);
    checkWinner();
}

function updateBox(box,index)
{
    options[index] = player;
    box.innerHTML = currentPlayer;
    
}

function changePlayer()
{
    player = (player == "X") ? "O" : "X";
    currentPlayer = (currentPlayer == X) ? O : X;
    statusText.textContent = `${player} turn`;
}


function checkWinner()
{

    let isWon=false;
    for(let i=0;i<win.length;i++)
    {
        const condition = win[i];
        let a = options[condition[0]];
        let b = options[condition[1]];
        let c = options[condition[2]];
        if(a==""||b==""||c=="")
        {
            continue;
        }
        if(a==b&&b==c)
        {
            isWon = true;
            box[condition[0]].classList.add("win");
            box[condition[1]].classList.add("win");
            box[condition[2]].classList.add("win");
        }        
    }
    if(isWon)
    {
        statusText.textContent = `${player} won`;
        running = false;
    }
    else if(!options.includes(""))
    {
        statusText.textContent = `Draw`;
        running = false;
    }
    else
    {
        changePlayer();
    }
}

function resetBoard()
{
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${player} turn`;
    box.forEach(box=>box.innerHTML = "");
    player = "X"; 
    running = true;
    box.forEach(box=>
        {
            box.classList.remove("win");
        }
    )
}




