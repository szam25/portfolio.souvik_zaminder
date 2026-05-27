// To-Do List Application with Local Storage

class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = 'all';
    this.storageKey = 'todoList';
    
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    const addBtn = document.getElementById('addBtn');
    const todoInput = document.getElementById('todoInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearBtn = document.getElementById('clearBtn');

    // Add task on button click
    addBtn.addEventListener('click', () => this.addTodo());

    // Add task on Enter key
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });

    // Filter tasks
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
      });
    });

    // Clear completed tasks
    clearBtn.addEventListener('click', () => this.clearCompleted());
  }

  addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') {
      alert('Please enter a task');
      return;
    }

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.unshift(todo);
    this.saveToStorage();
    input.value = '';
    input.focus();
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToStorage();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
      this.render();
    }
  }

  clearCompleted() {
    const completedCount = this.todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
      alert('No completed tasks to clear');
      return;
    }

    if (confirm(`Clear ${completedCount} completed task(s)?`)) {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveToStorage();
      this.render();
    }
  }

  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  updateStats() {
    const totalCount = document.getElementById('totalCount');
    const completedCount = document.getElementById('completedCount');

    totalCount.textContent = this.todos.length;
    completedCount.textContent = this.todos.filter(t => t.completed).length;
  }

  render() {
    const todoList = document.getElementById('todoList');
    const filteredTodos = this.getFilteredTodos();

    todoList.innerHTML = '';

    if (filteredTodos.length === 0) {
      todoList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <p>${this.currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : 
              this.currentFilter === 'active' ? 'No active tasks!' : 'No completed tasks!'}</p>
        </div>
      `;
    } else {
      filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
          <input 
            type="checkbox" 
            class="checkbox" 
            ${todo.completed ? 'checked' : ''}
            data-id="${todo.id}"
          >
          <span class="todo-text">${this.escapeHtml(todo.text)}</span>
          <button class="delete-btn" data-id="${todo.id}">Delete</button>
        `;

        // Add event listeners
        const checkbox = li.querySelector('.checkbox');
        const deleteBtn = li.querySelector('.delete-btn');

        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

        todoList.appendChild(li);
      });
    }

    this.updateStats();
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      alert('Failed to save tasks. Your browser storage may be full.');
    }
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.todos = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      this.todos = [];
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});
