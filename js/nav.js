// Front-end script for index page
const {ipcRenderer} = require('electron');

document.querySelector('#about').addEventListener('click', function () {
  ipcRenderer.send('changeWindow', 'about.html');
});

document.querySelector('#help').addEventListener('click', function () {
  ipcRenderer.send('changeWindow', 'help.html');
});

document.querySelector('#loadDiagram').addEventListener('click', function () {
  ipcRenderer.send('changeWindow', 'loadDiagram.html');
});

document.querySelector('#newDiagram').addEventListener('click', function () {
  ipcRenderer.send('changeWindow', 'newDiagram.html');
});
