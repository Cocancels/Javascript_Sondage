"use strict";
class Sondage {
  constructor(title) {
    this.title = title;
    this.questions = [];
  }

  addQuestion(question) {
    this.questions.push(question);
  }
}

class Question {
  constructor(content) {
    this.content = content;
    this.answers = [];
  }

  addAnswer(answer) {
    this.answers.push(answer);
  }
}

class Answer {
  constructor(content, isTrue) {
    this.content = content;
    this.isTrue = isTrue;
  }
}

let pseudo = document.getElementById("name").value;
document.getElementById("enregistrer").onclick = () => {
  if (document.getElementById("name").value == "") {
    alert("Vous n'avez pas rentré de pseudo");
  } else {
    pseudo = document.getElementById("name").value;
    document.querySelector("section").style.display = "block";
    document.getElementById("grande").style.display = "block";
    document.querySelector("footer").style.position = "static";
    document.getElementById("pseudo").style.display = "none";
    document.getElementById("account").innerHTML = pseudo;
    document.getElementById("oui").style.paddingTop = "0";
  }
};

const Sondage1 = new Sondage("Sondage 1");

let question1 = new Question("Quel est le vrai nom de famille de Jon Snow ?");
question1.addAnswer(new Answer("Targaryen", true));
question1.addAnswer(new Answer("Stark", false));
question1.addAnswer(new Answer("Snow", false));
question1.addAnswer(new Answer("Aucun", false));

Sondage1.addQuestion(question1);

let question2 = new Question("Suis-je");
question2.addAnswer(new Answer("Faux", true));
question2.addAnswer(new Answer("Vrai", false));
question2.addAnswer(new Answer("Je ne sais pas", false));
question2.addAnswer(new Answer("Peut-être", false));
Sondage1.addQuestion(question2);

let question3 = new Question("Qu'est ce que");
question3.addAnswer(new Answer("Faux", true));
question3.addAnswer(new Answer("True", false));
question3.addAnswer(new Answer("Faux", false));
question3.addAnswer(new Answer("True", false));
question3.addAnswer(new Answer("Faux", true));
Sondage1.addQuestion(question3);



window.onload = async() =>{
  document.getElementById("oui").style.top = "500px"
  await wait(500)
  document.getElementById("oui").style.top = "400px"
}

const wait = (ms) =>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


let k = 0;
let divNumber = 1;

let title = document.createElement("h1");
let divQuestion = document.getElementById("question");
divQuestion.appendChild(title);
document.querySelector("#question>h1").innerHTML =
  Sondage1.questions[0].content;

let divReponse = document.createElement("div");
divReponse.id = "reponse";
divQuestion.appendChild(divReponse);
divReponse.appendChild(document.createElement("div"));
document.querySelector("#reponse>div:nth-child(" + divNumber + "n)").id =
  "div" + divNumber;
divReponse = document.getElementById("div" + divNumber);
divNumber++;

for (let i = 0; i < Sondage1.questions[k].answers.length; i++) {
  if (i % 3 == 0 && i != 0) {
    divReponse = document.getElementById("reponse");
    let br = document.createElement("br");
    divReponse.appendChild(br);
    divReponse.appendChild(document.createElement("div"));
    document.querySelector("#reponse>div:nth-of-type(" + divNumber + ")").id =
      "div" + divNumber;
    divReponse = document.getElementById("div" + divNumber);
    divNumber++;
  }

  let reponse = document.createElement("p");
  divReponse.appendChild(reponse);
  reponse.className = "reponse";
  reponse.innerHTML = Sondage1.questions[k].answers[i].content;
}

if (
  document.querySelectorAll("#div" + (divNumber - 1) + " p").length == 2 ||
  document.querySelectorAll("#div" + (divNumber - 1) + " p").length == 1
) {
  document.querySelector("#div" + (divNumber - 1)).style.justifyContent =
    "space-around";
}

let reponses = document.getElementsByClassName("reponse");
let score = 0;
let nbQuestions = 1;

function changeQuestion() {
  divNumber = 1;
  for (let j = 0; j < reponses.length; j++) {
    reponses[j].onclick = () => {
      console.log(Sondage1.questions[k].answers[j].content);

      if (k == Sondage1.questions.length - 1) {
        if (Sondage1.questions[k].answers[j].isTrue == true) {
          score++;
          console.log("bon");
        }
        divQuestion.innerHTML = "";
        let result = document.createElement("p");
        result.className = "resultat";
        divQuestion.appendChild(result);
        result.innerHTML =
          pseudo +
          ", votre score est de: " +
          score +
          " / " +
          Sondage1.questions.length;
      } else {
        k++;
        divQuestion.innerHTML = "";
        let title = document.createElement("h1");
        divQuestion.appendChild(title);
        document.querySelector("#question>h1").innerHTML =
          Sondage1.questions[k].content;

        let divReponse = document.createElement("div");
        divReponse.id = "reponse";
        divQuestion.appendChild(divReponse);

        divReponse.appendChild(document.createElement("div"));
        document.querySelector(
          "#reponse>div:nth-child(" + divNumber + "n)"
        ).id = "div" + divNumber;
        divReponse = document.getElementById("div" + divNumber);
        divNumber++;

        for (let i = 0; i < Sondage1.questions[k].answers.length; i++) {
          if (i % 3 == 0 && i != 0) {
            divReponse = document.getElementById("reponse");
            let br = document.createElement("br");
            divReponse.appendChild(br);
            divReponse.appendChild(document.createElement("div"));
            document.querySelector(
              "#reponse>div:nth-of-type(" + divNumber + ")"
            ).id = "div" + divNumber;
            divReponse = document.getElementById("div" + divNumber);
            divNumber++;
          }

          let reponse = document.createElement("p");
          divReponse.appendChild(reponse);
          reponse.className = "reponse";
          reponse.innerHTML = Sondage1.questions[k].answers[i].content;
        }

        reponses = document.getElementsByClassName("reponse");

        if (
          document.querySelectorAll("#div" + (divNumber - 1) + " p").length ==
            1 ||
          document.querySelectorAll("#div" + (divNumber - 1) + " p").length == 2
        ) {
          document.querySelector(
            "#div" + (divNumber - 1)
          ).style.justifyContent = "space-around";
        }

        if (Sondage1.questions[k].answers[j].isTrue == true) {
          score++;
          console.log("bon");
        }

        changeQuestion();
      }
    };
  }
}

changeQuestion();
