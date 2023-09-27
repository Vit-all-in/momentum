export class TodoManager {
  constructor() {
    this.todoForm = document.querySelector('.todo-form');
    this.todoInput = document.querySelector('.todo-input');
    this.todoItemsList = document.querySelector('.todo-items');
    this.settingsTodo = document.querySelector('.settings-todo');
    this.todos = [];
    this.modal = document.getElementById("myModal");
    this.btn = document.getElementById("myBtn");
    this.span = document.getElementsByClassName("close")[0];
    
    this.todoForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.todoItemsList.addEventListener('click', this.handleTodoItemsListClick.bind(this));
    this.btn.addEventListener('click', this.handleModalOpen.bind(this));
    this.span.addEventListener('click', this.handleModalClose.bind(this));
    window.addEventListener('click', this.handleModalOutsideClick.bind(this));
    this.settingsTodo.addEventListener('click', this.handleSettingsTodoClick.bind(this));
    
    this.getFromLocalStorage();
  }
  
  handleFormSubmit(event) {
    event.preventDefault();
    this.addTodo(this.todoInput.value);
  }
  
  addTodo(item) {
    if (item !== '') {
      const todo = {
        id: Date.now(),
        name: item,
        completed: false
      };

      this.todos.push(todo);
      this.addToLocalStorage();
      this.todoInput.value = '';
    }
  }
  
  renderTodos() {
    this.todoItemsList.innerHTML = '';

    this.todos.forEach((item) => {
      const checked = item.completed ? 'checked': null;
      const li = document.createElement('li');

      li.setAttribute('class', 'item');
      li.setAttribute('data-key', item.id);

      if (item.completed === true) {
        li.classList.add('checked');
      }

      li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
      `;
      this.todoItemsList.append(li);
    });
  }
  
  addToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.renderTodos();
  }
  
  getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
      this.todos = JSON.parse(reference);
      this.renderTodos();
    }
  }
  
  toggle(id) {
    this.todos.forEach((item) => {
      if (item.id == id) {
        item.completed = !item.completed;
      }
    });

    this.addToLocalStorage();
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter((item) => {
      return item.id != id;
    });
    this.addToLocalStorage();
  }
  
  handleTodoItemsListClick(event) {
    if (event.target.type === 'checkbox') {
      this.toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')) {
      this.deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
  }
  
  handleModalOpen() {
    this.modal.style.display = "block";
  }
  
  handleModalClose() {
    this.modal.style.display = "none";
  }
  
  handleModalOutsideClick(event) {
    if (event.target == this.modal) {
      this.modal.style.display = "none";
    }
  }
  
  handleSettingsTodoClick() {
    const todo = document.querySelector('#myBtn');
    todo.classList.toggle('hidden');
    this.settingsTodo.classList.toggle('opacity');
  }
}

// Инициализация класса
export function initTodo() {
  const todoManager = new TodoManager();
}