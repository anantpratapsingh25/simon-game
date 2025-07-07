let btn = ["yellow", "red", "green", "purple"];
let gameseq = [];
let userseq = [];
let started = false;
let level = 0;

let h3 = document.querySelector("h3");
let body = document.querySelector("body");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelup();
        document.getElementById("startBtn").style.display = "none";
    }
});

document.getElementById("startBtn").addEventListener("click", function () {
    if (!started) {
        started = true;
        levelup();
        this.style.display = "none"; // Hide start button after game starts
    }
});

function flashup(element) {
    element.classList.add("flash");
    setTimeout(function () {
        element.classList.remove("flash");
    }, 100);
}

function userflashup(element) {
    element.classList.add("user-flash");
    setTimeout(function () {
        element.classList.remove("user-flash");
    }, 100);
}

function levelup() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randindx = Math.floor(Math.random() * btn.length);
    let randcolor = btn[randindx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    flashup(randbtn);
}

function checkAns(indx) {
    if (gameseq[indx] === userseq[indx]) {
        console.log("correct sequence");
        if (gameseq.length === userseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your score was<br>${level}<br>`;
        body.style.backgroundColor = "red";

        setTimeout(function () {
            body.style.background = "linear-gradient(135deg, #2e003e, #4b0082)";
        }, 1000);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userflashup(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}

let allbuttons = document.querySelectorAll(".btn");
for (let button of allbuttons) {
    button.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    document.getElementById("startBtn").style.display = "block"; // Show start button
};