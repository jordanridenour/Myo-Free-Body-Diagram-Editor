// Front-end script for navigation controls
const {ipcRenderer} = require('electron');

createStandardEvents();

// Global variables
var tabIdx = -1;
var tabbedElts;

// Establish Myo Connection
var myMyo;
var Myo = require('myo');

// Connection error
Myo.onError = function () {
  alert("Couldn't connect to Myo.\nMake sure you have connected with Myo Connect.");
}

Myo.connect("com.MyoFBD.Editor");



// Once connected, establish myMyo object and global settings
Myo.on('connected', function () {

  Myo.setLockingPolicy("none");
  myMyo = Myo.create();
  myMyo.unlock(false);

  // Myo trigger events
  $(document).ready(function () {
    //createMyoEvents();
    createTabbedMyoEvents();
  });
});

// Standard trigger events
$(document).ready(function() {

  tabbedElts = [];
  tabbedElts = $('.tabbed').toArray();
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

// Create tab navigation events
function createTabbedMyoEvents() {

  Myo.on('wave_out', function() {

    // Iteration handling
    if (tabIdx + 1 >= tabbedElts.length) {
      tabIdx = 0;
    }
    else {
      tabIdx++;
    }

    replaceIdx = tabIdx == 0 ? tabbedElts.length - 1 : tabIdx - 1;

    $('#' + tabbedElts[replaceIdx].id).css('color', '#aaccff');
    console.log("Tabbing to " + tabbedElts[tabIdx].id + "!");
    $('#' + tabbedElts[tabIdx].id).css('color', 'yellow');
  });

  Myo.on('wave_in', function() {

    // Iteration handling
    if (!tabIdx) {
      tabIdx = tabbedElts.length - 1;
    }
    else {
      tabIdx--;
    }

    replaceIdx = tabIdx == tabbedElts.length - 1 ? 0 : tabIdx + 1;

    $('#' + tabbedElts[replaceIdx].id).css('color', '#aaccff');
    console.log("Tabbing to " + tabbedElts[tabIdx].id + "!");
    $('#' + tabbedElts[tabIdx].id).css('color', 'yellow');
  });

  Myo.on('fist', function() {
    console.log("Clicking " + tabbedElts[tabIdx].id + "!");
    $('#' + tabbedElts[tabIdx].id).trigger('click');
  });
}

function createStandardEvents() {

  // CLICK CONTROL
  $('#home').on('click', function () {
    changeWindow('index.html');
  });

  $('#about').on('click', function () {
    console.log("clicked about");
    changeWindow('about.html');
  });

  $('#help').on('click', function () {
    changeWindow('help.html');
  });

  $('#loadDiagram').on('click', function () {
    changeWindow('loadDiagram.html');
  });

  $('#newDiagram').on('click', function () {
    changeWindow('newDiagram.html');
  });
}

function changeWindow(page_url) {
  if(location.href.split("/").slice(-1) != page_url) {
    ipcRenderer.send('changeWindow', page_url);
  }
}
