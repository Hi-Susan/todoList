let taskUndone = [];
let taskDone = [];

// 新增 任務
function addTask (isDone) {
  let text = document.querySelector('#addTodoInfo').value.replace(/^\s+|\s+$/g, "");
  document.querySelector('#addTodoInfo').value = '';
  if(text === '') return
  isDone ? taskDone.push(text) : taskUndone.push(text)
  updataTaskList();
}
// 清除 任務資料
function clearTaskList (isDone) {
  isDone ? taskDone = [] : taskUndone = []
  updataTaskList();
}
// 更新 任務列表
function updataTaskList () {
  removeAllTask();
  taskUndone.forEach(function(element) {
    document.querySelector('#taskUndone').innerHTML += taskTemplate(false, element)
  })
  taskDone.forEach(function(element) {
    document.querySelector('#taskDone').innerHTML += taskTemplate(true, element)
  })
  updataTaskCount();
  checkedTask();
}
// 更新 任務列表數量總計
function updataTaskCount () {
  document.querySelector('#taskUndoneCount').textContent = taskUndone.length
  document.querySelector('#taskDoneCount').textContent = taskDone.length
}
// 移除 任務列表 html (重新渲染使用的)
function removeAllTask() {
  document.querySelector('#taskUndone').innerHTML = '';
  document.querySelector('#taskDone').innerHTML = '';
}
// 模板 (渲染使用)
function taskTemplate (isDone, text) {
  let taskTemplate = `
  <li>
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
  Array.prototype.forEach.call(nodecheckbox, function(item, index) {
    item.addEventListener('change', (event) => {
      if (event.target.checked) {
        taskDone.push(taskUndone[index]);
        taskUndone.splice(index, 1)
      }
      if(!event.target.checked) {
        index = index - taskUndone.length;
        taskUndone.push(taskDone[index]);
        taskDone.splice(index, 1)
      }
      updataTaskList();
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