import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js"; 
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupForm = document.querySelector("#add-todo-popup").querySelector(".popup__form");

const addFormValidator = new FormValidator(validationConfig, addTodoPopupForm);
addFormValidator.enableValidation();

function generateTodo(data) {
  const todo = new Todo(
    data, 
    "#todo-template", 
    (isNowCompleted) => {
      
      todoCounter.updateCompleted(isNowCompleted);
    }, 
    (wasCompletedAtDeletion) => {
     
      todoCounter.updateTotal(false);
      if (wasCompletedAtDeletion) {
        todoCounter.updateCompleted(false);
      }
    }
  ); 
  return todo.getView();
}

const section = new Section(
  {
    items: initialTodos, 
    renderer: (item) => {
      const todoElement = generateTodo(item); 
      section.addItem(todoElement);
    },
    containerSelector: ".todos__list",
  }
);

const newTodoPopup = new PopupWithForm("#add-todo-popup", (inputValues) => {
  const name = inputValues.name;
  const dateInput = inputValues.date;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id, completed: false };
  
  const todoElement = generateTodo(values);
  section.addItem(todoElement);

  todoCounter.updateTotal(true);

  addFormValidator.resetValidation();
});

newTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  newTodoPopup.open();
});

section.renderItems();