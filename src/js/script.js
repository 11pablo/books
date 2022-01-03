{
  'use strict';
    
  /*preparation of references*/
  const select = { 
    templateOf: {
      book: '#template-book', 
    },
    listOf: {
      booksList: '.books-list',
    }
  };
  
  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  const renderBook = function(){
    for(let book of dataSource.books){
  
      /*generate html base on template*/
      const generatedHTML = templates.templateBook(book); // tworzenie html łączącego w sobie szablon i dane o książkach
      /*create element using utils.createElementFromHTML*/
      const elementDOM = utils.createDOMFromHTML(generatedHTML); //tworzenie elemętu DOM na podstawie html
      /*find book list */
      //console.log(elementDOM);
      const booksListBox = document.querySelector(select.listOf.booksList);
      /*add element*/
      booksListBox.appendChild(elementDOM);
    }
  };
  
  renderBook();
}