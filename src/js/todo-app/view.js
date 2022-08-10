// Создание заголовка приложения
function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.textContent = title;

  return appTitle;
}

// создание формы добавления дела
function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название дела';
  buttonWrapper.classList.add('input.group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input, buttonWrapper);

  return {
      form,
      input,
      button
  };
}

// создание списка элементов
function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  return list;
}

// создание элемента списка
function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const doneClass = 'list-group-item-success';

  const item = document.createElement('li');

  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'aligh-item-center');
  console.log(todoItem);
  if (todoItem.done) {
    item.classList.add(doneClass);
  }
  
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  doneButton.addEventListener('click', () => {
      onDone(todoItem);
      item.classList.toggle(doneClass, todoItem.done);
  })

  deleteButton.addEventListener('click', () => {
      onDelete({ todoItem, element: item });
  })

  buttonGroup.append(doneButton, deleteButton);
  item.append(buttonGroup);

  return item;
}

async function createTodoApp(container, {
  title, 
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick
}) {

  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle, todoItemForm.form, todoList);

  if (!todoItemList) {
    todoItemList = [];
  }

  todoItemList.forEach(todoItem => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement);
  });

  todoItemForm.form.addEventListener('submit', async e => {
      e.preventDefault();

      if (!todoItemForm.input.value.trim()) {
        return;
      }

      const todoItem = await onCreateFormSubmit({
        owner,
        name: todoItemForm.input.value.trim(),
      });

      const todoItemElement = createTodoItemElement(todoItem, handlers);

      todoList.append(todoItemElement);

      todoItemForm.input.value = '';
  });
}

export { createTodoApp };