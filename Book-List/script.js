class Book {
	constructor(title, author, date, shelf) {
		this.title = title;
		this.author = author;
		this.date = date;
		this.shelf = shelf;
		this.id = Storage.getID() === undefined ? 0 : Storage.getID().id + 1;
	}
}

class UIClass {
	static displayBook() {
		const books = Storage.getItems();
		books.forEach((book) => UIClass.addBooks(book));
	}

	static addBooks(book) {
		const table = document.getElementById("tableBody");
		const row = document.createElement("tr");
		row.style.cursor = "pointer";
		row.setAttribute("data-toggle", "modal");
		row.setAttribute("data-target", "#exampleModal");
		row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.date}</td>
            <td>${book.shelf}</td>
            <td style="display: none;">${book.id}</td>`;
		table.appendChild(row);
	}

	static submitBook() {
		const title = document.getElementById("title");
		const author = document.getElementById("author");
		const shelf = document.getElementById("shelf");
		const date = document.getElementById("date");

		let book = new Book(title.value, author.value, date.value, shelf.value);
		UIClass.addBooks(book);
		Storage.addItems(book);

		title.value = "";
		author.value = "";
		shelf.value = "";
		date.value = "";
	}

	static updateBook(row) {
		const title = document.getElementById("titleModal");
		const author = document.getElementById("authorModal");
		const shelf = document.getElementById("shelfModal");
		const date = document.getElementById("dateModal");
		const btn = document.getElementById("btnModal");
		const del = document.getElementById("delModal");

		const data = row.children;
		title.value = data[0].textContent;
		author.value = data[1].textContent;
		shelf.value = data[3].textContent;
		date.value = data[2].textContent;

		btn.addEventListener("click", () => {
			data[0].textContent = title.value;
			data[1].textContent = author.value;
			data[2].textContent = date.value;
			data[3].textContent = shelf.value;
			$("#exampleModal").modal("hide");
		});

		del.addEventListener("click", () => {
			document.getElementById("tableBody").removeChild(row);
			Storage.deleteItems(Math.floor(data[4].textContent));
			$("#exampleModal").modal("hide");
		});
	}
}

class Storage {
	static getItems() {
		let books;
		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}
		return books;
	}

	static getID() {
		return Storage.getItems().pop();
	}

	static addItems(book) {
		const books = Storage.getItems();
		books.push(book);
		localStorage.setItem("books", JSON.stringify(books));
	}

	static deleteItems(id) {
		const books = Storage.getItems();
		books.forEach((book, i) => {
			if (book.id === id) {
				books.splice(i, 1);
			}
		});
		localStorage.setItem("books", JSON.stringify(books));
	}
}

document.addEventListener("DOMContentLoaded", UIClass.displayBook);

document
	.getElementById("inputForm")
	.addEventListener("submit", UIClass.submitBook);

document.getElementById("tableBody").addEventListener("click", (e) => {
	UIClass.updateBook(e.target.parentElement);
});
