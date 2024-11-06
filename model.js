const Model = {
  projects: {
    ids: [],
    items: {},
  },
  tasks: {
    ids: [],
    items: {},
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
  },

  getTasks(options) {
    if (!options) {
      return this.tasks.ids.map((id) => this.tasks.items[id]);
    }

    const { projectId } = options;

    const tasks = this.tasks.ids.map((id) => this.tasks.items[id]);
    return tasks.filter((task) => task.projectId === projectId);
  },

  addProject({ title, id = Date.now() }) {
    // check that there are no same project title
    // if positif, add it to projects
    const newProject = {
      id: id,
      title,
    };

    this.projects.ids.push(newProject.id);
    this.projects.items[newProject.id] = newProject;
  },

  getProjects() {
    return this.projects.ids.map((id) => this.projects.items[id]);
  },

  getProjectById(id) {
    return this.projects.items[id];
  },
};
export default Model;
