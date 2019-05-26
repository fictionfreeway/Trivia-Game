const source = document.getElementById('questions').innerHTML;
const template = Handlebars.compile(source);

const officeQuestions = {
    //questions are stored as objects with the answers in an array
    questions: [
    {
        //id is to be used by handlebars in the HTML document to give id names to elements
        id: 'question-one',
        question: "What is Michael Scott's middle name?",
        //answerIds are to be used as IDs and input values in the HTML doc
        answerIds: ['lee', 'gary', 'martha', 'jules'],
        answers: ['Lee', 'Gary', 'Martha', 'Jules'],
        //correctAnswer must match the currect answer's ID in answerIds, NOT the answers array
        correctAnswer: 'gary'
    },
    {
        id: 'question-two',
        question: 'In what Pennsylvania county is Dunder Mifflin located?',
        answerIds: ['luzerne', 'cambria', 'lackawanna', 'westmoreland'],
        answers: ['Luzerne', 'Cambria', 'Lackawanna', 'Westmoreland'],
        correctAnswer: 'lackawanna'
    },
    {
        id: 'question-three',
        question: 'What club is founded by Pam, Oscar, and Toby?',
        answerIds: ['finerthings', 'bookclub', 'cigarclub', 'movieclub'],
        answers: ['Finer Things', 'Book Club', 'Cigar Club', 'Movie Club'],
        correctAnswer: 'finerthings'
    },

    {
        id: 'question-four',
        question: "Where does 'The Office' take place?",
        answerIds: ["boston", "scranton", "desmoines", "danville"],
        answers: ["Boston", "Scranton", "Des Moines", "Danville"],
        correctAnswer: "scranton"
    },
    
    {
        id: 'question-five',
        question: "What does Jim put Dwight's office supplies in",
        answerIds: ['jello', 'cement', 'ice', 'pudding'],
        answers: ['Jell-o', 'Cement', 'Ice', 'Pudding'],
        correctAnswer: 'jello'
    },

    {
        id: 'question-six',
        question: "Where did Michael get his World's Best Boss mug?",
        answerIds: ['giftfromjim', 'spencers', 'hefoundit', 'walmart'],
        answers: ['Gift from Jim', "Spencer's", 'He Found It', 'Walmart'],
        correctAnswer: 'spencers'
    },

    {
        id: 'question-seven',
        question: 'What employee started out as a temp?',
        answerIds: ['pam', 'dwight', 'jim', 'ryan'],
        answers: ['Pam', 'Dwight', 'Jim', 'Ryan'],
        correctAnswer: 'ryan'
    },

    {
        id: 'question-eight',
        question: "What does Dwight's farm produce?",
        answerIds: ['potatoes', 'beets', 'carrots', 'corn'],
        answers: ['Potatoes', 'Beets', 'Carrots', 'Corn'],
        correctAnswer: 'beets'
    },

    {
        id: 'question-nine',
        question: "What is Kevin's favorite movie?",
        answerIds: ['diehard', 'achristmasstory', 'americanpie2', 'harrypotter'],
        answers: ['Die Hard', 'A Christmas Story', 'American Pie 2', 'Harry Potter'],
        correctAnswer: 'americanpie2'
    },

    {
        id: 'question-ten',
        question: "Who was the villain in Threat Level Midnight?",
        answerIds: ['goldenface', 'octoman', 'eggman', 'oscar'],
        answers: ['Goldenface', 'Octoman', 'Eggman', 'Oscar'],
        correctAnswer: 'goldenface'
    },

    ]
};


const compiledHtml = template(officeQuestions);

const displayElements = document.getElementById('quiz');
displayElements.innerHTML = compiledHtml;

//test variables to be removed later
const testAnswer = document.getElementById('7');
const testAnswer2 = document.getElementById('Gryffindor');
const testDiv = document.getElementById('question-one');


//fuction that will be called any time an answer is clicked
//this function finds the question being reference, and checks to see if the chosen answer is correct
const checkAnswer = (userAnswer, userQuestion) => {
    const findQuestion = (newQuestion) => {
        return newQuestion.id === userQuestion;
    }
    const currentQuestion = officeQuestions.questions.find(findQuestion);
    const rightAnswer = currentQuestion.correctAnswer; 
    if(userAnswer === rightAnswer) {
        return true;
    } else {
        return false;
    }
};

