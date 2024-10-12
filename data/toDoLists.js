export let toDoLists;

loadListsFromStorage();

// Load the to do lists from storage
export function loadListsFromStorage() {
  toDoLists = JSON.parse(localStorage.getItem("toDoLists"));

  if (!toDoLists) {
    toDoLists = [
      {
        id: "",
        TitleList: "",
        toDo: [],
      },
    ];
  }
}

// save the to do lists to storage
function saveListsToStorage() {
  localStorage.setItem("toDoLists", JSON.stringify(toDoLists));
}

// short random string for ids - not guaranteed to be unique
const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

// check if the id matches any other existing ids provided as an array
const checkId = function (id, existing = []) {
  let match = existing.find(function (item) {
    return item === id;
  });
  return match ? false : true;
};

// generate a unique id
const getId = function ({ length, existing = [] }) {
  const limit = 100; // max tries to create unique id
  let attempts = 0; // how many attempts
  let id = false;
  while (!id && attempts < limit) {
    id = randomId(length); // create id
    if (!checkId(id, existing)) {
      // check unique
      id = false; // reset id
      attempts++; // record failed attempt
    }
  }
  console.log(id);
  return id; // the id or false if did not get unique after max attempts
};

// Add the new list
export function addList(value) {
  const newId = getId({ length: 6, existing: Object.keys(toDoLists) });

  toDoLists.push({
    id: newId,
    TitleList: value,
    toDo: [],
  });

  saveListsToStorage();
}

// Remove a to do list from the list
export function removeList(Id) {
  const newToDolists = [];

  toDoLists.forEach((toDoList) => {
    if (toDoList.id !== Id) {
      newToDolists.push(toDoList);
    }
  });

  toDoLists = newToDolists;

  saveListsToStorage();
}

// modifying a list
export function modifyList(Id, value) {
  toDoLists.forEach((toDoList) => {
    if (toDoList.id === Id) {
      toDoList.TitleList = value;
    }
  });

  saveListsToStorage();
}

// Add the to do in list

export function addToDo(value, taskId) {
  toDoLists.forEach((toDoList) => {
    if (toDoList.id === taskId) {
      toDoList.toDo.push(value);
    }
  });

  saveListsToStorage();
}

// Remove to do from list
export function removeToDo(taskId, indexToDo) {
  toDoLists.forEach((toDoList) => {
    if (toDoList.id === taskId) {
      toDoList.toDo.splice(indexToDo, 1);
      console.log(toDoList.toDo);
    }
  });

  saveListsToStorage();
}

// export let lists = [
//   {
//     id: "0",
//     TitleList: "List 0",
//     toDo: ["List 0 to-do 0", "List 0 to-do 0", "List 0 to-do 0"],
//   },
//   {
//     id: "1",
//     TitleList: "List 1",
//     toDo: [
//       "List 1 to-do 1",
//       "List 1 to-do 1",
//       "List 1 to-do 1",
//       "List 1 to-do 1",
//     ],
//   },
//   {
//     id: "2",
//     TitleList: "List 2",
//     toDo: ["List 2 to-do 2", "List 2 to-do 2", "List 2 to-do 2"],
//   },
//   {
//     id: "3",
//     TitleList: "List 3",
//     toDo: ["List 3 to-do 3", "List 3 to-do 3"],
//   },
// ];
