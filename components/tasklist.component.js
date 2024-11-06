import { addTaskComponent } from './addTask.component.js';

const taskItemComponent = (taskData) => {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  const taskCheck = document.createElement('div');
  taskCheck.classList.add('task-check');
  taskItem.appendChild(taskCheck);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  taskCheck.appendChild(checkBox);

  const taskBody = document.createElement('div');
  taskBody.classList.add('task-body');
  taskItem.appendChild(taskBody);

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task-title');
  taskTitle.textContent = taskData.title;
  taskBody.appendChild(taskTitle);

  return taskItem;
};

const populateTasklist = (parent, tasks) => {
  if (!tasks.length) {
    const noTaskAvailable = document.createElement('p');
    noTaskAvailable.classList.add('task-empty');
    noTaskAvailable.textContent = 'There are no tasks available';
    parent.appendChild(noTaskAvailable);
  }

  tasks.forEach((t) => {
    const taskItem = taskItemComponent(t);
    parent.appendChild(taskItem);
  });
};

export const updateTasklist = ({ tasklistId, tasks }) => {
  const currentTasklist = document.querySelector(
    `.task-list[data-tasklistid="${tasklistId}"]`
  );

  if (currentTasklist) {
    currentTasklist.innerHTML = '';
    populateTasklist(currentTasklist, tasks);
  }
};

export const tasklistComponent = ({ tasklistId, tasks }) => {
  const taskSection = document.createElement('section');
  taskSection.classList.add('task-list-section');

  const tasklist = document.createElement('div');
  tasklist.classList.add('task-list');
  if (tasklist) {
    tasklist.setAttribute('data-tasklistid', tasklistId);
  }
  taskSection.appendChild(tasklist);

  populateTasklist(tasklist, tasks);

  taskSection.append(addTaskComponent());
  return taskSection;
};
