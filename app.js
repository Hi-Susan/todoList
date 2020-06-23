let taskUndone = [];
let taskDone = [];

// 新增 任務
function addTask (isDone) {
  let text = document.querySelector('#addTodoInfo').value.replace(/^\s+|\s+$/g, "");
  document.querySelector('#addTodoInfo').value = '';
  if(text === '') return
  isDone ? taskDone.push(text) : taskUndone.push(text)
  updateTaskList();
}
// 清除 任務資料
function clearTaskList (isDone) {
  isDone ? taskDone = [] : taskUndone = []
  updateTaskList();
}
// 更新 任務列表
function updateTaskList () {
  removeAllTask();
  taskUndone.forEach(function(element, index) {
    document.querySelector('#taskUndone').innerHTML += taskTemplate(false, element, index)
  })
  taskDone.forEach(function(element, index) {
    document.querySelector('#taskDone').innerHTML += taskTemplate(true, element, index)
  })
  updateTaskCount();
  checkedTask();
  deleteTask();
}
// 更新 任務列表數量總計
function updateTaskCount () {
  document.querySelector('#taskUndoneCount').textContent = taskUndone.length
  document.querySelector('#taskDoneCount').textContent = taskDone.length
}
// 移除 任務列表 html (重新渲染使用的)
function removeAllTask() {
  document.querySelector('#taskUndone').innerHTML = '';
  document.querySelector('#taskDone').innerHTML = '';
}
// 模板 (渲染使用)
function taskTemplate (isDone, text, index) {
  let taskTemplate = `
  <li data-index="${index}" class="${ isDone ?'done': 'undone'}">
    <label class="checkbox-group ${ isDone ?'isChecked': ''}">
      <input type="checkbox" class="checkbox" ${ isDone ?'checked': ''}>
      <span class="todo-list-text">${text}</span>
    </label>
    <a href="javascript:;" class="todo-delete"></a>
  </li>
  `
  return taskTemplate
}
// 勾選事件
function checkedTask () {
  let nodecheckbox = document.querySelectorAll('.checkbox')
  Array.prototype.forEach.call(nodecheckbox, function(item) {
    item.addEventListener('change', (event) => {
      var index = event.target.closest('li').dataset.index;
      if (event.target.checked) {
        taskDone.push(taskUndone[index]);
        taskUndone.splice(index, 1)
      }
      if(!event.target.checked) {
        taskUndone.push(taskDone[index]);
        taskDone.splice(index, 1)
      }
      updateTaskList();
    })
  })
}
// 刪除事件
function deleteTask () {
  let nodeDeleteButton = document.querySelectorAll('.todo-delete')
  Array.prototype.forEach.call(nodeDeleteButton, function(item, index) {
    item.addEventListener('click', function() {
      var isUnDone = this.closest('li').className.indexOf('undone') > -1;
      var index = this.closest('li').dataset.index;
      isUnDone ? taskUndone.splice(index, 1) : taskDone.splice(index, 1);
      updateTaskList();
    })
  })
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#addTodo').addEventListener('click', function() {
    addTask(false)
  });
  let nodeClearbuttons = document.querySelectorAll('.clearTaskList')
  Array.prototype.forEach.call(nodeClearbuttons, function(item) {
    item.addEventListener('click', function() {
      String.prototype.bool = function() {
        return (/^true$/i).test(this);
      };
      clearTaskList(item.dataset.isDone.bool())
    });
  });
});