const { JSDOM } = require('jsdom');

let app;

function setupDom() {
  const html = `
    <input id="taskInput" />
    <button id="addTask"></button>
    <ul id="taskList"></ul>
    <span id="taskCount"></span>
    <button id="clearCompleted"></button>
    <p id="noTasksMessage" class="hidden"></p>
    <button class="filter-btn" data-filter="all"></button>
    <button class="filter-btn" data-filter="active"></button>
    <button class="filter-btn" data-filter="completed"></button>
  `;

  const dom = new JSDOM(html, { url: 'http://localhost' });
  global.window = dom.window;
  global.document = dom.window.document;
  global.localStorage = dom.window.localStorage;
}

describe('Todo App', () => {
  beforeEach(() => {
    setupDom();
    jest.resetModules();
    app = require('../src/app.js');
    jest.useFakeTimers();
    process.env.NODE_ENV = 'test';
  });

  test('addTask adds a new task to the list', () => {
    document.getElementById('taskInput').value = 'Test Task';
    app.addTask();

    expect(app.tasks.length).toBe(1);
    expect(document.querySelectorAll('#taskList li').length).toBe(1);
    expect(document.querySelector('#taskList li .task-text').textContent).toBe('Test Task');
  });

  test('clearCompleted removes completed tasks', () => {
    document.getElementById('taskInput').value = 'Task 1';
    app.addTask();
    document.getElementById('taskInput').value = 'Task 2';
    app.addTask();

    app.tasks[0].completed = true;
    app.renderTasks();
    app.clearCompleted();
    jest.runAllTimers();

    expect(app.tasks.length).toBe(1);
    expect(app.tasks[0].text).toBe('Task 2');
  });
});
