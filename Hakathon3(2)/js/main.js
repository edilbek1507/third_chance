const container = document.querySelector(".container");

const form = document.querySelector(".head");

const inp1 = document.querySelector(".inp1");
const inp2 = document.querySelector(".inp2");
const inp3 = document.querySelector(".inp3");
const inp4 = document.querySelector(".inp4");
const inp5 = document.querySelector(".inp5");

const editInput = document.querySelector("#edit-input");
const editInput2 = document.querySelector("#edit-input2");
const editInput3 = document.querySelector("#edit-input3");
const editInput4 = document.querySelector("#edit-input4");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");
const editModal = document.querySelector("#edit-modal");
const closeModal = document.querySelector("#close-modal");
const deleteCardButton = document.querySelector(".delete-btn");
const editCardButton = document.querySelector(".edit-btn");

//? элементы пагинации
const paginationList = document.querySelector(".pagination-list");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
//? количество продуктов на одной странице
const limit = 12;
//? текущая страница
let currentPage = 1;
//? общее количество страниц
let pageTotalCount = 1;

//? Searchbox

const searchbox = document.querySelector("#search_box");
let searchVal = "";

// ? кнопка для скрытия и показа Admin panel
const adminPanelBtnShow = document.querySelector("#admin-panel-btn-show");
const adminPanelBtnHide = document.querySelector("#admin-panel-btn-hide");

//? Filter
const radios = document.querySelectorAll(".radio-inputs");
let category = "";
// console.log(radios);

//todo Код для показа Admin panel
form.style.visibility = "hidden";
form.style.position = "absolute";
adminPanelBtnHide.style.visibility = "hidden";
adminPanelBtnHide.style.position = "absolute";

adminPanelBtnShow.addEventListener("click", (e) => {
  form.style.visibility = "visible";
  form.style.position = "static";
  adminPanelBtnShow.style.visibility = "hidden";
  adminPanelBtnShow.style.position = "absolute";
  adminPanelBtnHide.style.visibility = "visible";
  adminPanelBtnHide.style.position = "static";
});

//todo Код для скрытия Admin panel
adminPanelBtnHide.addEventListener("click", (e) => {
  form.style.visibility = "hidden";
  form.style.position = "absolute";
  adminPanelBtnHide.style.visibility = "hidden";
  adminPanelBtnHide.style.position = "absolute";
  adminPanelBtnShow.style.visibility = "visible";
  adminPanelBtnShow.style.position = "static";
});

const API = "http://localhost:8001/movies";

editModal.style.visibility = "hidden";

//! GET DATA
async function getData() {
  const res = await fetch(
    `${API}?q=${searchVal}&_limit=${limit}&_page=${currentPage}&category_like=${category}`
  );
  const data = await res.json();

  const count = res.headers.get("x-total-count");
  pageTotalCount = Math.ceil(count / limit);
  return data;
}

//!DELETE

async function deleteContact(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
}

//! GetByID
async function getById(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();

  return data;
}

//!EDIT

async function editContact(newData, id) {
  console.log(id);
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//! POST

async function addContact(newContact) {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(newContact),
    headers: {
      "Content-type": "application/json",
    },
  });
}

//! RENDER

render();

async function render() {
  const data = await getData();

  container.innerHTML = "";

  data.forEach((item) => {
    container.innerHTML += `
    <div style = "background-color: rgba(0, 0, 0, 0.731);" class="card">
    <div class="first-content ">
      <img class="itemImage" src="${item.image}" alt="" />
    </div>
    <div class="second-content">
      <div class="cardText itemName">${item.name}</div>
      <div class="cardText itemDate">${item.date}</div>
      <div class="cardText itemStars">${item.stars} &#9733;</div>
      <div class="cardText itemCategory">${item.category}</div>
      <div class="cardBtnsContainer">
        <button id="${item.id}" class="cardBtns edit-btn">Edit</button>
        <button id="${item.id}" class="cardBtns delete-btn">Delete</button>
      </div>
    </div>
  </div>
    `;
  });
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    !inp1.value.trim() ||
    !inp2.value.trim() ||
    !inp3.value.trim() ||
    !inp4.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  const contacts = {
    name: inp1.value,
    date: inp2.value,
    stars: inp3.value,
    image: inp4.value,
    category: inp5.value,
  };

  await addContact(contacts);

  inp1.value = "";
  inp2.value = "";
  inp3.value = "";
  inp4.value = "";
  inp5.value = "";
  render();
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    await deleteContact(e.target.id);
  }
  render();
});

let id = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const contact = await getById(e.target.id);
    editInput.focus();
    console.log(e.target.id);

    id = e.target.id;
    editInput.value = contact.name;
    editInput2.value = contact.date;
    editInput3.value = contact.stars;
    editInput4.value = contact.image;
  }
});

function close() {
  editModal.style.visibility = "hidden";
}

closeModal.addEventListener("click", close);

editCancel.addEventListener("click", close);

editSubmit.addEventListener("click", async (e) => {
  if (
    !editInput.value.trim() ||
    !editInput2.value.trim() ||
    !editInput3.value.trim() ||
    !editInput4.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  const newContacts = {
    name: editInput.value,
    date: editInput2.value,
    stars: editInput3.value,
    image: editInput4.value,
    category: editCategoryInp.value,
  };
  await editContact(newContacts, id);
  render();
  close();

  editCancel.click();
});

//! Search event

searchbox.addEventListener("input", () => {
  searchVal = searchbox.value;
  render();
});

// ? функция для отображения кнопок пагинации
function renderPagination() {
  //? чтобы кропка prev была неактивна на первой странице
  if (currentPage <= 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
  //? чтобы кропка next была неактивна на последней странице
  if (currentPage >= pageTotalCount) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}
//? обработчик события чтобы перейти на следующую страницу
next.addEventListener("click", () => {
  if (currentPage >= pageTotalCount) {
    return;
  }
  currentPage++;
  render();
});

//? обработчик события чтобы перейти на предыдущую страницу
prev.addEventListener("click", () => {
  if (currentPage <= 1) {
    return;
  }
  currentPage--;
  render();
});

//? обработчик события чтобы перейти на определенную страницу
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-number")) {
    currentPage = +e.target.innerText;
    render();
  }
});

// let image = document.getElementById("test"); //Выбираем картинку
// setInterval(function () {
//   setTimeout(function () {
//     image.style.display = "block"; //скрывем
//     setTimeout(function () {
//       image.style.display = "none"; //проявляем
//     }, 3000);
//   }, 4000);
// }, 5000);

// ? фильтрация
radios.forEach((item) => {
  item.addEventListener("click", (e) => {
    category = e.target.id;
    render();
  });
});
