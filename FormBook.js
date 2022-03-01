import Book from "./Book.js";
import update from "./main.js";

export default function  FormBook({ selector, library, readbooks, noReadbooks }) {
          this.openForm = function ({index}) {

                    this.obj.classList.toggle("active");
                    document.body.classList.toggle("openBook");
                    
                    if (index) {
                              this.addEdit.textContent = "Edit";
                              this.loadBookData(index);
                              this.edit = true;
                    } else {
                              this.addEdit.textContent = "Add";
                    }
                    this.index = index;

          }
          this.loadBookData = function(index) {
                    const temporallyBook = this.library.books.filter(book => book.index==index)[0];
                    this.name.value = temporallyBook.name;
                    this.author.value = temporallyBook.author;
                    this.pages.value = temporallyBook.pages;
                    this.pagesRead.max = temporallyBook.pages;
                    this.pagesRead.value = temporallyBook.readpages;
                    this.pagesReadLabel.innerText = temporallyBook.readpages;
                    this.pagesRead.disabled = temporallyBook.read;
                    this.read.checked = temporallyBook.read;
                    this.read.disabled = false;

          }
          this.close = function () {
                    this.obj.classList.remove("active");
                    document.body.classList.remove("openBook");
                    this.reset();
          }
          this.enablePages = function () {
                    if (this.pages.value != "" && this.pages.value != "0") {
                              this.pagesRead.disabled = false;
                              this.pagesRead.max = this.pages.value;
                              this.pagesRead.value = this.pages.value / 2;
                              this.read.disabled = false;
                              this.pagesReadLabel.innerText = this.pagesRead.value;
                    } else {
                              this.pagesRead.disabled = true;
                              this.read.disabled = true;
                    }
          };

          this.changePages = function () {
                    this.pagesReadLabel.innerText = this.pagesRead.value;
                    if (this.pagesRead.value == this.pages.value) {
                              this.read.checked = true;
                              this.pagesRead.disabled = true;
                    }
          };

          this.bookread = function () {
                    if (this.read.checked) {
                              this.pagesRead.disabled = true;
                              this.pagesRead.value = this.pages.value;
                              this.pagesReadLabel.innerText = this.pagesRead.value;
                    } else {
                              this.pagesRead.disabled = false;
                              this.pagesRead.value -= 1;
                              this.pagesReadLabel.innerText -= 1;
                    }
          };

          this.changeBook = function () {
                    if (!this.name.value || !this.author.value || !this.pages.value || !this.pagesRead.value)
                              return;
                    if (this.index)  {
                              this.library.books = this.library.books.map(book => {
                                        if(book.index==this.index) {
                                                  book.name = this.name.value;
                                                  book.author = this.author.value;
                                                  book.pages = this.pages.value;
                                                  book.readpages = this.pagesRead.value;
                                                  book.read = this.read.checked;
                                                  book.index = this.index;
                                        }
                                        return book;
                              } )
                    } else {
                              this.library.addBook(
                                        new Book(
                                                  this.name.value,
                                                  this.author.value,
                                                  this.pages.value,
                                                  this.pagesRead.value,
                                                  this.read.checked,
                                                  this.library,
                                                  )
                              );
                    } 
                                        
                    this.edit = false;

                    this.reset();
                    this.close();
                    this.library.updateInfo();
                    update();

          };

          this.reset = function() {
                    this.name.value = "";
                    this.author.value = "";
                    this.pages.value = "";
                    this.pagesRead.value = 0;
                    this.pagesRead.disabled = true;
                    this.read.checked = false;
                    this.pagesReadLabel.innerText = "--";
                    this.read.disabled = true;
          }

          this.trash = function () {

                    this.library.books = this.library.books.filter( book => book.index != this.index )
                    update();
                    this.close();
                    this.reset();
          }

          this.library = library;
          this.edit = false;
          this.index;


          this.obj = document.querySelector(selector);

          this.closeButton = this.obj.querySelector('.close');
          this.closeButton.addEventListener("click", this.close.bind(this));

          this.trashButton = this.obj.querySelector('.trash');
          this.trashButton.addEventListener("click", this.trash.bind(this));

          this.name = this.obj.querySelector('[name=name');
          this.author = this.obj.querySelector('[name=author');

          this.pages = this.obj.querySelector('[name=pages');
          this.pages.addEventListener('change', this.enablePages.bind(this));

          this.pagesRead = this.obj.querySelector('[name=pagesread]');
          this.pagesRead.addEventListener('input', this.changePages.bind(this));

          this.read = this.obj.querySelector('[name=read]');
          this.read.addEventListener('change', this.bookread.bind(this));

          this.pagesReadLabel = this.obj.querySelector('[for=pagesread] span');

          this.addEdit = this.obj.querySelector('button');
          this.addEdit.addEventListener('click', this.changeBook.bind(this));
          this.reset();

}
