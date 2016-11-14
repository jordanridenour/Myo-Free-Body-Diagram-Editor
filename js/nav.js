// Front-end script for navigation controls
const {ipcRenderer} = require('electron');
var remote = require('electron').remote;

// Global variables
var tabIdx = 0;
var tabbedElts;
var onMenu = true;

// Establish Myo Connection
var myMyo;

$(document).ready(function () {

  var Myo = require('myo');

  // Connection error
  Myo.onError = function () {
    console.log("Couldn't connect to Myo.\nMake sure you have connected with Myo Connect.");
  }

  Myo.connect("com.MyoFBD.Editor");

  // Once connected, establish myMyo object and global settings
  Myo.on('connected', function () {

    Myo.setLockingPolicy("none");
    myMyo = Myo.create();
    myMyo.unlock(false);

    // Myo trigger events
    tabbedElts = $('.menutabbed').toArray();
    createTabbedMyoEvents();
    // Set first highlighted button
    makeButtonOnFocus();
  });

  // Standard trigger events
  createStandardEvents();
});

// Create tab navigation events
function createTabbedMyoEvents() {

  Myo.on('wave_out', function() {

    if (remote.getGlobal('gestureControlOn')) {
      moveFocus("forward");
    }
  });

  Myo.on('wave_in', function() {

    if(remote.getGlobal('gestureControlOn')) {
      moveFocus("backward");
    }
  });

  Myo.on('fist', function() {

    if(remote.getGlobal('gestureControlOn')) {
      console.log("Clicking " + tabbedElts[tabIdx].id + "!");
      $('#' + tabbedElts[tabIdx].id).trigger('click');
    }
  });

  Myo.on('double_tap', function() {

    if(remote.getGlobal('gestureControlOn')) {

      // Ensure this is a page with other buttons
      var page = String(location.href.split("/").slice(-1));
      var valid = page.localeCompare("settings.html") == 0
                  || page.localeCompare("newDiagram.html") == 0;

      if(valid) {
        $('#' + tabbedElts[tabIdx].id).css('border-style', 'none');

        if (!onMenu) {
          tabbedElts = $('.menutabbed').toArray();
          onMenu = true;
        }
        else {
          tabbedElts = $('.tabbed').toArray();
          onMenu = false;
        }

        tabIdx = 0;
        makeButtonOnFocus();
      }
    }
  });
}

function createStandardEvents() {

  // CLICK CONTROL
  $('#home').on('click', function () {
    changeWindow('index.html');
  });

  $('#about').on('click', function () {
    changeWindow('about.html');
  });

  $('#help').on('click', function () {
    changeWindow('help.html');
  });

  $('#settings').on('click', function() {
    changeWindow('settings.html');
  });

  $('#newDiagram').on('click', function () {
    changeWindow('newDiagram.html');
  });
}

function moveFocus(mode) {

  var replaceIdx, prevIdx, nextIdx;
  var validMode = false;

  if (mode.localeCompare("forward") == 0) {

    validMode = true;

    // Iteration handling
    if (tabIdx + 1 >= tabbedElts.length) {
      tabIdx = 0;
    }
    else {
      tabIdx++;
    }

    if (tabIdx == 0) {
      replaceIdx = tabbedElts.length - 1;
    }
    else {
      replaceIdx = tabIdx - 1;
    }
  }

  if (mode.localeCompare("backward") == 0) {

    validMode = true;

    // Iteration handling
    if (tabIdx == 0) {
      tabIdx = tabbedElts.length - 1;
    }
    else {
      tabIdx--;
    }

    if (tabIdx == tabbedElts.length - 1) {
      replaceIdx = 0;
    }
    else {
      replaceIdx = tabIdx + 1;
    }
  }

  $('#' + tabbedElts[replaceIdx].id).css('border-style', 'none');
  $('#' + tabbedElts[replaceIdx].id).tooltip('disable');
  console.log("Tabbing to " + tabbedElts[tabIdx].id + "!");

  // Take care of changing focus
  if (validMode) {

    // Calculate previous and next elements
    if (tabbedElts.length == 1) {
      prevIdx = 0;
      nextIdx = 0;
    }
    else if (tabIdx + 1 >= tabbedElts.length) {
      prevIdx = tabIdx - 1;
      nextIdx = 0;
    }
    else if (tabIdx == 0) {
      prevIdx = tabbedElts.length - 1;
      nextIdx = 1;
    }
    else {
      prevIdx = tabIdx - 1;
      nextIdx = tabIdx + 1;
    }

    makeButtonOnFocus(prevIdx, nextIdx);
  }
}

function makeButtonOnFocus(prevIdx, nextIdx) {

  $('#' + tabbedElts[tabIdx].id).css('border-style', 'solid');
  $('#' + tabbedElts[tabIdx].id).css('border-width', '4px');
  $('#' + tabbedElts[tabIdx].id).css('border-radius', '2px');
  $('#' + tabbedElts[tabIdx].id).css('border-color', 'pink');

  // Add gesture help Label
  if(remote.getGlobal('gestureLabelsOn')) {

    var currElt = tabbedElts[tabIdx].id;

    // Tooltips for custom gestures
    if(currElt.localeCompare("rotate_shape_clockwise") == 0) {
      $("#" + tabbedElts[tabIdx].id).tooltip(
        {title: "Rotate wrist CW", trigger: "focus"});
    }
    else if(currElt.localeCompare("rotate_shape_counter_clockwise")) {
      $("#" + tabbedElts[tabIdx].id).tooltip(
        {title: "Rotate wrist CCW", trigger: "focus"});
    }
    // Tooltips for regular gestures
    else {
      $("#" + tabbedElts[tabIdx].id).tooltip(
      {title: "Wave out: " + tabbedElts[tabIdx + 1].innerHTML, trigger: "focus"});
    }
  }
}

function changeWindow(page_url) {
  if(location.href.split("/").slice(-1) != page_url) {
    ipcRenderer.send('changeWindow', page_url);
  }
}
