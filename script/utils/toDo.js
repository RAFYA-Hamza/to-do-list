import { lists } from "../../data/toDoLists.js";

let toDoHTML = "";

// Function to get the query parameter (task ID)
function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const taskId = getQueryParameter("id");

console.log(taskId);

var toDoList = lists[taskId].toDo;

toDoList.forEach((toDo, index) => {
  console.log(toDo);
  toDoHTML += `
        <div id="${index}" class="to-do">

            <div class="to-do__checkbox-container">
                <input class="to-do__checkbox" type="checkbox" id="checkbox-${index}">
                <label for="checkbox-${index}"></label>
            </div>

            <div class="to-do__item-container">
                <input value="${toDo}" class="to-do__item" type="text" name="to-do__item" id="task-${index}"
                    placeholder="Write something...">
                <label for="task-${index}"></label>
            </div>

            <div class="to-do__trash"></div>
        </div>
    `;
});

document.querySelector(".js-to-dos").innerHTML = toDoHTML;