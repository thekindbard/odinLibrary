export function Book(name, author, pages, readpages, read, library, index = library.books.length ) {
          this.name = name;
          this.author = author;
          this.pages = pages;
          this.readpages = readpages;
          this.read = read;
          this.index = index;
}

export default Book;