//hide all questions at start except for question one
for (x = 1; x < officeQuestions.questions.length; x++) {
    //finds id of each question
    let id = officeQuestions.questions[x].id;
    //hides all html elements with the an id equal to the id property of each quetion object
    document.getElementById(id).style.visibility = 'hidden';
}

//global variables
let questionNum = 0;
let numCorrect = 0;
let numIncorrect = 0;

const advanceQuestion = () => {
    if (questionNum < officeQuestions.questions.length-1) {
        let questionElem = document.getElementById(officeQuestions.questions[questionNum].id);
        questionElem.style.visibility = 'hidden';
        questionNum++;
        let nextQuestion = document.getElementById(officeQuestions.questions[questionNum].id);
        nextQuestion.style.visibility = 'visible';
    } else {
        let questionElem = document.getElementById(officeQuestions.questions[questionNum].id);
        questionElem.style.visibility = 'hidden';
        calcFinalScore();
        setTimeout(function() {
            showResults();
        }, 1000)

    }
}

//function to be called any time a correct answer is selected
const showCorrect = () => {
    let correctDiv = document.getElementById('correct');
    correctDiv.style.zIndex = '2';
    correctDiv.style.opacity = '100';
    setTimeout(function() {
        correctDiv.style.zIndex = '0';
        correctDiv.style.opacity = '0';
    }, 1000);
    numCorrect++;
}

//function to be called any time an incorrect answer is selected
const showIncorrect = () => {
    let incorrectDiv = document.getElementById('incorrect');
    incorrectDiv.style.zIndex = '2';
    incorrectDiv.style.opacity = '100';
    setTimeout(function() {
        incorrectDiv.style.zIndex = '0';
        incorrectDiv.style.opacity = '0';
    }, 1000);
    numIncorrect++;
}

//updates the innerHTML of the answer counter elements with the new values
const updateAnswers = () => {
    document.getElementById('number-correct').innerHTML = numCorrect;
    document.getElementById('number-incorrect').innerHTML = numIncorrect;

}

//calculate the final score
calcFinalScore = () => {
    let finalScore = Math.floor((numCorrect / officeQuestions.questions.length)*100);
    if (numCorrect === 0) {
        document.getElementById('final-score').innerHTML = '0%';
    } else {
        document.getElementById('final-score').innerHTML = finalScore + '%';  
    }
}

//show final score screen to be used after last question
const showResults = () => {
    let results = document.getElementById('results');
    let playAgain = document.getElementById('play-again');
    results.style.transform = 'translate(0)';
    setTimeout(function() {
        playAgain.style.transform = ('scale(1)');
    }, 1200);

}

//loop through all question objects in officeQuestions.questions to set onclick events
for (x = 0; x < officeQuestions.questions.length; x++) {
    let answerOne = document.getElementById(officeQuestions.questions[x].answerIds[0]);
    let answerTwo = document.getElementById(officeQuestions.questions[x].answerIds[1]);
    let answerThree = document.getElementById(officeQuestions.questions[x].answerIds[2]);
    let answerFour = document.getElementById(officeQuestions.questions[x].answerIds[3]);

    //onclick function for each answer
    answerOne.onclick = function() {
        if (answerOne.value === officeQuestions.questions[questionNum].correctAnswer) {
            showCorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers()
            },500)
        } else {
            showIncorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers();
            },500)
        }
    }
    answerTwo.onclick = function() {
        if (answerTwo.value === officeQuestions.questions[questionNum].correctAnswer) {
            showCorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers();
            },500)
        } else {
            showIncorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers();
            },500)
        }
    }
    answerThree.onclick = function() {
        if (answerThree.value === officeQuestions.questions[questionNum].correctAnswer) {
            showCorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers();
            },500)
        } else {
            showIncorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers();
            },500)
        }
    }
    answerFour.onclick = function() {
        if (answerFour.value === officeQuestions.questions[questionNum].correctAnswer) {
            showCorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers();
            },500);
        } else {
            showIncorrect();
            setTimeout(function() {
                advanceQuestion();
                updateAnswers();
            },500)
        }
    }
}