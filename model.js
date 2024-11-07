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
  },

  updateTask(id, taskData) {
    this.tasks.items[id] = { ...this.tasks.items[id], ...taskData, id };
    return this.tasks.items[id];
  },

  deleteTask(taskId) {
    this.tasks.ids = this.tasks.ids.filter((id) => id !== taskId);
    delete this.tasks.items[taskId];
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
  },

  updateProject(id, data) {
    this.projects.items[id] = { ...this.projects.items[id], ...data, id };
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
    console.log({ projects: this.projects, tasks: this.tasks });
  },
};
export default Model;
