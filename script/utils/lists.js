import { lists } from "../../data/toDoLists.js";
// import { displayToDoList } from "./toDo.js";

let listsHTML = "";

lists.forEach((list) => {
  listsHTML += `
        <div id="${list.id}" class="list js-list">
            <div data-trash-id="${list.id}" class=" list__trash js-list__trash"></div>



            <div class="list__item-container to-do__item-container">
                <input value="${list.TitleList}" class="to-do__item list__item" type="text" name="list__item" id="list-${list.id}"
                    placeholder="Write something...">
                <label for="list-${list.id}"></label>
            </div>

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

    console.log(trashId);
  });
});

document.querySelector(".js-button--newList").addEventListener("click", () => {
  console.log("new list");
});
