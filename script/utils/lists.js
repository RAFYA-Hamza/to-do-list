import {
  toDoLists,
  loadListsFromStorage,
  addList,
  removeList,
  modifyList,
} from "../../data/toDoLists.js";

// import { displayToDoList } from "./toDo.js";

renderList();

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
      removeList(trashId);
      renderList();
    });
  });

  document.querySelectorAll(".js-list__item").forEach((element) => {
    element.addEventListener("dblclick", () => {
      element.removeAttribute("readonly");
      const inputId = element.dataset.inputId;

      document.getElementById(`submit-${inputId}`).style.display = "flex";
    });

    element.addEventListener("input", () => {
      console.log(element.value);
    });
  });
}

document.querySelectorAll(".js-form").forEach((element) => {
  element.addEventListener("submit", (event) => {
    event.preventDefault();

    const formId = element.dataset.formId;
    const value = document.getElementById(`list-${formId}`).value;

    modifyList(formId, value);

    setTimeout(() => {
      document.getElementById(`submit-${formId}`).style.display = "none";

      document
        .getElementById(`list-${formId}`)
        .setAttribute("readonly", "true");
    }, 100);
  });
  element.reset();
});

document.querySelector(".js-button--newList").addEventListener("click", () => {
  var popupContainer = document.querySelector(".js-popup__container");
  var popup = document.querySelector(".js-popup");

  popupContainer.style.opacity = "1";
  popup.style.display = "flex";
});

document.getElementById("newList").addEventListener("submit", (event) => {
  event.preventDefault();

  var newData = new FormData(newList);
  var value = Object.fromEntries(newData)["new-list"];

  var popupContainer = document.querySelector(".js-popup__container");
  var popup = document.querySelector(".js-popup");

  addList(value);

  popupContainer.style.opacity = "0";

  setTimeout(() => {
    popup.style.display = "none";
    renderList();
  }, 1500);

  newList.reset();
});
