export function Library(savedBooks = []) {
          this.updateInfo = function () {
                    this.infoBooks.textContent = this.books.length;
                    this.infoPages.textContent = this.books.reduce((a, book) => {
                              a += Number(book.readpages);
                              return a;
                    }, 0);
          };
          this.addBook = function (book) {
                    this.books.push(book);
                    this.updateInfo();
          };
          this.books = savedBooks;
          this.infoBooks = document.querySelector('.info-read');
          this.infoPages = document.querySelector('.info-pages');

}

export default Library;
