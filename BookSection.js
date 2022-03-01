import Card from "./Card.js";

function BookSection(selector, formbook) {
          this.object = document.querySelector(selector);
          this.formbook = formbook;
}

BookSection.prototype.renderHere = function(list = []) {
          list.forEach(book => {
                    const DIV = new Card(book, this.formbook);
                    this.object.appendChild(DIV.div);
          });
}

export default BookSection;
