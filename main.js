let form = document.querySelector("#form");
let form_search = document.querySelector(".form_search");
let btn = document.querySelector(".btn");
let btn_search = document.querySelector(".btn_search");
let lists = document.querySelector(".lists");

let api = "https://676ac315863eaa5ac0df8bfd.mockapi.io/todohomework";
// let api = "https://676a9fb7863eaa5ac0df14f1.mockapi.io/izzatillo"

function fetchfunc() {
  fetch(api)
    .then((data) => data.json())
    .then((data) => addtodo(data))
    .catch((error) => console.log(error));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputRes = form.input.value;
  // console.log(inputRes);

  fetch(api, {
    method: "POST",
    body: JSON.stringify({ name: inputRes, time: getTime() }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((data) => {
      // console.log(data);
      form.input.value = "";
      fetchfunc();
    })
    .catch((error) => console.log(error));
  // addtodo(inputRes);
  // fetchfunc();
});

function addtodo(data) {
  lists.innerHTML = "";
  data.forEach((value) => {
    let list = document.createElement("div");
    list.classList.add("list");
    list.innerHTML = `
    <p>${value.name}</p>
    <p class="time">${value.time}</p>
    <div>
    <button id=${value.id} class="btn2  edit">edit</button>
    <button id=${value.id} class="btn2  delete">delete</button>
    </div>`;
    lists.append(list);
  });
}

lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    dele(e.target.id);
  }
  if (e.target.classList.contains("edit")) {
    edit(e.target.id);
  }
});

// DELETE
function dele(id) {
  fetch(`${api}/${id}`, { method: "DELETE" })
    .then((data) => fetchfunc())
    .catch((error) => console.log(error));
}

// EDIT
function edit(id) {
  let editpro = prompt("edit your Todo");
  // name: form.input.value

  console.log(
    fetch(`${api}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: editpro, time: "edit " + getTime() }),
      headers: { "Content-type": "application/json" },
    })
      .then((data) => fetchfunc())
      .catch((error) => console.log(error))
  );
}

//TIME
function getTime() {
  const date = new Date();
  const hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  const minute =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();

  return `${hours}:${minute}`;
}

form_search.addEventListener("submit", (e) => {
  e.preventDefault()(
    // let searchValue = form_search.input.value

    fetch(api)
      .then((data) => data.json())
      .then((data) => search(data))
      .catch((error) => console.log("error"))
  );
});

function search(data) {
  data.forEach((value) => {
    console.log(value.id);
    if (value.name == form_search.input.value) {
      alert(value.name + `  ${value.id - 1}-qatorda`);
    }
  });
}

fetchfunc();
