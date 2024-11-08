import { addProject, updateProject } from '../controller.js';

export const modalComponent = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.append(modalContent);

  const modalCloseButton = document.createElement('span');
  modalCloseButton.classList.add('modal-close-button');
  modalCloseButton.textContent = 'x';
  modalCloseButton.addEventListener('click', () => {
    modal.remove();
  });
  modalContent.append(modalCloseButton);

  const projectForm = document.createElement('form');
  projectForm.classList.add('project-form');

  const formControlTitle = document.createElement('div');
  formControlTitle.classList.add('form-control');
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Name';
  titleLabel.htmlFor = 'title';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  formControlTitle.append(titleLabel, titleInput);

  // Save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    const projectData = {
      title: titleInput.value,
    };

    console.log({ projectData });
    addProject(projectData);
    modal.remove();
  });

  projectForm.append(formControlTitle, saveButton);

  modalContent.append(projectForm);

  return modal;
};

export const modalProjectComponent = (
  projectData = null,
  triggerSource = null
) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.append(modalContent);

  const modalCloseButton = document.createElement('span');
  modalCloseButton.classList.add('modal-close-button');
  modalCloseButton.textContent = 'x';
  modalCloseButton.addEventListener('click', () => {
    modal.remove();
  });
  modalContent.append(modalCloseButton);

  const projectForm = document.createElement('form');
  projectForm.classList.add('project-form');

  const formControlTitle = document.createElement('div');
  formControlTitle.classList.add('form-control');
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Name';
  titleLabel.htmlFor = 'title';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.value = projectData?.title || '';
  formControlTitle.append(titleLabel, titleInput);

  // Save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    const toUpdateProjectData = {
      title: titleInput.value,
    };

    updateProject(projectData.id, toUpdateProjectData, triggerSource);
    modal.remove();
  });

  projectForm.append(formControlTitle, saveButton);

  modalContent.append(projectForm);

  return modal;
};

export const renderModalComponent = () => {
  const root = document.getElementById('root');
  root.append(modalComponent());
};
