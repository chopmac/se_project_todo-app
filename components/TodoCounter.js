export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;
    this._updateText();
  }

 
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

 
 updateTotal = (increment) => {
  if (increment === true) {
    this._total += 1;
  } else if (increment === false) {
    this._total -= 1;
  }

  this._updateText();
};

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}