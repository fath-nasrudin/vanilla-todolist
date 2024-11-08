const Model = {
  projects: {
    ids: [],
    items: {},
  },
  tasks: {
    ids: [],
    items: {},
  },
  defaultTabs: [],

  createDefaultData() {
    this.addProject({ title: 'Inbox', id: '1' });
    this.defaultTabs.push('1');

    this.addTask({
      id: '1',
      title: 'check for mark the task as done',
      projectId: '1',
    });
    this.addTask({
      id: '2',
      title: 'click edit on a task for edit the detail',
      projectId: '1',
    });
    this.addTask({
      id: '2',
      title: 'click edit on a task for edit the detail',
      projectId: '1',
    });
    this.addTask({
      id: '3',
      title: 'click delete for deleting the task',
      projectId: '1',
    });
    this.addTask({
      id: '4',
      title: 'Add more tasks with the add task button',
      projectId: '1',
    });

    this.addTask({
      id: '5',
      title: 'Add more projects with the add project on the sidebar',
      projectId: '1',
    });

    this.saveToLocalStorage();
  },

  loadFromLocalStorage() {
    const savedData = localStorage.getItem('todoModel');

    // create default tabs
    if (!savedData) {
      this.createDefaultData();
    }

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.projects = parsedData.projects || this.projects;
      this.tasks = parsedData.tasks || this.tasks;
      this.defaultTabs = parsedData.defaultTabs || this.defaultTabs;
    }
  },

  saveToLocalStorage() {
    const dataToSave = {
      projects: this.projects,
      tasks: this.tasks,
      defaultTabs: this.defaultTabs,
    };

    localStorage.setItem('todoModel', JSON.stringify(dataToSave));
  },

  // tasks
  addTask({ id = Date.now(), title, description, projectId, completed }) {
    const newTask = {
      id,
      title,
      description,
      projectId,
    };

    this.tasks.ids.push(newTask.id);
    this.tasks.items[newTask.id] = newTask;
    this.saveToLocalStorage();
  },

  updateTask(id, taskData) {
    this.tasks.items[id] = { ...this.tasks.items[id], ...taskData, id };
    this.saveToLocalStorage();
    return this.tasks.items[id];
  },

  deleteTask(taskId) {
    this.tasks.ids = this.tasks.ids.filter((id) => id !== taskId);
    delete this.tasks.items[taskId];
    this.saveToLocalStorage();
  },

  getTasks(options) {
    if (!options) {
      return this.tasks.ids.map((id) => this.tasks.items[id]);
    }

    const { projectId } = options;

    const tasks = this.tasks.ids.map((id) => this.tasks.items[id]);
    return tasks.filter((task) => task.projectId === projectId);
  },

  getTaskById(id) {
    return this.tasks.items[id];
  },

  addProject({ title, id = Date.now().toString() }) {
    const newProject = {
      id: id,
      title,
    };

    this.projects.ids.push(newProject.id);
    this.projects.items[newProject.id] = newProject;
    this.saveToLocalStorage();
  },

  updateProject(id, data) {
    this.projects.items[id] = { ...this.projects.items[id], ...data, id };
    this.saveToLocalStorage();
    return this.projects.items[id];
  },

  getProjects() {
    return this.projects.ids
      .filter((id) => !this.defaultTabs.includes(id))
      .map((id) => this.projects.items[id]);
  },

  getAllProjects() {
    return this.projects.ids.map((id) => this.projects.items[id]);
  },

  getDefaultTabs() {
    return this.defaultTabs.map((id) => this.projects.items[id]);
  },

  getProjectById(id) {
    return this.projects.items[id];
  },

  deleteProject(projectId) {
    // delete project
    this.projects.ids = this.projects.ids.filter((id) => id !== projectId);
    delete this.projects.items[projectId];

    // delete all tasks related to the project
    this.tasks.ids = this.tasks.ids.filter((taskId) => {
      const currentTaskProjectId = this.tasks.items[taskId].projectId;
      if (projectId === this.tasks.items[taskId].projectId) {
        delete this.tasks.items[taskId];
      }
      return currentTaskProjectId !== projectId;
    });

    this.saveToLocalStorage();
  },

  init() {
    this.loadFromLocalStorage();
  },
};
export default Model;
