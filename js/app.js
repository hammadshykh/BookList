let todos = JSON.parse(localStorage.getItem("todos")) || [];

const tableBody = document.querySelector(".tbody");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const isbnInput = document.querySelector("#isbn");

const addBtn = document.querySelector("#add-btn");
const editBtn = document.querySelector("#edit-btn");

const clearAlert = () => {
  setTimeout(() => {
    document.querySelector("#alert-area").innerHTML = "";
  }, 2000);
  return;
};

function todoPrinter() {
  todos.map(function (todo, index) {
    tableBody.innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td>${todo.title}</td>
      <td>${todo.author}</td>
      <td>${todo.isbn}</td>
      <td>
        <button class="btn btn-md btn-warning btn-remove" onclick="deleteBook(this,${index})">X</button>
        <button class="btn btn-md btn-warning btn-remove" onclick="editBook(this,${index})"><i class="fa fa-pencil" aria-hidden="true" ></i></button>
      </td>
    </tr>
    `;
  });
}

const addbookform = (e) => {
  e.preventDefault();

  if (
    titleInput.value == "" ||
    authorInput.value == "" ||
    isbnInput.value == ""
  ) {
    document.querySelector("#alert-area").innerHTML = `
    <div class="alert alert-danger">Please fill in all fields! ❗</div>
    `;
    clearAlert();
    return;
  }

  todos.push({
    title: titleInput.value,
    author: authorInput.value,
    isbn: isbnInput.value,
  });

  document.querySelector(
    "#alert-area"
  ).innerHTML = `<div class="alert alert-success">Book Added ✔</div>
  `;
  clearAlert();

  localStorage.setItem("todos", JSON.stringify(todos));

  titleInput.value = "";
  authorInput.value = "";
  isbnInput.value = "";

  tableBody.innerHTML = "";

  todoPrinter();
};

const deleteBook = (e, id) => {
  e.parentElement.parentElement.remove();
  todos.splice(id, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  document.querySelector(
    "#alert-area"
  ).innerHTML = `<div class="alert alert-warning">Book Remove ❌</div>
  `;
  clearAlert();
};

const editBook = (e, id) => {
  titleInput.value = todos[id].title;
  authorInput.value = todos[id].author;
  isbnInput.value = todos[id].isbn;

  addBtn.classList.add("d-none");
  editBtn.classList.remove("d-none");
  editBtn.setAttribute("data-index", id);
};

// Event Listeners

editBtn.addEventListener("click", (e) => {
  const index = e.target.getAttribute("data-index");

  const todoSave = {
    title: titleInput.value,
    author: authorInput.value,
    isbn: isbnInput.value,
  };

  todos[index] = todoSave;

  addBtn.classList.remove("d-none");
  editBtn.classList.add("d-none");

  titleInput.value = "";
  authorInput.value = "";
  isbnInput.value = "";

  tableBody.innerHTML = "";

  document.querySelector(
    "#alert-area"
  ).innerHTML = `<div class="alert alert-primary"> the Book has been updated ☑</div>
  `;
  clearAlert();

  localStorage.setItem("todos", JSON.stringify(todos));

  todoPrinter();
});

document.querySelector("#addbookform").addEventListener("submit", addbookform);
document.querySelector(".clear-btn").addEventListener("click", () => {
  document.querySelector(
    "#alert-area"
  ).innerHTML = `<div class="alert alert-dark">Books Ceared ☑</div>
  `;
  clearAlert();

  todos = [];
  tableBody.innerHTML = "";
  localStorage.removeItem("todos");
});

todoPrinter();
