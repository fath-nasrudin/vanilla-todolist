import {
  modalProjectComponent,
  renderModalComponent,
} from './components/modal.js';
import { tasklistComponent } from './components/tasklist.component.js';
import Model from './model.js';

import { renderPage } from './controller.js';
import { renderMobileLeftbar } from './components/leftbar.component.js';

const switchLeftbarActiveTab = (tabId) => {
  const navItems = document.querySelectorAll('.leftbar .nav-item');

  navItems.forEach((item) => {
    if (item.getAttribute('data-id') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

const navItemActionsComponent = () => {
  const actions = document.createElement('div');
  actions.classList.add('nav-item-actions');

  const editButton = document.createElement('button');
  editButton.textContent = 'edit';
  editButton.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('edit clicked');
    const navItem = e.target.closest('.nav-item');
    const id = navItem.dataset.id;
    const project = Model.getProjectById(id);

    const root = document.getElementById('root');

    root.append(modalProjectComponent(project, navItem));
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'delete';
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const tabId = e.target.closest('.nav-item').dataset.id;

    console.log(tabId);
    Model.deleteProject(tabId);
    renderPage();
  });

  actions.append(editButton, deleteButton);
  return actions;
};

export const leftbarTabItemComponent = ({
  parent = null,
  clickListener,
  actions,
  project,
}) => {
  let li;
  if (parent) {
    li = parent;
  } else {
    li = document.createElement('li');
    li.classList.add('nav-item');
    li.setAttribute('data-id', project.id);
  }
  li.innerHTML = '';

  const title = document.createElement('div');
  title.textContent = project.title;
  li.append(title);
  if (actions) {
    li.append(navItemActionsComponent());
  }

  li.addEventListener('click', () => switchLeftbarActiveTab(project.id));
  li.addEventListener('click', (e) => clickListener(e));
  return li;
};

export const leftbarTablistComponent = ({
  parent = null,
  projects,
  clickListener,
  actions = false,
}) => {
  let ul;
  if (parent) {
    ul = parent;
  } else {
    ul = document.createElement('ul');
    ul.classList.add('nav');
  }
  ul.innerHTML = '';

  projects.forEach((project) => {
    const li = leftbarTabItemComponent({ clickListener, actions, project });
    ul.appendChild(li);
  });

  return ul;
};

const leftbarComponent = ({ defaultTabs, projectTabs, tabClickListener }) => {
  const nav = document.createElement('nav');
  nav.classList.add('leftbar');

  const defaultTabsComponent = leftbarTablistComponent({
    projects: defaultTabs,
    clickListener: tabClickListener,
  });

  nav.appendChild(defaultTabsComponent);

  const wrapper = document.createElement('div');
  nav.append(wrapper);

  const ProjectListHeader = document.createElement('div');
  ProjectListHeader.classList.add('project-list-header');
  wrapper.append(ProjectListHeader);

  const projectlistTitle = document.createElement('div');
  projectlistTitle.classList.add('project-list-header-title');
  projectlistTitle.textContent = 'Projects';
  ProjectListHeader.append(projectlistTitle);

  const addProjectButton = document.createElement('button');
  addProjectButton.textContent = 'Add';
  addProjectButton.classList.add('add-project-button');
  addProjectButton.addEventListener('click', () => {
    renderModalComponent();
  });
  ProjectListHeader.append(addProjectButton);

  const lowerProjects = leftbarTablistComponent({
    projects: projectTabs,
    clickListener: tabClickListener,
    actions: true,
  });

  lowerProjects.id = 'projectTablist';
  wrapper.appendChild(lowerProjects);

  return nav;
};

const View = {
  renderLeftbar({ defaultTabs, projectTabs, tabClickListener }) {
    const root = document.getElementById('root');

    const leftbar = leftbarComponent({
      defaultTabs,
      projectTabs,
      tabClickListener,
    });

    root.append(leftbar);
  },

  renderMainbar({ title = 'Untitled', tasks, project }) {
    const root = document.getElementById('root');

    // mainbar
    let mainbar;
    mainbar = document.querySelector('.mainbar');
    if (mainbar) mainbar.innerHTML = '';
    if (!mainbar) {
      mainbar = document.createElement('div');
      mainbar.classList.add('mainbar');
      root.appendChild(mainbar);
    }

    mainbar.setAttribute('data-projectId', project.id);

    // header
    const header = document.createElement('header');
    header.classList.add('main-header');

    const leftbarButton = document.createElement('button');
    leftbarButton.classList.add('leftbar-button');
    leftbarButton.textContent = 'Show';
    leftbarButton.addEventListener('click', () => {
      renderMobileLeftbar();
    });

    const brand = document.createElement('div');
    brand.classList.add('brand');
    brand.textContent = 'VanillaTodo';

    header.append(leftbarButton, brand);
    mainbar.append(header);

    // title
    const tabTitle = document.createElement('div');
    tabTitle.classList.add('title');
    tabTitle.textContent = title;
    mainbar.appendChild(tabTitle);

    // link source code
    const linkSourceCode = document.createElement('a');
    linkSourceCode.classList.add('link-source-code');
    linkSourceCode.textContent = 'Source Code';
    linkSourceCode.href = 'https://github.com/fath-nasrudin/vanilla-todolist';
    linkSourceCode.target = '_blank';
    header.append(linkSourceCode);

    // task-list-container
    const tasklistContainer = document.createElement('div');
    tasklistContainer.classList.add('task-list-container');
    mainbar.appendChild(tasklistContainer);

    // task-list
    const tasklist = tasklistComponent({ tasks, tasklistId: project.id });
    tasklistContainer.appendChild(tasklist);
  },

  renderInit({
    defaultTabs,
    projectTabs,
    switchActiveTab,
    contentTitle,
    tasks,
    tabClickListener,
    project,
  }) {
    const root = document.getElementById('root');
    root.innerHTML = '';

    this.renderLeftbar({
      defaultTabs,
      projectTabs,
      switchActiveTab,
      tabClickListener,
    });

    this.renderMainbar({ title: contentTitle, tasks, project });
  },
};

export default View;
