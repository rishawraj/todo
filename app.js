// class todo-list
class TODOList {
  constructor(task) {
    this.task = task;
  }
}

// UI class
class UI {
  static displayTask() {
    // const getTasks = ["do laundry", "go to gym"];
    const tasks = Store.getTasks();

    tasks.forEach((task) => UI.addTaskToList(task));
  }
  //   add to UI
  static addTaskToList(task) {
    const todoList = document.querySelector(".todo-list");

    const div = document.createElement("div");

    div.innerHTML = `
       <div
          class="d-flex justify-content-between bg-secondary align-items-center p-2 m-1"
        >
          <input type="checkbox" /> <span class="text-capitalize">${task}</span>
          <button  class="btn btn-danger delete">delete</button>
        </div>
    `;
    todoList.appendChild(div);
    // UI.displayTask(task);
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
    // console.log(el);
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
  //   console.log(newTask);
  UI.addTaskToList(newTask.task);
  //   add to local storage
  Store.addTask(taskValue);

  UI.clearField();
});

//  remove a task
document.querySelector(".todo-list").addEventListener("click", (e) => {
  UI.removeTask(e.target);
  if (e.target.classList.contains("delete")) {
    // consse.target.parentElement;
    // e.target.parentElement.parentElement.classList.add("delete");
    // console.log(e.target.parentNode.textContent);
    let x = e.target.parentElement.textContent
      .trim()
      .match(/^(?!.*delete).*/)[0];
    console.log(x);
    Store.removeTask(x);
  }
});

// complete a task
