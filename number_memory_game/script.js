const start = document.querySelector('#start');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');
const p4 = document.querySelector('#p4');
const ans = document.querySelector('#p4 h1');
const score = document.querySelector('#p4 h2');
const submit = document.querySelector('#submit');
const next = document.querySelector('#next');
const restart = document.querySelector('#restart');
const input = document.querySelector('#input');
const exit = document.querySelector('#exit');
const p2_h1 = document.querySelector('#p2 h1');
const audio = document.querySelector('#audio');
const loder = document.querySelector('loder');
let min = 0;
let max = 10; 
let count = 0;
let time = 5000;
start.addEventListener('click', function () {
    p1.style.display = 'none';
    p2.style.display = 'flex';
    randomNumber = random_num_generator();
    p2_h1.textContent = randomNumber;
    startcountdown();
});

function startcountdown() {
    setTimeout(() => {
        p2.style.display = 'none';
        p3.style.display = 'flex';
    }, time);
}

function random_num_generator() {
    random_num = Math.floor(Math.random() * (max - min)) + min;
    return random_num;
}

function checkanswer() {
    p3.style.display = 'none';
    p4.style.display = 'flex';
    if (randomNumber == input.value) {
        audio.src = "./rizz-sounds.mp3";
        audio.play();
        ans.textContent = "right!!!";
        ans.style.color = 'white';

        next.style.display = 'flex';
        restart.style.display = 'none';
        count++;
        score.innerHTML = `score - ${count}`;
        input.value = "";
    }
    else {
        if (count == 0) {
            audio.src = "./gay-echo.mp3";
            audio.play();
        } else {
            audio.src = "./movie_1.mp3";
            audio.play();
        }
        ans.textContent = "wrong...";
        ans.style.color = '#cc0000';
        next.style.display = 'none';
        restart.style.display = 'flex';
        score.innerHTML = `score - ${count}`;
        input.value = "";
    }
}

submit.addEventListener('click', function () {
    checkanswer();
});

next.addEventListener('click', function () {
    max = max * 10;
    min = min * 10;
    p4.style.display = 'none';
    p2.style.display = 'flex';
    randomNumber = random_num_generator();
    p2_h1.textContent = randomNumber;
    startcountdown();
});

restart.addEventListener('click', function () {
    max = 10
    min = 0
    count = 0
    p4.style.display = 'none';
    p2.style.display = 'flex';
    randomNumber = random_num_generator();
    p2_h1.textContent = randomNumber;
    startcountdown();
})

exit.addEventListener('click', function () {
    max = 10
    min = 0
    count = 0
    p4.style.display = 'none';
    p1.style.display = 'flex';
})