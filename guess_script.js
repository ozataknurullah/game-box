const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumsArr;

const play = () => {
  const userGuess = guessInput.value;
  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    alert("Lütfen 1 ile 100 arasında geçerli bir sayı girin.");
    return;
  }
  guessedNumsArr.push(userGuess);
  noOfGuesses += 1;
  if (userGuess != answer) {
    if (userGuess < answer) {
      hint.innerHTML = "Çok düşük. Tekrar deneyin!";
    } else {
      hint.innerHTML = "Çok yüksek. Tekrar deneyin!";
    }
    noOfGuessesRef.innerHTML = `<span>Hayır. Tamin sayısı:</span> ${noOfGuesses}`;
    guessedNumsRef.innerHTML = `<span>Tahmin edilen sayı: </span>${guessedNumsArr.join(
      ","
    )}`;
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    hint.innerHTML = `Tebrikler!<br>Seçilen sayı <span>${answer}</span>.<br>Sayıyı <span>${noOfGuesses} </span>defada buldun.`;
    hint.classList.add("success");
    game.style.display = "none";
    restartButton.style.display = "block";
  }
};

const init = () => {
  console.log("Game Started");
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer);
  noOfGuesses = 0;
  guessedNumsArr = [];
  noOfGuessesRef.innerHTML = "Hayır. Tamin sayısı: 0";
  guessedNumsRef.innerHTML = "Tahmin edilen sayılar: None";
  guessInput.value = "";
  hint.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
});

restartButton.addEventListener("click", () => {
  game.style.display = "grid";
  restartButton.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success");
  init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);