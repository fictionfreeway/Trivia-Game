const source = document.getElementById('questions').innerHTML;
const template = Handlebars.compile(source);

const harryQuestions = {
    //questions are stored as objects with the answers in an array
    questions: [
    {
        //id is to be used by handlebars in the HTML document to give id names to elements
        id: 'question-one',
        question: 'How many Horcruxes were there?',
        //answerIds are to be used as IDs and input values in the HTML doc
        answerIds: ['3', '9', '7', '11'],
        answers: ['3', '9', '7', '11'],
        //correctAnswer must match the currect answer's ID in answerIds, NOT the answers array
        correctAnswer: '7'
    },
    {
        id: 'question-two',
        question: 'What Hogwarts house does Harry belong to?',
        answerIds: ['Ravenclaw', 'Slytherin', 'Hufflepuff', 'Gryffindor'],
        answers: ['Ravenclaw', 'Slytherin', 'Hufflepuff', 'Gryffindor'],
        correctAnswer: 'Gryffindor'
    },
    {
        id: 'question-three',
        question: 'What position does Harry play on his Quidditch team?',
        answerIds: ['Bludger', 'Seeker', 'Chaser', 'Keeper'],
        answers: ['Bludger', 'Seeker', 'Chaser', 'Keeper'],
        correctAnswer: 'Seeker'
    },

    {
        id: 'question-four',
        question: 'Who is Fluffy?',
        answerIds: ["HermionesCat", "HarrysOwl", "3headeddog", "HagridsDragon"],
        answers: ["Hermione's Cat", "Harry's Owl", "3-Headed Dog", "Hagrid's Dragon"],
        correctAnswer: "3headeddog"
    },
    
    {
        id: 'question-five',
        question: 'What does the Imperius Curse do?',
        answerIds: ['kills', 'tortures', 'transforms', 'controls'],
        answers: ['Kills', 'Tortures', 'Tranforms', 'Controls'],
        correctAnswer: 'controls'
    },

    {
        id: 'question-six',
        question: 'Who poses as Mad-Eye Moody?',
        answerIds: ['voldemort', 'siriusblack', 'bartycrouchjr', 'peterpettigrew'],
        answers: ['Voldemort', 'Sirius Black', 'Barty Crouch Jr', 'Peter Pettigrew'],
        correctAnswer: 'bartycrouchjr'
    },

    {
        id: 'question-seven',
        question: 'Who kills Professor Dumbledore?',
        answerIds: ['bellatrixlestrange', 'severussnape', 'dracomalfoy', 'fenrirgreyback'],
        answers: ['Bellatrix Lestrange', 'Severus Snape', 'Draco Malfoy', 'Fenrir Greyback'],
        correctAnswer: 'severussnape'
    },

    {
        id: 'question-eight',
        question: 'Who is Grawp',
        answerIds: ['ronsowl', 'hagridshalfbrother', 'siriushouseelf', 'acentaur'],
        answers: ["Ron's Owl", "Hagrid's Brother", "Sirius' House Elf", "A Centaur"],
        correctAnswer: 'hagridshalfbrother'
    },

    {
        id: 'question-nine',
        question: "Before Harry's second year at Hogwarts, how do the Weasley's save Harry from the Dursleys?",
        answerIds: ['aflyingcar', 'aportkey', 'enchantedbroom', 'floopowder'],
        answers: ['A Flying Car', 'A Portkey', 'A Broom', 'Floo Powder'],
        correctAnswer: 'aflyingcar'
    },

    {
        id: 'question-ten',
        question: "What is Harry's Patronus?",
        answerIds: ['anowl', 'arabbit', 'astag', 'aunicorn'],
        answers: ['An Owl', 'A Rabbit', 'A Stag', 'A Unicorn'],
        correctAnswer: 'astag'
    },

    ]
};


const compiledHtml = template(harryQuestions);

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
    const currentQuestion = harryQuestions.questions.find(findQuestion);
    const rightAnswer = currentQuestion.correctAnswer; 
    if(userAnswer === rightAnswer) {
        return true;
    } else {
        return false;
    }
};

//hide all questions at start except for question one
for (x = 1; x < harryQuestions.questions.length; x++) {
    //finds id of each question
    let id = harryQuestions.questions[x].id;
    //hides all html elements with the an id equal to the id property of each quetion object
    document.getElementById(id).style.visibility = 'hidden';
}

//global variables
let questionNum = 0;
let numCorrect = 0;
let numIncorrect = 0;

const advanceQuestion = () => {
    if (questionNum < harryQuestions.questions.length-1) {
        let questionElem = document.getElementById(harryQuestions.questions[questionNum].id);
        questionElem.style.visibility = 'hidden';
        questionNum++;
        let nextQuestion = document.getElementById(harryQuestions.questions[questionNum].id);
        nextQuestion.style.visibility = 'visible';
    } else {
        let questionElem = document.getElementById(harryQuestions.questions[questionNum].id);
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
    let finalScore = Math.floor((numCorrect / harryQuestions.questions.length)*100);
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

//loop through all question objects in harryQuestions.questions to set onclick events
for (x = 0; x < harryQuestions.questions.length; x++) {
    let answerOne = document.getElementById(harryQuestions.questions[x].answerIds[0]);
    let answerTwo = document.getElementById(harryQuestions.questions[x].answerIds[1]);
    let answerThree = document.getElementById(harryQuestions.questions[x].answerIds[2]);
    let answerFour = document.getElementById(harryQuestions.questions[x].answerIds[3]);

    //onclick function for each answer
    answerOne.onclick = function() {
        if (answerOne.value === harryQuestions.questions[questionNum].correctAnswer) {
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
        if (answerTwo.value === harryQuestions.questions[questionNum].correctAnswer) {
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
        if (answerThree.value === harryQuestions.questions[questionNum].correctAnswer) {
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
        if (answerFour.value === harryQuestions.questions[questionNum].correctAnswer) {
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