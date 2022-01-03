{
  'use strict';
    
  /*preparation of references*/
  const select = { 
    templateOf: {
      book: '#template-book', 
    },
    listOf: {
      booksList: '.books-list',
    },
    imageOf: {
      booksImage: '.books-list .book__image',
    },
  };
  
  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  /*presentation of books */
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


  const favoriteBooks = [];

  /*favorite books */
  const initActions = function() {
    const images = document.querySelectorAll(select.imageOf.booksImage); //referencja do bookImage
    console.log(images);
    for(let image of images){
      image.addEventListener('dblclick', function (event){ //nasłuchiwanie na podwójne kliknięcie
        event.preventDefault();
        /*Add favoriteBook to the photo*/
        image.classList.add('favorite'); //dodanie klasy  favoriteBook do klikniętego zdjęcia
        /*download Id*/
        let bookId = image.getAttribute('data-id'); //identyfikator id książki
        /*adding an id to an array*/
        favoriteBooks.push(bookId); //dodanie id do tablicy
        console.log(favoriteBooks);
      });
      
    }
  };
  
  renderBook();
  initActions();
}