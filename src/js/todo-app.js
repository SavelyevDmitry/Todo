import { createTodoApp } from './todo-app/view.js'

const container = document.getElementById('todo-app');
const changeStorageBtn = document.createElement('button');
let currentStorage = 'Server';
let path = 'api';

// Определение пользователя по ссылке
const person = window.location.pathname.slice(1);
let owner;
let title;
if (person === 'mom') {
    owner = 'Мама';
    title = 'Дела мамы';
} else if (person === 'dad') {
    owner = 'Папа';
    title = 'Дела папы'; 
} else {
    owner = 'Я';
    title = 'Мои дела'
}

changeStorageBtn.classList.add('btn', 'btn-primary', 'mb-5');
changeStorageBtn.textContent = `Переключиться на LocalStorage`;

changeStorageBtn.addEventListener('click', async () => {
    container.innerHTML = '';

    if (currentStorage === 'LocalStorage') {
        changeStorageBtn.textContent = `Переключиться на ${currentStorage}`;
        currentStorage = 'Server';
        path = 'api';
        await startApp();
    } else {
        changeStorageBtn.textContent = `Переключиться на ${currentStorage}`;
        currentStorage = 'LocalStorage';
        path = 'localStorage';
        await startApp();
    }

})

await startApp();

async function startApp() {

    const { getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } = await import(`./todo-app/${path}.js`);

    container.append(changeStorageBtn);
    const todoList = await getTodoList(owner);
    createTodoApp(container, {
        title, 
        owner,
        todoItemList: todoList,
        onCreateFormSubmit: createTodoItem,
        onDoneClick: switchTodoItemDone,
        onDeleteClick: deleteTodoItem
    });
}