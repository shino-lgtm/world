const flags = [
  { name: "Japan", img: "https://flagcdn.com/w320/jp.png" },
  { name: "France", img: "https://flagcdn.com/w320/fr.png" },
  { name: "Brazil", img: "https://flagcdn.com/w320/br.png" },
  { name: "Germany", img: "https://flagcdn.com/w320/de.png" },
];

const flagImg = document.getElementById("flag-img");
const optionsDiv = document.getElementById("options");
const resultP = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

let currentAnswer = "";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  resultP.textContent = "";
  optionsDiv.innerHTML = "";

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
      } else {
        resultP.textContent = `不正解…正解は ${currentAnswer} でした`;
      }
    };
    optionsDiv.appendChild(btn);
  });
}

nextBtn.onclick = loadQuestion;

loadQuestion();
