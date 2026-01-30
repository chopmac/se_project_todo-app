 export default class Todo {
  constructor(data, templateSelector, onToggleCompleted, onDelete) {
    this._data = data;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._completed = data.completed;
    this._onToggleCompleted = onToggleCompleted;
    this._onDelete = onDelete;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const todoElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete();
    });

    this._todoCheckbox.addEventListener("change", () => {
      this._completed = !this._completed;
      this._handleCheckbox();
    });
  }

  _handleDelete() {
    this._onDelete(this._completed);
    this._element.remove(); 
  }

  _handleCheckbox() {
    this._onToggleCompleted(this._completed);
  }

  getView() {
    this._element = this._getTemplate();
    this._todoNameEl = this._element.querySelector(".todo__name");
    this._todoCheckbox = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
    this._todoDate = this._element.querySelector(".todo__date");

    this._todoNameEl.textContent = this._name;
    
   
    this._todoCheckbox.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
    this._todoCheckbox.checked = this._completed;

    if (this._date) {
        const dueDate = new Date(this._date);
        if (!isNaN(dueDate)) {
            this._todoDate.textContent = `Due: ${dueDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}`;
        }
    }

    this._setEventListeners();

    return this._element;
  }
}


