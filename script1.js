
var TOTAL_QUESTIONS = 15;

var questionBank = [
    {
        question: "Which HTML tag is used to link a JavaScript file?",
        options: ["<script>", "<link>", "<js>", "<code>"],
        answer: 0
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        options: ["<head>", "<h6>", "<h1>", "<heading>"],
        answer: 2
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: ["background-color", "font-color", "color", "text-style"],
        answer: 2
    },
    {
        question: "Bootstrap is mainly used for:",
        options: ["Server-side logic", "Database creation", "Responsive design", "Operating system"],
        answer: 2
    },
    {
        question: "In JavaScript, which symbol is used for single-line comments?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: 1
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "Which attribute is used in <img> tag to specify the image file?",
        options: ["href", "src", "link", "file"],
        answer: 1
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: ["bgcolor", "color", "background-color", "background-style"],
        answer: 2
    },
    {
        question: "In JavaScript, which keyword declares a variable?",
        options: ["var", "int", "real", "num"],
        answer: 0
    },
    {
        question: "Which of these is NOT a data type in JavaScript?",
        options: ["number", "string", "boolean", "real-number"],
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Styled Sections",
            "Colorful Style Sheets"
        ],
        answer: 0
    },
    {
        question: "Which HTML element is used to create a list with bullets?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: 1
    },
    {
        question: "Which JavaScript function is used to display a message box?",
        options: ["msg()", "alert()", "prompt()", "display()"],
        answer: 1
    },
    {
        question: "Which HTML tag is used to divide the page into sections?",
        options: ["<span>", "<section>", "<div>", "<part>"],
        answer: 2
    },
    {
        question: "In CSS, how do you select an element with id='main'?",
        options: [".main", "#main", "main", "*main"],
        answer: 1
    },
    {
        question: "Which of these is a JavaScript framework or library?",
        options: ["Laravel", "React", "Django", "Flask"],
        answer: 1
    },
    {
        question: "Which attribute is used in HTML forms to send data to a page?",
        options: ["href", "src", "action", "method"],
        answer: 2
    },
    {
        question: "Which HTTP method is commonly used to submit form data?",
        options: ["GET", "SUBMIT", "PUT", "CONNECT"],
        answer: 0
    },
    {
        question: "Which tag is used to insert a line break in HTML?",
        options: ["<br>", "<lb>", "<break>", "<line>"],
        answer: 0
    },
    {
        question: "Which HTML tag is used to show an image?",
        options: ["<image>", "<img>", "<pic>", "<src>"],
        answer: 1
    }
];


var selectedQuestions = [];


var userAnswers = [];


var currentIndex = 0;


var startScreen  = document.getElementById("start-screen");
var quizScreen   = document.getElementById("quiz-screen");
var resultScreen = document.getElementById("result-screen");

var qNumber = document.getElementById("question-number");
var qText   = document.getElementById("question-text");
var qOptions = document.getElementById("options");

var resultTotal      = document.getElementById("result-total");
var resultAttempted  = document.getElementById("result-attempted");
var resultCorrect    = document.getElementById("result-correct");
var resultWrong      = document.getElementById("result-wrong");
var resultPercentage = document.getElementById("result-percentage");


// --------------------------------------
// START QUIZ
function startQuiz() {


    var questionsCopy = questionBank.slice();
    questionsCopy.sort(function() {
        return Math.random() - 0.5;
    });

    selectedQuestions = questionsCopy.slice(0, TOTAL_QUESTIONS);

    userAnswers = new Array(selectedQuestions.length).fill(null);

    currentIndex = 0;

       startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
  
    showQuestion();
}

function showQuestion() {
    var q = selectedQuestions[currentIndex];


    qNumber.textContent = "Question " + (currentIndex + 1) + " of " + selectedQuestions.length;
    qText.textContent = q.question;
    qOptions.innerHTML = "";

    for (var i = 0; i < q.options.length; i++) {

        var optionDiv = document.createElement("div");
        optionDiv.className = "option-item";

        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "option";
        radio.value = i;


        if (userAnswers[currentIndex] === i) {
            radio.checked = true;
        }

 
        radio.onclick = (function (index) {
            return function () {
                chooseOption(index);
            };
        })(i);

        var label = document.createElement("label");
       
        label.textContent = q.options[i];

        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);

        qOptions.appendChild(optionDiv);
    }
}



function chooseOption(optionIndex) {
    userAnswers[currentIndex] = optionIndex;
}


function nextQuestion() {
    if (currentIndex < selectedQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion();
    }
}


function submitQuiz() {
    var correct = 0;
    var attempted = 0;

    for (var i = 0; i < selectedQuestions.length; i++) {
        var userAns = userAnswers[i];
        var correctAns = selectedQuestions[i].answer;

        if (userAns !== null) {
            attempted++;
            if (userAns === correctAns) {
                correct++;
            }
        }
    }

    var wrong = attempted - correct;
    var percentage = Math.round((correct / selectedQuestions.length) * 100);

    resultTotal.textContent      = selectedQuestions.length;
    resultAttempted.textContent  = attempted;
    resultCorrect.textContent    = correct;
    resultWrong.textContent      = wrong;
    resultPercentage.textContent = percentage;

    startScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    quizScreen.classList.add("hidden");
}

function restartQuiz() {
    startScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
}
