const API = "http://localhost:8001/movies";
const container = document.querySelector(".container");
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

//! GET DATA
async function getData() {
  const res = await fetch(
    `${API}?q=${searchVal}&_limit=${limit}&_page=${currentPage}`
  );
  const data = await res.json();

  const count = res.headers.get("x-total-count");
  pageTotalCount = Math.ceil(count / limit);
  return data;
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
    </div>
  </div>
    `;
  });
}

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

// ? фильтрация
radios.forEach((item) => {
  item.addEventListener("change", (e) => {
    category = e.target.id;
    render();
  });
});
