import { tasklistComponent } from './components/tasklist.component.js';

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

const leftbarTablistComponent = ({ projects, clickListener }) => {
  const ul = document.createElement('ul');
  ul.classList.add('nav');

  projects.forEach((p) => {
    const li = document.createElement('li');
    li.classList.add('nav-item');
    li.textContent = p.title;
    li.setAttribute('data-id', p.id);
    li.addEventListener('click', () => switchLeftbarActiveTab(p.id));

    li.addEventListener('click', (e) => clickListener(e));

    ul.appendChild(li);
  });

  return ul;
};

const View = {
  renderLeftbar({ defaultTabs, projectTabs, tabClickListener }) {
    const root = document.getElementById('root');

    const nav = document.createElement('nav');
    nav.classList.add('leftbar');
    root.appendChild(nav);

    const defaultTabsComponent = leftbarTablistComponent({
      projects: defaultTabs,
      clickListener: tabClickListener,
    });

    nav.appendChild(defaultTabsComponent);

    const lowerProjects = leftbarTablistComponent({
      projects: projectTabs,
      clickListener: tabClickListener,
    });

    nav.appendChild(lowerProjects);
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

    // title
    const tabTitle = document.createElement('div');
    tabTitle.classList.add('title');
    tabTitle.textContent = title;
    mainbar.appendChild(tabTitle);

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