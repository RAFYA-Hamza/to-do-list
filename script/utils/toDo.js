import {
  toDoLists,
  loadListsFromStorage,
  removeToDo,
  addToDo,
} from "../../data/toDoLists.js";

// Function to get the query parameter (task ID)
function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const taskId = getQueryParameter("id");

renderToDo();
readTrashAll();
renderHeader();

function renderHeader() {
  let title;

  toDoLists.forEach((toDoList) => {
    if (toDoList.id === taskId) {
      title = toDoList.TitleList;
    }
  });

  let headerHTML = `
        <div class="header-todo__title">
            <div class="header-todo__arrow-left">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="header-todo__text">${title}</p>
        </div>

        <div class="header-todo__buttons">
            <div class="button">
                <div class="button__icon button__icon-trash"></div>
                <a class="button__text" href="to-do.html">Delete List</a>
            </div>

            <div class="button">
                <div class="button__icon button__icon-rect">
                    <span></span>
                    <span></span>
                </div>
                <div class="button__text js-button__text">Add to-do</div>
            </div>
        </div>
    `;

  document.querySelector(".js-header").innerHTML = headerHTML;
}

function renderToDo() {
  let toDoHTML = "";

  loadListsFromStorage();

  toDoLists.forEach((toDoList) => {
    if (toDoList.id === taskId) {
      if (toDoList.toDo.length === 0) {
        const emptyToDoEelement = document.getElementById("empty-todo__list");
        emptyToDoEelement.style.display = "flex";
      } else {
        toDoList.toDo.forEach((toDo, index) => {
          toDoHTML += `
                <div id="${taskId}" class="to-do">
                    <div class="to-do__checkbox-container">
                        <input class="to-do__checkbox" type="checkbox" id="checkbox-${index}">
                        <label for="checkbox-${index}"></label>
                    </div>
                    <div class="to-do__item-container">
                        <input value="${toDo}" class="to-do__item" type="text" name="to-do__item" id="task-${index}"
                            placeholder="Write something...">
                        <label for="task-${index}"></label>
                    </div>
                    <div data-trashTodo-id="${index}" class="to-do__trash js-to-do__trash"></div>
                </div>
            `;
        });
      }
    }
  });

  document.querySelector(".js-to-dos").innerHTML = toDoHTML;
  readTrashAll();
}

function readTrashAll() {
  document.querySelectorAll(".js-to-do__trash").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const trashTodoId = element.dataset.trashtodoId;

      removeToDo(taskId, trashTodoId);

      renderToDo();
    });
  });
}

document.querySelector(".js-button__text").addEventListener("click", () => {
  var popupContainer = document.querySelector(".js-popup__container");
  var popup = document.querySelector(".js-popup");

  popupContainer.style.opacity = "1";
  popup.style.display = "flex";
});

document.getElementById("newToDo").addEventListener("submit", (event) => {
  event.preventDefault();

  var newData = new FormData(newToDo);

  var value = Object.fromEntries(newData)["new-toDo"];

  var popupContainer = document.querySelector(".js-popup__container");
  var popup = document.querySelector(".js-popup");

  const emptyToDoElement = document.getElementById("empty-todo__list");

  addToDo(value, taskId);

  console.log(newData);

  popupContainer.style.opacity = "0";

  setTimeout(() => {
    popup.style.display = "none";
    emptyToDoElement.style.display = "none";

    renderToDo();
  }, 1500);

  newToDo.reset();
});
