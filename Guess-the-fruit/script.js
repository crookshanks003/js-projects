const words = ["apple", "banana", "pineapple", "pear", "watermelon", "coconut", "grapes", "papaya", "peach", "tomato", "jackfruit"];
const max = words.length;

let winning = Math.floor(Math.random()*max);
let guessLeft = 3;
const winningWord = words[winning];
let gameOver = false;

const game = document.getElementById('game');
const word = document.getElementById('word');
const guessWord = document.querySelector('input');
const btn = document.querySelector('button');
const message = document.querySelector('#message');

btn.addEventListener('click', compare)
document.addEventListener("DOMContentLoaded", loadWord)

function compare(e){
    if (gameOver === false){
        if (guessWord.value.toLocaleLowerCase() === winningWord){
            setMessage(`${winningWord} is the correct answer. You won!`, 'text-success mt-1')
            guessWord.disabled = true;
            btn.textContent = 'Play';
            gameOver = true;
        } else {
            guessLeft -= 1;
            if (guessLeft === 0){
                guessWord.disabled = true;
                setMessage(`You Lost! ${winningWord} was the correct answer`,'text-danger mt-1');
                btn.textContent = "Play";
                gameOver = true;
            } else {
                setMessage(`This is a wrong answer. You have ${guessLeft} attempts left.`, 'text-danger mt-1');
            }
        }
        guessWord.value = ""
    } else {
        window.location.reload();
    }
}

function loadWord(){
    const randomNum = new Set();
    let l = Math.floor(winningWord.length/2);
    while (randomNum.size < l){
        randomNum.add(Math.floor(Math.random()*winningWord.length));
    }
    for (let i = 0; i < winningWord.length; i++) {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.style.display = 'inline';
        p.textContent = (randomNum.has(i)) ? winningWord[i] : "";   
        div.appendChild(p);
        div.className = "underline mx-1";
        word.appendChild(div);
    }
}

function setMessage(msg, cls){
    message.textContent = msg;
    message.className = cls;
}