function Card(book, formbook) {
          this.openForm = function (e) {
                    const index = e.path[1].getAttribute("index");
                    formbook.openForm.call(formbook, {index});
          };
          this.name = book.name;
          this.author = book.author;
          this.pages = book.pages;
          this.read = book.read;
          this.readpages = book.readpages;
          this.index = book.index;

          this.form = document.querySelector('.createBook');

          this.div = document.createElement("DIV");
          this.div.className = "card";
          this.div.textContent = `${this.name} by ${this.author}, ${this.readpages == this.pages ? " Completed" : `${this.readpages} / ${this.pages}`}`;

          this.div.setAttribute("index", this.index);

          this.img = document.createElement("IMG");
          this.img.src = "./images/square-edit-outline.svg";
          this.img.alt = "icon-edit";
          this.img.addEventListener("click", this.openForm);


          this.div.appendChild(this.img);
}


export default Card;