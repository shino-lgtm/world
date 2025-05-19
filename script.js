const flags = [
  { name: "Japan", img: "https://flagcdn.com/w320/jp.png" },
  { name: "France", img: "https://flagcdn.com/w320/fr.png" },
  { name: "Brazil", img: "https://flagcdn.com/w320/br.png" },
  { name: "Germany", img: "https://flagcdn.com/w320/de.png" },
  { name: "Canada", img: "https://flagcdn.com/w320/ca.png" },
  { name: "Italy", img: "https://flagcdn.com/w320/it.png" },
  { name: "South Korea", img: "https://flagcdn.com/w320/kr.png" },
  { name: "United States", img: "https://flagcdn.com/w320/us.png" },
  { name: "United Kingdom", img: "https://flagcdn.com/w320/gb.png" },
  { name: "Australia", img: "https://flagcdn.com/w320/au.png" },
];

const flagImg = document.getElementById("flag-img");
const optionsDiv = document.getElementById("options");
const resultP = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

// 🎵 効果音
const correctSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-correct-answer-1992.mp3");
const wrongSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3");

let currentAnswer = "";
let score = 0;
let questionCount = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  resultP.textContent = "";
  optionsDiv.innerHTML = "";
  questionCount++;

  const question = flags[Math.floor(Math.random() * flags.length)];
  currentAnswer = question.name;
  flagImg.src = question.img;

  const choices = shuffle([
    question.name,
    ...shuffle(flags.filter(f => f.name !== question.name)).slice(0, 3).map(f => f.name)
  ]);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === currentAnswer) {
        resultP.textContent = "正解！🎉";
        correctSound.play();
        score++;
      } else {
        resultP.textContent = `不正解…正解は ${currentAnswer} でした`;
        wrongSound.play();
      }
      updateScore();
    };
    optionsDiv.appendChild(btn);
  });
}

function updateScore() {
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `スコア：${score} / ${questionCount}`;
}

nextBtn.onclick = loadQuestion;

loadQuestion();
