// Front-end script for navigation controls
const {ipcRenderer} = require('electron');
var remote = require('electron').remote;

// Global variables
var tabIdx = 0;
var tabbedElts;
var onMenu = true;
var onLock = false;
// 1 for load/save/create, 2 for modify
var currentMenu = 1;

// Global Position variables
var myoZ = null;
var myoW = null;
var myoY = null;
var myoX = null;
var myoRoll = null;
var deltaZ = null;
var deltaW = null;
var deltaY = null;
var deltaX = null;
var origAngle = null;

// Sensitivity Threshold
var sensThresh = remote.getGlobal('sensThresh');

// Establish Myo Connection
var Myo; // Global
var myMyo; // Singular Myo

$(document).ready(function () {

  Myo = require('myo');

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
      $('#' + tabbedElts[tabIdx].id).click();
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
        $('#' + tabbedElts[tabIdx].id).tooltip('destroy');

        if (!onMenu) {
          tabbedElts = $('.menutabbed').toArray();
          onMenu = true;
        }
        else {

            if (currentMenu == 1) {

              tabbedElts = $('.tabbed').toArray();
            }

            if (currentMenu == 2) {

              tabbedElts = $('.twoTabbed').toArray();
            }

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

  // This function registers double fist action
  // to set the custom gesture lock.
  Myo.on('fingers_spread', function() {

    // Make sure focus is on valid custom gesture key
    if (tabbedElts[tabIdx].id.localeCompare("select_shape") == 0
        || checkIsArrowKey(tabbedElts[tabIdx].id)
        || tabbedElts[tabIdx].id.localeCompare("rotate_shape_clockwise") == 0
        || tabbedElts[tabIdx].id.localeCompare("rotate_shape_counter_clockwise") == 0) {

      console.log("ready to lock");
      if (!onLock) {
        // Indicate lock on this button
        $('#' + tabbedElts[tabIdx].id).css('border-color', 'red');
        onLock = true;
      }
      else {
        $('#' + tabbedElts[tabIdx].id).css('border-color', '#e3730d');
        onLock = false;
      }
    }
  });

  // Fires literally whenever you move
  Myo.on('orientation', function(data) {

    // Motion track object
    if (remote.getGlobal("gestureControlOn")
        && tabbedElts[tabIdx].id.localeCompare("select_shape") == 0
        && canvas.getActiveObject() && onLock) {

      moveObjWithMotionTrack(data);
    }

    // Gesture with arrow keys
    if (remote.getGlobal("gestureControlOn")
        && checkIsArrowKey(tabbedElts[tabIdx].id)
        && canvas.getActiveObject() && onLock) {

      moveObjWithArrowKey(tabbedElts[tabIdx].id, data);
    }

    // Angle with rotational keys
    if (remote.getGlobal("gestureControlOn")
        && (tabbedElts[tabIdx].id.localeCompare("rotate_shape_clockwise") == 0
        || tabbedElts[tabIdx].id.localeCompare("rotate_shape_counter_clockwise") == 0)
        && canvas.getActiveObject() && onLock) {

      origAngle = canvas.getActiveObject().getAngle();
      moveObjWithRotation(data);
    }
  });
}

function moveObjWithMotionTrack(data) {

  // Assign current positioning data
  if (myoZ == null || myoY == null) {
    myoZ = data.z;
    myoY = data.y;
    deltaZ = 0;
    deltaY = 0;
  }

  // If we have moved bigger than the minimum threshold
  else if (Math.abs(myoZ - data.z) > sensThresh ||
            Math.abs(myoY - data.y) > sensThresh) {

    var coordZ = (data.z).toFixed(2);
    var coordY = (data.y).toFixed(2);

    deltaZ = +(myoZ - coordZ);
    deltaY = +(myoY - coordY);
    myoZ = +coordZ;
    myoY = +coordY;
    console.log(deltaZ);

    // Scale Myo movement to the dimensions of this canvas.
    // These functions are from modifyElement.js
    moveHorizontal(canvas, ((deltaZ/0.7) * canvas.width) % canvas.width);
    moveVertical(canvas, ((deltaY/0.7) * canvas.height) % canvas.height);
    canvas.renderAll();
  }
}

function moveObjWithArrowKey(direction, data) {

  // Assign current positioning data
  if (myoZ == null || myoY == null) {
    myoZ = data.z;
    myoY = data.y;
    deltaZ = 0;
    deltaY = 0;
  }
  // If we have moved bigger than the minimum threshold
  else if (Math.abs(myoZ - data.z) > sensThresh ||
            Math.abs(myoY - data.y) > sensThresh) {

    var coordZ = (data.z).toFixed(2);
    var coordY = (data.y).toFixed(2);

    deltaZ = +(myoZ - coordZ);
    deltaY = +(myoY - coordY);
    myoZ = +coordZ;
    myoY = +coordY;

    // UP & DOWN
    if (direction.localeCompare("upArrow") == 0
        || direction.localeCompare("downArrow") == 0) {
      // From modifyElement.js
      moveVertical(canvas, ((deltaY/0.7) * canvas.height) % canvas.height);
    }

    // RIGHT & LEFT
    if (direction.localeCompare("rightArrow") == 0
        || direction.localeCompare("leftArrow") == 0) {

      // From modifyElement.js
      moveHorizontal(canvas, ((deltaZ/0.7) * canvas.width) % canvas.width);
    }

    canvas.renderAll();
  }
}

// NOT WORKING WITH ARROWS
function moveObjWithRotation(data) {

  // Assign current positioning data
  if (myoZ == null || myoW == null || myoY == null || myoX == null) {
    myoZ = data.z;
    myoW = data.w;
    myoY = data.y;
    myoX = data.x;
    deltaZ = 0;
    deltaW = 0;
    deltaY = 0;
    deltaX = 0;
  }
  // If we have moved bigger than the minimum threshold
  else if (Math.abs(myoZ - data.z) > sensThresh
           || Math.abs(myoW - data.w) > sensThresh
           || Math.abs(myoY - data.y) > sensThresh
           || Math.abs(myoX - data.x) > sensThresh) {

    var coordZ = (data.z).toFixed(2);
    var coordW = (data.w).toFixed(2);
    var coordY = (data.y).toFixed(2);
    var coordX = (data.x).toFixed(2);

    deltaZ = +(myoZ - coordZ);
    deltaW = +(myoW - coordW);
    deltaY = +(myoY - coordY);
    deltaX = +(myoX - coordX);
    myoZ = +coordZ;
    myoW = +coordW;
    myoY = +coordY;
    myoX = +coordX;

    // Get roll
    var roll = Math.atan2(2.0 * (data.w * data.x + data.y * data.z),
                          1.0 - 2.0 * (data.x * data.x + data.y * data.y));

    roll = roll*(180/Math.PI);
    console.log(roll);
    rotateWithGesture(canvas, origAngle, roll);
  }
}

function checkIsArrowKey(id) {

  if (id.localeCompare("upArrow") == 0
      || id.localeCompare("downArrow") == 0
      || id.localeCompare("leftArrow") == 0
      || id.localeCompare("rightArrow") == 0) {

    return true;
  }
}
//-----END CUSTOM Myo Gestures-----//

// Allows clickable navigation between pages
function createStandardEvents() {

  if (location.href.split("/").slice(-1) == "newDiagram.html") {

    $("#switch_menu").click(function() {
      currentMenu = switchMenus();
    });
  }

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
  $('#' + tabbedElts[tabIdx].id).css('border-color', '#000000');

  // Add gesture help Label
  if(remote.getGlobal('gestureLabelsOn')) {

    var currElt = tabbedElts[tabIdx].id;

    // Tooltips for custom gestures
    if(currElt.localeCompare("rotate_shape_clockwise") == 0) {
      $("#" + tabbedElts[tabIdx].id).tooltip(
        {title: "Rotate Wrist CW", placement: "auto"}).tooltip("show");
    }
    else if(currElt.localeCompare("rotate_shape_counter_clockwise") == 0) {
      $("#" + tabbedElts[tabIdx].id).tooltip(
        {title: "Rotate Wrist CCW", placement: "auto"}).tooltip("show");
    }
    else {

      $("#" + tabbedElts[tabIdx].id).tooltip(
        {title: "Wave In: " + $('#' + tabbedElts[prevIdx].id).attr('placeholder')
         + "\nWave Out: " + $('#' + tabbedElts[nextIdx].id).attr('placeholder'),
         placement: "auto"}).tooltip("show");
    }
  }
}

function switchMenus() {

  if (currentMenu == 1) {
    $("#createSettings, #loadSaveGroup").hide();
    $("#modifyContent").show();
    tabbedElts = $('.twoTabbed').toArray();
    $("#switch_menu span").text("Create");
    return 2;
  }

  if (currentMenu == 2) {
    $("#modifyContent").hide();
    $("#createSettings, #loadSaveGroup").show();
    tabbedElts = $('.tabbed').toArray();
    $("#switch_menu span").text("Modify");
    return 1;
  }
}

// Calls main process to change window
function changeWindow(page_url) {

  var thisURL = location.href.split("/").slice(-1);

  if(thisURL != page_url) {

    if (thisURL == "newDiagram.html") {
      if(confirm("Do you really want to switch pages?")) {

        ipcRenderer.send('changeWindow', page_url);
      }
      else return;
    }
    else {

      ipcRenderer.send('changeWindow', page_url);
    }
  }
}
