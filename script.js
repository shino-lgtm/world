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
  { name: "Spain", img: "https://flagcdn.com/w320/es.png" },
  { name: "China", img: "https://flagcdn.com/w320/cn.png" },
  { name: "Mexico", img: "https://flagcdn.com/w320/mx.png" },
  { name: "India", img: "https://flagcdn.com/w320/in.png" },
  { name: "Russia", img: "https://flagcdn.com/w320/ru.png" },
  { name: "Sweden", img: "https://flagcdn.com/w320/se.png" },
  { name: "Switzerland", img: "https://flagcdn.com/w320/ch.png" },
  { name: "Netherlands", img: "https://flagcdn.com/w320/nl.png" },
  { name: "Argentina", img: "https://flagcdn.com/w320/ar.png" },
  { name: "Norway", img: "https://flagcdn.com/w320/no.png" },
  // ここにさらに国を追加できます
];

const flagImg = document.getElementById("flag-img");
const optionsDiv = document.getElementById("options");
const resultP = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const scoreDiv = document.getElementById("score");

// 効果音
const correctSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-correct-answer-1992.mp3");
const wrongSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3");

// BGM（ループ・音量調整）
const bgm = new Audio("https://assets.mixkit.co/music/preview/mixkit-arcade-retro-game-over-213.mp3");
bgm.loop = true;
bgm.volume = 0.3;
bgm.play().catch(() => {
  // 自動再生制限があるブラウザ用。ユーザー操作待ちにする処理など追加可能。
});

let currentAnswer = "";
let score = 0;
let questionCount = 0;
const maxQuestions = 10;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  if (questionCount >= maxQuestions) {
    resultP.textContent = `🎉 終了！あなたのスコアは ${score} / ${maxQuestions} です`;
    optionsDiv.innerHTML = "";
    nextBtn.style.display = "none";
    return;
  }

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

  updateScore();
}

function updateScore() {
  scoreDiv.textContent = `スコア：${score} / ${questionCount}`;
}

nextBtn.onclick = loadQuestion;

loadQuestion();
