export async function getTodoList(owner) {
  const currentDeals = JSON.parse(localStorage.getItem(owner));
  return currentDeals;
}

export async function createTodoItem({ owner, name }) {
  let currentDeals = JSON.parse(localStorage.getItem(owner));
  let todoItem;

  if (currentDeals) {
    const currentId = currentDeals[currentDeals.length - 1].id + 1;

    todoItem = {
      name: name,
      owner: owner,
      done: false,
      id: currentId
    }

    currentDeals.push(todoItem);
  } else {
    const currentId = 1;

    todoItem = {
      name: name,
      owner: owner,
      done: false,
      id: currentId
    }

    currentDeals = [];
    currentDeals.push(todoItem)
  }

  localStorage.setItem(owner, JSON.stringify(currentDeals));
  return todoItem;
}

export function switchTodoItemDone(todoItem) {
  const currentDeals = JSON.parse(localStorage.getItem(todoItem.owner));

  const elemIndex = arrFindProperty(currentDeals, 'id', todoItem.id);
  
  // Переключение значений свойства done у списка дел
  if(elemIndex >= 0) {
    todoItem.done = !todoItem.done;
    currentDeals[elemIndex].done = !currentDeals[elemIndex].done;
  }

  localStorage.setItem(todoItem.owner, JSON.stringify(currentDeals));
  console.log(todoItem);
}

export function deleteTodoItem({ element, todoItem }) {
  if (!confirm('Вы уверены?')) {
    return;
  }

  const currentDeals = JSON.parse(localStorage.getItem(todoItem.owner));

  const elemIndex = arrFindProperty(currentDeals, 'id', todoItem.id);
  
  element.remove();
  if(elemIndex >= 0) {
    currentDeals.splice(elemIndex, 1);
    localStorage.setItem(todoItem.owner, JSON.stringify(currentDeals));
  }
}

// Возвращает индекс массива, соответствующий переданному значению свойства
function arrFindProperty(arr, property, value) {

  for (const index in arr) {
    if (arr[index][property] === value) {
      return index;
    } 
  }

  return -1;
}