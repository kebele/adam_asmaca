/* thanks to traversy media*/

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');


const words = ['galatasaray', 'fenerbahçe', 'beşiktaş', 'trabzonspor', 'ankara', 'izmir', 'elma', 'armut', 'muz', 'domates', 'kayseri'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

// const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd'];
const correctLetters = [];
const wrongLetters = [];


//show the hidden word
function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
                </span>`)
        .join('')}`;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    // console.log(wordEl.innerText, innerWord);
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'aferin, kazandın';
        popup.style.display = 'flex';
    }
}

//update the wrong letters
function updateWrongLettersEl(){
    // console.log('update wrong');
    //display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>yanlış</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'kaybettin';
        popup.style.display = 'flex';
    }
}


//show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    }, 2000);
}


//keydown letter press
window.addEventListener('keydown', e => {
    //console.log(e.keyCode);
    if(e.keyCode >= 65 && e.keyCode <=90 || e.keyCode >= 219 && e.keyCode <= 222 || e.keyCode == 186 || e.keyCode == 191 ){
        // console.log(123);
        const letter = e.key;
        
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//restart game and play again
playAgainBtn.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = '';
})


displayWord();