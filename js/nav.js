// Front-end script for navigation controls
const {ipcRenderer} = require('electron');

// Establish Myo Connection
var Myo = require('myo');
Myo.connect("com.MyoFBD.Editor");
var myMyo;

// Once connected, establish myMyo object and global settings
Myo.on('connected', function () {

  Myo.setLockingPolicy("none");
  myMyo = Myo.create();
  myMyo.unlock(false);

  // Add events for control of UI
  createMyoEvents();
});


// Register Myo Events
Myo.onError = function () {
        alert("Couldn't connect to Myo.\n Make sure you have connected with Myo Connect.");
}

function createMyoEvents() {

  $(document).ready( function() {

    // MYO CONTROL
    Myo.on('fist', function() {
       $('#home').trigger('click');
       console.log('Fist!');

    });

    Myo.on('fingers_spread', function() {
      console.log('Fingers spread!');
      $('#about').trigger('click');
    });

    Myo.on('wave_out', function() {
      console.log('Wave out!');
      $('#help').trigger('click');
    });

    Myo.on('wave_in', function() {
      console.log('Wave in!');
      $('#newDiagram').trigger('click');
    });

    // CLICK CONTROL
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

  });
}
