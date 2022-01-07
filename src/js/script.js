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
  
  class BooksList {
    constructor(){
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.renderBook();
      thisBookList.initActions();
    }

    getElements(){
      const thisBookList = this;

      thisBookList.bookList = document.querySelector (select.listOf.booksList); //referencja do bookList
      thisBookList.favoriteBooks = []; //zawiera info o wybranych filtrach
      thisBookList.filtersTab = [];
      thisBookList.filters = document.querySelector('.filters'); //referencja do filtrów
    }

    initData() {
      this.data = dataSource.books;
    }

    /*presentation of books */
    renderBook(){
      const thisBookList = this;
      for(let book of dataSource.books){
        const ratingBgc = thisBookList.determineRatingBgc(book.rating); //określenie koloru przez wywołanie funkcji
        book.ratingBgc = ratingBgc;
        book.ratingWidth= book.rating * 10; //szerokość paska
        console.log(book);
      
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
    }

    /*favorite books */
    initActions() {
      const thisBookList = this;
      

      let bookId;
      console.log('bookList:',thisBookList.bookList);
      thisBookList.bookList.addEventListener('dblclick', function (event){ //nasłuchiwanie na kliknięcie 
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
            thisBookList.favoriteBooks.push(bookId); //dodanie id książki do tablicy
            console.log(thisBookList.favoriteBooks);
            console.log(image.classList);
          } else {
            image.classList.remove('favorite'); //usunięcie klasy
            thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(bookId), 1); //usunięcie z tablicy id
            console.log(thisBookList.favoriteBooks);
          }
        }
      }); 

      
      thisBookList.filters.addEventListener('change', function(event){ // nasłuchiwanie na zmiane zawartości checkboxa kliknięcie
        event.preventDefault();
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox'  && event.target.name==='filter') { //sprawdzenie czy jest to poszukiwany checkbox
          if (event.target.checked) { //jeśli checkbox zaznaczony to
            thisBookList.filtersTab.push(event.target.value);//dodaj do tablicy
            console.log('filtersTab:',thisBookList.filtersTab);
          } else {
            thisBookList.filtersTab.splice(thisBookList.filtersTab.indexOf(event.target.value));//usuń z tablicy jeśli odznaczony
            console.log('filtersTab', thisBookList.filtersTab);
          }
        }
        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      const thisBookList = this;

      for (let book of dataSource.books) { //przejście po książkach
        let shouldBeHidden = false;
        for (const filter of thisBookList.filtersTab) {//przejście po tablicy opcji filtrowania
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

    determineRatingBgc(rating){
      let background = '';

      if(rating < 6){
        background = 'linear-gradient(to bottom, #f1da36 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

      return background;
    }
  }
  new BooksList();
}
