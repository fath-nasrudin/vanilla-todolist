import * as Controller from '../controller.js';
import Model from '../model.js';
import { renderTaskItem } from './tasklist.component.js';

const projectOptionsComponent = (selectedProjectId = null) => {
  const projects = Model.getAllProjects();
  const select = document.createElement('select');
  select.name = 'projectId';

  projects.forEach((project) => {
    const option = document.createElement('option');
    if (project.id === selectedProjectId) {
      option.selected = true;
    }
    option.value = project.id;
    option.textContent = project.title;

    select.appendChild(option);
  });
  return select;
};

export const addTaskFormComponent = () => {
  const mainbar = document.querySelector('.mainbar');
  const { projectid } = mainbar.dataset;

  const form = document.createElement('form');
  form.id = 'addTaskForm';
  form.classList.add('add-task-form');

  // Input for title
  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'taskInputTitle';
  titleLabel.classList.add('add-task-title-label');
  titleLabel.textContent = 'Title:';
  form.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.id = 'taskInputTitle';
  titleInput.classList.add('add-task-title-input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.required = true;
  titleInput.placeholder = 'Task name';
  form.appendChild(titleInput);

  const footer = document.createElement('div');
  footer.classList.add('add-task-form-footer');
  form.append(footer);

  // options
  const projectOptions = projectOptionsComponent(projectid);
  projectOptions.classList.add('add-task-project-options');

  // cancel add task button
  const cancelAddTaskButton = document.createElement('button');
  cancelAddTaskButton.classList.add('add-task-cancel-button');
  cancelAddTaskButton.textContent = 'Cancel';
  cancelAddTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    const addTask = e.target.closest('.add-task');
    addTask.innerHTML = '';
    addTask.append(addTaskButtonComponent());
  });

  // save task button
  const saveTaskButton = document.createElement('button');
  saveTaskButton.classList.add('add-task-save-button');
  saveTaskButton.textContent = 'Save';
  saveTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    const mainbar = e.target.closest('.mainbar');
    const { projectid } = mainbar.dataset;

    const taskData = {
      title: titleInput.value,
      projectId: projectOptions.value,
    };
    Controller.addTask(taskData);

    // reset the input
    titleInput.value = '';
  });

  footer.append(projectOptions, cancelAddTaskButton, saveTaskButton);
  return form;
};

export const renderEditTaskForm = (parent, taskData) => {
  parent.innerHTML = '';
  const form = document.createElement('form');
  form.id = 'addTaskForm';
  form.classList.add('add-task-form');
  parent.appendChild(form);

  // Input for title
  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'taskInputTitle';
  titleLabel.classList.add('add-task-title-label');
  titleLabel.textContent = 'Title:';
  form.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.id = 'taskInputTitle';
  titleInput.classList.add('add-task-title-input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.value = taskData.title;
  titleInput.required = true;
  titleInput.placeholder = 'Task name';
  form.appendChild(titleInput);

  const footer = document.createElement('div');
  footer.classList.add('add-task-form-footer');
  form.append(footer);

  // options
  const projectOptions = projectOptionsComponent(taskData.projectId);
  projectOptions.classList.add('add-task-project-options');

  // cancel add task button
  const cancelAddTaskButton = document.createElement('button');
  cancelAddTaskButton.classList.add('add-task-cancel-button');
  cancelAddTaskButton.textContent = 'Cancel';
  cancelAddTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    renderTaskItem(parent, taskData);
  });

  // save task button
  const saveTaskButton = document.createElement('button');
  saveTaskButton.classList.add('add-task-save-button');
  saveTaskButton.textContent = 'Save';
  saveTaskButton.addEventListener('click', (e) => {
    e.preventDefault();

    const toUpdateTaskData = {
      title: titleInput.value,
      projectId: projectOptions.value,
    };

    const updatedTask = Model.updateTask(taskData.id, toUpdateTaskData);

    renderTaskItem(parent, updatedTask);
  });

  footer.append(projectOptions, cancelAddTaskButton, saveTaskButton);
};

export const addTaskButtonComponent = () => {
  const triggerFormButton = document.createElement('button');
  triggerFormButton.textContent = 'Add task';
  triggerFormButton.classList.add('add-task-button');

  triggerFormButton.addEventListener('click', (e) => {
    const addTask = e.target.closest('.add-task');
    addTask.innerHTML = '';
    addTask.append(addTaskFormComponent());
  });

  return triggerFormButton;
};

export const addTaskComponent = () => {
  const addTask = document.createElement('div');
  addTask.classList.add('add-task');

  // button for trigger create form
  const triggerFormButton = addTaskButtonComponent();
  addTask.appendChild(triggerFormButton);

  return addTask;
};
