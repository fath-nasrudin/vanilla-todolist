import Model from '../model.js';
import { addTaskComponent, renderEditTaskForm } from './addTask.component.js';

export const renderTaskItem = (taskItemElement, taskData) => {
  const taskItem = taskItemElement;
  taskItem.innerHTML = '';

  const taskCheck = document.createElement('div');
  taskCheck.classList.add('task-check');
  taskItem.appendChild(taskCheck);
  taskItem.setAttribute('data-iscompleted', !!taskData.isCompleted);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  taskCheck.appendChild(checkBox);
  checkBox.checked = taskData.isCompleted;
  checkBox.addEventListener('change', () => {
    const updatedTask = Model.updateTask(taskData.id, {
      isCompleted: checkBox.checked,
    });
    renderTaskItem(taskItem, updatedTask);
  });

  const taskBody = document.createElement('div');
  taskBody.classList.add('task-body');
  taskItem.appendChild(taskBody);

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task-title');
  taskTitle.textContent = taskData.title;
  taskBody.appendChild(taskTitle);

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-item-actions');
  taskItem.appendChild(taskActions);

  const editButton = document.createElement('button');
  editButton.classList.add('task-item-edit-button');
  editButton.textContent = 'edit';
  editButton.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    const taskId = taskItem.dataset.taskid;
    const taskData = Model.getTaskById(taskId);
    renderEditTaskForm(taskItem, taskData);
  });
  taskActions.appendChild(editButton);

  return taskItem;
};

const taskItemComponent = (taskData) => {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.setAttribute('data-taskid', taskData.id);

  return renderTaskItem(taskItem, taskData);
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
