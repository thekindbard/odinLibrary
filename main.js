import BookSection from "./BookSection.js";
import FormBook  from "./FormBook.js";
import Library from "./Library.js";

if (localStorage.books == undefined) {
          localStorage.books = '[{"name":"Don Quijote","author":"Miguel de Cervantes","pages":"1345","readpages":"1345","read":true,"index":"0"},{"name":"A Tale of Two Cities","author":"Charles Dickens","pages":"288","readpages":"184","read":false,"index":"1"},{"name":"The Hobbit","author":"J. R. R. Tolkien","pages":"310","readpages":"222","read":false,"index":2}]';
}

function update() {
          readbooks.object.innerHTML = "<h2>Books Read</h2>";
          noReadbooks.object.innerHTML = "<h2>Books No Read</h2>";
          readbooks.renderHere(library.books.filter(book => book.read));
          noReadbooks.renderHere(library.books.filter(book => !book.read));
}

function AddButton(selector, target) {
          this.object = document.querySelector(selector);
          this.object.addEventListener('click', target.openForm.bind(target));
}

function saveBook() {
          localStorage.setItem('books', JSON.stringify(library.books));
}

function getBooks() {
          return  JSON.parse(localStorage.getItem('books') || '[]');
}

const savedBooks = getBooks();
export let library = new Library(savedBooks == null ? [] : savedBooks );

const formbook = new FormBook({selector:'.createBook', library});

export const readbooks = new BookSection('.readbooks', formbook);
export const noReadbooks = new BookSection('.noreadbooks', formbook);

const addButton = new AddButton('.openForm', formbook);

update();

// window.addEventListener('beforeunload', saveBook)

export default update;
