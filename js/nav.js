// Front-end script for navigation controls
const {ipcRenderer} = require('electron');

// Establish Myo Connection
var myMyo;
var Myo = require('myo');
Myo.connect("com.MyoFBD.Editor");

// Connection error
Myo.onError = function () {
        alert("Couldn't connect to Myo.\n Make sure you have connected with Myo Connect.");
}

// Once connected, establish myMyo object and global settings
Myo.on('connected', function () {

  Myo.setLockingPolicy("none");
  myMyo = Myo.create();
  myMyo.unlock(false);

  // Myo trigger events
  $(document).ready(function () {
    createMyoEvents();
  });
});

// Standard trigger events
$(document).ready(function() {
  createStandardEvents();
});

function createMyoEvents() {

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
}

function createStandardEvents() {

  // CLICK CONTROL
  $('#home').on('click', function () {
    if(location.href.split("/").slice(-1) != 'index.html') {
      ipcRenderer.send('changeWindow', 'index.html');
    }
  });

  $('#about').on('click', function () {
    console.log("clicked about");
    if(location.href.split("/").slice(-1) != 'about.html') {
      ipcRenderer.send('changeWindow', 'about.html');
    }
  });

  $('#help').on('click', function () {
    if(location.href.split("/").slice(-1) != 'help.html') {
      ipcRenderer.send('changeWindow', 'help.html');
    }
  });

  $('#loadDiagram').on('click', function () {
    if(location.href.split("/").slice(-1) != 'loadDiagram.html') {
      ipcRenderer.send('changeWindow', 'loadDiagram.html');
    }
  });

  $('#newDiagram').on('click', function () {
    if(location.href.split("/").slice(-1) != 'newDiagram.html') {
      ipcRenderer.send('changeWindow', 'newDiagram.html');
    }
  });
}
