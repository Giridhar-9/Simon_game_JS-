//Select the required elements
let body = document.querySelector("body")
let level = document.querySelector("h4")
let playground = document.querySelector(".play-area")
let box = document.querySelectorAll(".box")
let help = document.querySelector("#help-btn")
let start = document.querySelector("#start-btn")

//Initialisation Of Variables
let sequence = []//system sequence
let userSequence = []//user selection
let started = false
let levelnum = 1
let score = 0
let num = 0//incremented each time the user's selection is correct
let clicks = 0 //count user clicks to check each selection

//core logic building
//starting the game
start.addEventListener("click", () => {
    if (started == false) {
        started = true;
        selectBox();
    }
})
//Adding functionality the help button 
help.addEventListener("click", () => {
    if (started == false) {
        alert(`please start the game`)
    }
    else {
        alert(`The order is ${sequence}`)
    }
})
//1.order building
function selectBox() {
    level.innerText = `Level ${levelnum}` //display level
    levelnum++;
    let rand = Math.floor((Math.random() * 4))//select a random box
    sequence.push(box[rand].id)//add the selection to system sequence
    display(rand)//display the selected box
}
//display the initial order
function display(rand) {
    box[rand].classList.add("flash")//adds the flashing effect to indicate the system selection 
    setTimeout(() => {
        box[rand].classList.remove("flash")
    }, 300)//Remove the flash effect after 0.3s
}
//Store the user's activity
playground.addEventListener("click", (e) => {
    if (started)/*Checks if the user has started the game or not*/ {
        if (e.target.className == "box") {
            clicks++//counts user clicks
            userSequence.push(e.target.id)//adds the user selection to user sequence
            check()//checks the users selection
        }
    }
    else/*executed if the user clicks the buttons without starting the game*/{
        alert("Please start the game")
    }
})
//To check if the user input is correct
function check() {
    if (userSequence[clicks - 1] == sequence[clicks - 1])/*checks each of the user.s selections*/ {
        num++//This states that each of the user input is correct
        if (num == sequence.length && num != 0)/*Accessed when the complete user input and sustem selections match*/ {
            score += 10
            clicks = 0//Made zero to take all the inputs till present
            num = 0//Made zero to check all the inputs till present
            userSequence = []//Takes the inputs of user till present
            setTimeout(selectBox, 500)
        }
    }
    else/*Executed as soon as one of the use input is wrong*/ {
        alert(`You Lose :(\nScore: ${score}\nThe Order was : ${sequence}`)
        reset()
    }
}
//used to reset if required
function reset() {
    started = false
    sequence = []
    userSequence = []
    score = 0
    clicks = 0
    num = 0
    levelnum = 1
    level.innerText = "(Press the start button to begin)"
}
