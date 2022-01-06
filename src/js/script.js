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
    filterBook: {
      filter: '.filter',
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


  const favoriteBooks = []; //zawiera info o wybranych filtrach
  const filtersTab = [];
  const filters = document.querySelector('.filters'); //referencja do filtrów

  /*favorite books */
  const initActions = function() {
  
    let bookId;
    const bookList = document.querySelector (select.listOf.booksList); //referencja do bookList
    console.log('bookList:',bookList);
    bookList.addEventListener('dblclick', function (event){ //nasłuchiwanie na kliknięcie 
      event.preventDefault();
      if(event.target.offsetParent.classList.contains(select.imageOf.bookImage)){ //sprawdza czy rodzic ma klasę bookImage
        const image = event.target.offsetParent;      
        console.log('image:',event);
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

    
    filters.addEventListener('change', function(event){ // nasłuchiwanie na zmiane zawartości checkboxa kliknięcie
      event.preventDefault();
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox'  && event.target.name==='filter') { //sprawdzenie czy jest to poszukiwany checkbox
        if (event.target.checked) { //jeśli checkbox zaznaczony to
          filtersTab.push(event.target.value);//dodaj do tablicy
          console.log('filtersTab:',filtersTab);
        } else {
          filtersTab.splice(filtersTab.indexOf(event.target.value));//usuń z tablicy jeśli odznaczony
          console.log('filtersTab', filtersTab);
        }
      }
      filterBooks();
    });

    function filterBooks() {
      for (let book of dataSource.books) { //przejście po książkach
        let shouldBeHidden = false;
        for (const filter of filtersTab) {//przejście po tablicy opcji filtrowania
          console.log('filter:',filter);
          if (!book.details[filter]) { // czy właśćiwość filter = false
            shouldBeHidden = true; 
            break;
          }
        }
        console.log('shouldbeHidden',shouldBeHidden);
        if (shouldBeHidden) { //jeśli true ukryj
          const brightnessBook = document.querySelector('.book__image[data-id="' + book.id + '"]'); // dla książki  o id 
          brightnessBook.classList.add('hidden');// dodaje klasę hidden ,ukryj
        } else {
          const brightnessBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
          console.log('book.id:',book.id);
          brightnessBook.classList.remove('hidden'); //usuń klasę hidden
        }
      }
    }
  };
  renderBook();
  initActions();
}