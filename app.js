// class todo-list
class TODOList {
  constructor(task) {
    this.task = task;
  }
}

// UI class
class UI {
  static displayTask() {
    const tasks = Store.getTasks();

    tasks.forEach((task) => UI.addTaskToList(task));
  }
  //   add to UI
  static addTaskToList(task) {
    const todoList = document.querySelector(".todo-list");

    const div = document.createElement("div");

    div.innerHTML = `
       <div
          class="d-flex justify-content-between  align-items-center p-2 m-1 task-container" 
        >
          <input type="checkbox" for="text"/> 
          <label id="text">${task}</label>
          <button  class="btn btn-danger delete">Delete</button>
        </div>
    `;
    todoList.appendChild(div);
  }

  static clearField() {
    document.querySelector("#todo").value = "";
  }

  //   remove from UI
  static removeTask(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  // complete task
  //todo make these changes persist after refresh! add to localstorage
  //? fetch css rules from local storage??
  static completeTask(el) {
    if (el.classList.contains("task-container")) {
      el.firstElementChild.checked = !el.firstElementChild.checked;

      el.firstElementChild.nextElementSibling.classList.toggle("crossed");
      el.classList.toggle("checked");
    } else if (el.attributes[0].value == "text") {
      el.parentElement.firstElementChild.checked =
        !el.parentElement.firstElementChild.checked;

      el.classList.toggle("crossed");
      el.parentElement.classList.toggle("checked");
    }
  }
}

// store
class Store {
  static getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }
  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  static removeTask(el) {
    const tasks = Store.getTasks();

    tasks.forEach((task, index) => {
      if (task === el) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// display tasks
document.addEventListener("DOMContentLoaded", UI.displayTask);

// add  a task to UI

document.querySelector(".form-group").addEventListener("submit", (e) => {
  e.preventDefault();

  const taskValue = document.querySelector("#todo").value;
  const newTask = new TODOList(taskValue);
  UI.addTaskToList(newTask.task);
  //   add to local storage
  Store.addTask(taskValue);

  UI.clearField();
});

//  remove a task
document.querySelector(".todo-list").addEventListener("click", (e) => {
  UI.removeTask(e.target);
  if (e.target.classList.contains("delete")) {
    let x = e.target.parentElement.textContent
      .trim()
      .match(/^(?!.*delete).*/)[0];
    Store.removeTask(x);
  }
});

// complete a task
document.querySelector(".todo-list").addEventListener("click", (e) => {
  UI.completeTask(e.target);
  // ? store css rules in loacalstroage
  // Store.addCSSRules(e.target)
});
