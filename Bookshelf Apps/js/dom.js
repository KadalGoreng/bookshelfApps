const UNCOMPLETED_BOOK_ID = "books";
const COMPLETED_BOOK_ID = "completed-books";
const BOOK_ITEMID = "itemId";

// fitur pencarian
const filterInput = document.querySelector("#pencarian");
filterInput.addEventListener("keyup", filterBooks);

function addBook() {
  // checkbox sudah dibaca atau belum
  const cekbox = document.getElementById("completeRead")
  if(cekbox.checked == true){
    const completeRead = document.getElementById(COMPLETED_BOOK_ID);

    const judul = document.getElementById("title").value;
    const npenulis = "<b>Penulis : </b>" + document.getElementById("penulis").value;
    const timestamp = "<b>Tahun : </b>" + document.getElementById("date").value;
  
    const book = makeBook(judul, npenulis, timestamp, true);
    const bookObject = composeBookObject(judul, npenulis, timestamp, true);
  
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
  
    completeRead.append(book);
    updateDataToStorage();
  } else {
  const uncompletedList = document.getElementById(UNCOMPLETED_BOOK_ID);

  const judul = document.getElementById("title").value;
  const npenulis = "<b>Penulis : </b>" + document.getElementById("penulis").value;
  const timestamp = "<b>Tahun : </b>" + document.getElementById("date").value;

  const book = makeBook(judul, npenulis, timestamp, false);
  const bookObject = composeBookObject(judul, npenulis, timestamp, false);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  uncompletedList.append(book);
  updateDataToStorage();
  }
}

function makeBook(book, pen, time, isCompleted) {
  const textTitle = document.createElement("h1");
  textTitle.classList.add("nama");
  textTitle.innerText = book;

  const textPen = document.createElement("p");
  textPen.classList.add("pen");
  textPen.innerHTML = pen;

  const textTimestamp = document.createElement("p");
  textTimestamp.classList.add("waktu");
  textTimestamp.innerHTML = time;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textPen, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

    if (isCompleted) {
      container.append(createUndoButton(), trashButton());
    } else {
      container.append(createCheckButton(), trashButton());
    }


  return container;
}

function addTaskToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(".inner > .nama").innerHTML;
  const taskPen = taskElement.querySelector(".inner > .pen").innerHTML;
  const taskTimestamp = taskElement.querySelector(".inner > .waktu").innerHTML;
  const listCompleted = document.getElementById(COMPLETED_BOOK_ID);

  const newBook = makeBook(taskTitle, taskPen, taskTimestamp, true);


  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;


  listCompleted.append(newBook);
  taskElement.remove();

  updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  const taskTitle = taskElement.querySelector(".inner > .nama").innerHTML;
  const taskPen = taskElement.querySelector(".inner > .pen").innerHTML;
  const taskTimestamp = taskElement.querySelector(".inner > .waktu").innerHTML;

  const newBook = makeBook(taskTitle, taskPen, taskTimestamp, false);

  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  taskElement.remove();

  updateDataToStorage();
}

function createButton(dekor, eventListener) {
  const button = document.createElement("button");
  button.classList.add(dekor);
  // button.innerText = buttonTypeClass;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}

function trashButton() {
  return createButton("trash-button", function (event) {
    if (confirm("Apakah kamu yakin akan menghapus buku?")) {
      removeTaskFromCompleted(event.target.parentElement);
    }
  });
}

function removeTaskFromCompleted(taskElement) {
  const posisi = findBookIndex(taskElement[BOOK_ITEMID]);
  books.splice(posisi, 1);

  taskElement.remove();
  updateDataToStorage();
}

function filterBooks(e) {
  const text = e.target.value.toLowerCase();
  const bookItems = document.querySelectorAll(".item");

  bookItems.forEach((book) => {
    const itemText = book.textContent.toLowerCase();

    if (itemText.indexOf(text) !== -1) {
      book.setAttribute("style", "display: flex");
    } else {
      book.setAttribute("style", "display: none !important");
    }
  });
}


