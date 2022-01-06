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
      bookImage: 'book__image',
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
  
    let bookId;
    const bookList = document.querySelector (select.listOf.booksList); //referencja do bookImage
    console.log('bookList:',bookList);
    bookList.addEventListener('dblclick', function (event){ //nasłuchiwanie na kliknięcie 
      if(event.target.offsetParent.classList.contains(select.imageOf.bookImage)){
        const image = event.target.offsetParent;      
        console.log('image:',image);
        if (!image.classList.contains('favorite')){ //jeśli nie istnieje klasa favorite to
          //Add favoriteBook to the photo
          image.classList.add('favorite'); //dodanie klasy  favorite do klikniętego zdjęcia
          //download Id
          bookId = image.getAttribute('data-id'); //identyfikator id książki
          //adding an id to an array
          favoriteBooks.push(bookId); //dodanie id książki do tablicy
          console.log(favoriteBooks);
          console.log(image.classList);
        } else {
          image.classList.remove('favorite'); //usunięcie klasy
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1); //usunięcie z tablicy id
          console.log(favoriteBooks);
        }
      }
    });
  };
  renderBook();
  initActions();
}