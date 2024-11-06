import View from './view.js';
import Model from './model.js';
import { updateTasklist } from './components/tasklist.component.js';

export const switchActiveTab = () => {
  View.switchActiveTab();
};

export const addTask = (taskData) => {
  Model.addTask(taskData);
  // render
  // TODO: change the tasklist to dynamic
  const tasks = Model.getTasks({ projectId: taskData.projectId });

  updateTasklist({ tasklistId: taskData.projectId, tasks });
};

const tabClickListener = (e) => {
  const tabId = e.target.dataset.id;
  const project = Model.getProjectById(tabId);
  const tasks = Model.getTasks({ projectId: project.id });
  View.renderMainbar({ title: project.title, tasks: tasks, project });
};

export const switchContent = (tabId) => {
  // switch active tab
  // switch task content
  const project = Model.getProjectById(tabId);
  View.renderMainbar({ title: 'Others', tasks: [], project });
};

export const init = () => {
  Model.addProject({ title: 'Inbox', id: '1' });
  Model.addProject({ title: 'Works', id: '2' });
  Model.addProject({ title: 'Others', id: '3' });

  Model.addTask({ id: '1', title: 'Cuci baju', projectId: '1' });
  Model.addTask({ id: '2', title: 'membuat todolist', projectId: '2' });
  Model.addTask({ id: '3', title: 'Cuci javascript', projectId: '1' });

  // get the default tabs
  const defaultTabs = Model.getProjects();

  const projectTabs = [];

  const defaultProject = defaultTabs[0].id;
  const project = Model.getProjectById(defaultProject);
  const tasks = Model.getTasks({ projectId: project.id });
  View.renderInit({
    defaultTabs,
    projectTabs,
    contentTitle: project.title,
    tasks,
    project,
    tabClickListener,
  });

  // populate tasks button with function
};
// initialize
// get the projectss
// render the leftbar
// render the mainbar
