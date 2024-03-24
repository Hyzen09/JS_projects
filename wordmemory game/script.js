async function getapi() {
    try {
        let response = await fetch(api);
        if (!response.ok) {
            throw new Error("Response Not Ok");
        }
        let data = await response.json();
        questions = data.results;
        DisplayQuestion();
    } catch (error) {
        console.error("Error In response Catch", error);
    }
}

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');

const start = document.querySelector('#start');
const loader = document.querySelector('.loader');

start.addEventListener('click', () => {
    p1.style.display = 'none';
    p2.style.display = 'flex';
});

