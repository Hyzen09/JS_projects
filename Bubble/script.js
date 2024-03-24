const box = document.querySelector("#contener")
const main = document.querySelector("main")
// const bubble = document.querySelector("#bubble_box");
const number = document.querySelector("#number h1");
const counter = document.querySelector("#timer");
const scoreboard = document.querySelector("#score h1");
const bubble_box = document.querySelector("#bubble_box");
var rand;
let score = 0
let min = 0
let max = 10
function creatBubble() {
    let bubbles = ``;
    for (let i = 0; i < 120; i++) {
        var randomnum = Math.floor(Math.random() * (max - min)) + min;
        bubbles += `
        <div class="bubble">
            <h3>${randomnum}</h3>
        </div>
        `
    }
    scoreboard.innerHTML = `${score}`;
    bubble_box.innerHTML = bubbles;

}

function starttimer() {
    var timer = 60
    const interval = setInterval(() => {
        counter.innerHTML = `<h2>${timer}</h2> `
        timer = timer - 1
        if (timer == -1) {
            box.innerHTML = `<h1>time out  <br> <br> you'r Score :- ${score}</h1>`;
            clearInterval(interval);
            main.style.backgroundColor = "#FF204E"
            bubble_box.style.backgroundColor = "#A0153E"
            box.style.backgroundColor = "#A0153E"
        }
    }, 600);
}

function checkans() {
    box.addEventListener('click', (event) => {
        const clicked = event.target
        if (parseInt(clicked.textContent) == rand) {
            score += 1;
            creatBubble();
            generateRand();

        }
    })
}



function generateRand() {
    rand = Math.floor(Math.random() * (max - min)) + min;

    number.textContent = rand;
}
function startGame() {
    generateRand();
    creatBubble();
    starttimer()
    checkans();
}

startGame()