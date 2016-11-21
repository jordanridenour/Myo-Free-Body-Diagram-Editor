// Front-end script for navigation controls
const {ipcRenderer} = require('electron');
var remote = require('electron').remote;

// Global variables
var tabIdx = 0;
var tabbedElts;
var onMenu = true;
var onLock = false;

// Global Position variables
var myoZ = null;
var myoY = null;
var deltaZ = null;
var deltaY = null;

// Sensitivity Threshold
var sensThresh = 0.01;

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
    AddCustomGestures();
    // Set first highlighted button
    makeButtonOnFocus(4,1);
  });

  // Standard trigger events
  createStandardEvents();
});

// Create tab navigation events
function createTabbedMyoEvents() {

  Myo.on('wave_out', function() {

    if (remote.getGlobal('gestureControlOn') && !onLock) {
      moveFocus("forward");
    }
  });

  Myo.on('wave_in', function() {

    if(remote.getGlobal('gestureControlOn') && !onLock) {
      moveFocus("backward");
    }
  });

  Myo.on('fist', function() {

    if(remote.getGlobal('gestureControlOn') && !onLock) {
      console.log("Clicking " + tabbedElts[tabIdx].id + "!");
      $('#' + tabbedElts[tabIdx].id).trigger('click');
    }
  });

  Myo.on('double_tap', function() {

    if(remote.getGlobal('gestureControlOn') && !onLock) {

      // Ensure this is a page with other buttons
      var page = String(location.href.split("/").slice(-1));
      var valid = page.localeCompare("settings.html") == 0
                  || page.localeCompare("newDiagram.html") == 0;

      // If this is a page with other menu zones
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

        // Refocus buttons
        tabIdx = 0;
        var nextIdx = tabbedElts.length == 1 ? 0 : 1;
        makeButtonOnFocus(tabbedElts.length - 1, nextIdx);
      }
    }
  });
}

//-----CUSTOM MYO GESTURES-----//
function AddCustomGestures() {

  /*Myo.on('fist', function() {

    if (remote.getGlobal('gestureControlOn')) {

      var rotateCW = $('#rotate_shape_clockwise');
      if (rotateCW && rotateCW.is(":focus")) {

        // Listen for change in rotation over a
        // period of ten seconds.
        //setTimeout( ,10000);
      }
    }
  })*/

  // This function registers double fist action
  // to set the custom gesture lock.
  Myo.on('fingers_spread', function() {

    if (tabbedElts[tabIdx].id.localeCompare("select_shape") == 0) {
      console.log("ready to lock");
      if (!onLock) {
        // Indicate lock on this button
        $('#select_shape').css('border-color', 'red');
        onLock = true;
      }
      else {
        $('#select_shape').css('border-color', 'pink');
        onLock = false;
      }
    }
  });

  // Fires literally whenever you move
  Myo.on('orientation', function(data) {

    // If gesture control is even active
    if (remote.getGlobal("gestureControlOn")
        && tabbedElts[tabIdx].id.localeCompare("select_shape") == 0
        && canvas.getActiveObject() && onLock) {

      moveObjWithMotionTrack(data);
    }
  });
}

function moveObjWithMotionTrack(data) {

  // Assign current positioning data
  if (myoZ == null || myoY == null) {
    myoZ = -1*data.z;
    myoY = -1*data.y;
    deltaZ = 0;
    deltaY = 0;
  }
  // If we have moved bigger than the minimum threshold
  else if (Math.abs(myoZ - data.z) > sensThresh ||
            Math.abs(myoY - data.y) > sensThresh) {

    var coordZ = (-1*data.z).toFixed(2);
    var coordY = (-1*data.y).toFixed(2);

    deltaZ = +(myoZ - coordZ);
    deltaY = +(myoY - coordY);
    myoZ = +coordZ
    myoY = +coordY

    selectedObj = canvas.getActiveObject();
    var currZ = selectedObj.getLeft();
    var currY = selectedObj.getTop();

    // Scale Myo movement to the dimensions of this canvas.
    selectedObj.setLeft(currZ + ((deltaZ/1.2)*740) % 740);
    selectedObj.setTop(currY + ((deltaY/1.2)*740) % 740);
    canvas.renderAll();
  }
}

function moveObjWithArrowKey(direction) {

  // Assign current positioning data
  if (myoZ == null || myoY == null) {
    myoZ = -1*data.z;
    myoY = -1*data.y;
    deltaZ = 0;
    deltaY = 0;
  }
  // If we have moved bigger than the minimum threshold
  else if (Math.abs(myoZ - data.z) > sensThresh ||
            Math.abs(myoY - data.y) > sensThresh) {

    var coordZ = (-1*data.z).toFixed(2);
    var coordY = (-1*data.y).toFixed(2);

    deltaZ = +(myoZ - coordZ);
    deltaY = +(myoY - coordY);
    myoZ = +coordZ
    myoY = +coordY

    selectedObj = canvas.getActiveObject();

    switch(direction) {
      case "Up":
      break;
      case "Down":
      break;
      case "Right":
      break;
      case "Left":
      break;
    }

    // Scale Myo movement to the dimensions of this canvas.
    selectedObj.setLeft(currZ + ((deltaZ/1.2)*740) % 740);
    selectedObj.setTop(currY + ((deltaY/1.2)*740) % 740);
    canvas.renderAll();
  }
}
//-----END CUSTOM Myo Gestures-----//

// Allows clickable navigation between pages
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

// Moves focus of Myo Control
// Moves tooltip controls
// Moves highlighted button along with current focus
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
  $('#' + tabbedElts[replaceIdx].id).tooltip('destroy');
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

// Changes CSS and Tooltip styling for in-focus button
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
        {title: "Rotate Wrist CW", trigger: "focus"});
    }
    else if(currElt.localeCompare("rotate_shape_counter_clockwise") == 0) {
      $("#" + tabbedElts[tabIdx].id).tooltip(
        {title: "Rotate Wrist CCW", trigger: "focus"});
    }
    // Tooltips for regular gestures
    else {
      $("#" + tabbedElts[tabIdx].id).tooltip(
        {title: "Wave In: " + $('#' + tabbedElts[prevIdx].id).attr('placeholder')
         + "\nWave Out: " + $('#' + tabbedElts[nextIdx].id).attr('placeholder'),  trigger: "focus"});
    }

    $("#" + tabbedElts[tabIdx].id).trigger('focus');
  }
}

// Calls main process to change window
function changeWindow(page_url) {
  if(location.href.split("/").slice(-1) != page_url) {
    ipcRenderer.send('changeWindow', page_url);
  }
}
