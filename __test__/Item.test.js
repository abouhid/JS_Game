import {
  addEditTaskForm,
  addEditTaskBtn,
  addDeleteTaskBtn,
  addCheckbox,
  addDeleteListBtn,
  saveLocalStorage,
  projectsList,
} from '../src/modules/events';


const obj = {
  list: [{
    desc: 'Book 1', dueDate: '2022-12-11', priority: 'H', status: false, title: 'The Winds of Winter',
  }],
};

describe('saveLocalStorage function', () => {
  test('should save list of projects in localStorage', () => {
    saveLocalStorage();
    expect(localStorage.getItem('projectsList')).not.toBe(null);
  });
});

describe('addEditTaskForm function', () => {
  test('should return form', () => {
    const temp = addEditTaskForm(obj, 0, jest.fn, jest.fn);
    expect(temp.innerHTML).toMatch(/<div class="extra-inputs"/);
  });
});

describe('addEditTaskBtn function', () => {
  test('should return edit button', () => {
    expect(addEditTaskBtn(obj, 0, jest.fn).innerHTML).toEqual('<i class="fas fa-edit"></i>');
  });
});

describe('addDeleteTaskBtn function', () => {
  test('should return delete button', () => {
    expect(addDeleteTaskBtn(obj, 0, jest.fn).innerHTML).toEqual('<i class="fas fa-trash-alt"></i>');
  });
});

describe('addCheckbox function', () => {
  test('should return checkbox element', () => {
    expect(addCheckbox(obj, 0, jest.fn).outerHTML).toEqual('<input class="check-task" type="checkbox">');
  });
});

describe('addDeleteListBtn function', () => {
  test('should return delete btn', () => {
    expect(addDeleteListBtn(projectsList, 0, jest.fn, jest.fn).innerHTML).toEqual('<i class="fas fa-trash-alt"></i>');
  });
});