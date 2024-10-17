import {
  toDoLists,
  loadListsFromStorage,
  addList,
  removeList,
  modifyList,
} from "../../data/toDoLists.js";

// import { displayToDoList } from "./toDo.js";

renderList();
initCreate();

// get data parameter
function getinitStatus(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Handle submit utton and key enter to create a new list
function handleSubmit(event, element) {
  event.preventDefault();

  const formId = element.dataset.formId;
  const value = document.getElementById(`list-${formId}`).value;

  modifyList(formId, value);

  setTimeout(() => {
    document.getElementById(`submit-${formId}`).style.display = "none";

    document.getElementById(`list-${formId}`).setAttribute("readonly", "true");
  }, 100);
}

// Init when we visit the website the first time
function initCreate() {
  var checkInitStatus = getinitStatus("checkInitStatus");

  if (toDoLists.length === 0 && checkInitStatus === null) {
    const initList = document.getElementById("hide-empty-list__init");
    initList.style.display = "flex";
  } else if (toDoLists.length === 0 && checkInitStatus) {
    const deletedListElement = document.getElementById(
      "hide-empty-list__deleted"
    );

    deletedListElement.style.display = "flex";
  }
}

// function to render/refresh the list
function renderList() {
  let listsHTML = "";

  loadListsFromStorage();

  toDoLists.forEach((list) => {
    listsHTML += `
        <div id="${list.id}" class="list js-list">
            <div data-trash-id="${list.id}" class=" list__trash js-list__trash"></div>

            <form data-form-id="${list.id}" class="list__item-container to-do__item-container js-form">
                <input data-input-id="${list.id}" autofocus readonly="true" value="${list.TitleList}" class="to-do__item list__item js-list__item" type="text" name="list__item" id="list-${list.id}"
                    placeholder="Write something...">
                <label for="list-${list.id}"></label>

                <button id="submit-${list.id}" data-submit-id="${list.id}" type="submit" class="list__submit"></button>
            </form>

            <div data-arrow-id="${list.id}" class="list__arrow js-list__arrow">
                <span></span>
                <span></span>
            </div>
        </div>
    `;
  });

  document.querySelector(".js-lists").innerHTML = listsHTML;

  document.querySelectorAll(".js-list__arrow").forEach((element) => {
    element.addEventListener("click", () => {
      const arrowId = element.dataset.arrowId;

      // displayToDoList(arrowId);

      window.location.href = `toDo.html?id=${arrowId}`;
    });
  });

  document.querySelectorAll(".js-list__trash").forEach((element) => {
    element.addEventListener("click", () => {
      const trashId = element.dataset.trashId;
      const emptyListElement = document.getElementById(
        "hide-empty-list__deleted"
      );

      removeList(trashId);

      if (toDoLists.length === 0) {
        emptyListElement.style.display = "flex";
      }

      renderList();
    });
  });

  document.querySelectorAll(".js-list__item").forEach((element) => {
    element.addEventListener("dblclick", () => {
      element.removeAttribute("readonly");
      const inputId = element.dataset.inputId;

      document.getElementById(`submit-${inputId}`).style.display = "flex";
    });
  });
}

document.querySelectorAll(".js-form").forEach((element) => {
  element.addEventListener("submit", (event) => {
    console.log("submit");
    handleSubmit(event, element);
  });

  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSubmit(event, element);
    }
  });
  element.reset();
});

// Listen when to click on the button for adding a new list
document.querySelector(".js-button--newList").addEventListener("click", () => {
  var popupContainer = document.querySelector(".js-popup__container");
  var popup = document.querySelector(".js-popup");

  popupContainer.style.opacity = "1";
  popup.style.display = "flex";
});

// management of the popup submit form
document.getElementById("newList").addEventListener("submit", (event) => {
  event.preventDefault();

  var newData = new FormData(newList);
  var value = Object.fromEntries(newData)["new-list"];

  var popupContainer = document.querySelector(".js-popup__container");
  var popup = document.querySelector(".js-popup");

  const initListElement = document.getElementById("hide-empty-list__init");
  const emptyListElement = document.getElementById("hide-empty-list__deleted");

  addList(value);

  popupContainer.style.opacity = "0";

  setTimeout(() => {
    popup.style.display = "none";
    initListElement.style.display = "none";
    emptyListElement.style.display = "none";

    renderList();
  }, 1500);

  newList.reset();
});
