// Front-end script for navigation controls
const {ipcRenderer} = require('electron');

document.querySelector('#home').addEventListener('click', function () {
  if(location.href.split("/").slice(-1) != 'index.html') {
    ipcRenderer.send('changeWindow', 'index.html');
  }
});

document.querySelector('#about').addEventListener('click', function () {
  if(location.href.split("/").slice(-1) != 'about.html') {
    ipcRenderer.send('changeWindow', 'about.html');
  }
});

document.querySelector('#help').addEventListener('click', function () {
  if(location.href.split("/").slice(-1) != 'help.html') {
    ipcRenderer.send('changeWindow', 'help.html');
  }
});

document.querySelector('#loadDiagram').addEventListener('click', function () {
  if(location.href.split("/").slice(-1) != 'loadDiagram.html') {
    ipcRenderer.send('changeWindow', 'loadDiagram.html');
  }
});

document.querySelector('#newDiagram').addEventListener('click', function () {
  if(location.href.split("/").slice(-1) != 'newDiagram.html') {
    ipcRenderer.send('changeWindow', 'newDiagram.html');
  }
});
