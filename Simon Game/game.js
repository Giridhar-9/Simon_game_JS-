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
let num = 0
let clicks = 0 //count user clicks
let hclicks = 0 //to check help is clicked or not

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
    box[rand].classList.add("flash")
    setTimeout(() => {
        box[rand].classList.remove("flash")
    }, 300)
}
//Store the user's activity
playground.addEventListener("click", (e) => {
    if (started) {
        if (e.target.className == "box") {
            clicks++
            userSequence.push(e.target.id)
            check()
        }
    }
    else {
        alert("Please start the game")
    }
})
//To check if the user input is correct
function check() {
    if (userSequence[clicks - 1] == sequence[clicks - 1]) {
        num++
        if (num == sequence.length && num != 0) {
            score += 10
            clicks = 0
            num = 0
            userSequence = []
            if (levelnum == 10) {
                alert(`Congractulations you have won the game.\nScore:${score + 10}`)
                reset()
            }
            setTimeout(selectBox, 500)
        }
    }
    else {
        alert(`You Lose; Score ${score}`)
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