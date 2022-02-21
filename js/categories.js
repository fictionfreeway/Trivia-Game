const source = document.getElementById('categories').innerHTML;
const template = Handlebars.compile(source);

const triviaCategories = {
    categories: [
    {
        id: 'HP',
        name: 'Harry Potter',
        imageSource: 'images/harrypotter.jpg',
        quizLink: 'harrypotterquiz.html'
    },
     {
        id: 'office',
        name: 'The Office',
        imageSource: 'images/theoffice.jpg',
        quizLink: 'officequiz.html'
     },
     {
         id: 'star',
         name: 'Star Wars',
         imageSource: 'images/starwars.jpg',
         quizLink: '#'
     }  
    ]
};

//factory function for adding new categories
const categoryFactory = (id, name, imageSource, quizLink) => {
    return {
        id,
        name,
        imageSource,
        quizLink
    };
}

const compiledHtml = template(triviaCategories);

const displayElements = document.getElementById('category-select');
displayElements.innerHTML = compiledHtml;