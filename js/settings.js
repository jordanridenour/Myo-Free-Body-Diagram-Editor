var remote = require('electron').remote;
const {ipcRenderer} = require('electron');

// Button events
$(document).ready(function() {

  var gestureLabelsOn = remote.getGlobal("gestureLabelsOn");
  var gestureControlsOn = remote.getGlobal("gestureControlOn");

  // Set button current settings
  // Labels Button
  if (!gestureControlsOn) {
    $('#gestureLabel').toggleClass("disabled");
    $('#gestureLabel').css('background-color', '#d9534f');
    $('#gestureLabel').html('Off');
  }
  else if (gestureLabelsOn) {
    $('#gestureLabel').css('background-color', '#5cb85c');
    $('#gestureLabel').html('On');
  }
  else {
    $('#gestureLabel').css('background-color', '#d9534f');
    $('#gestureLabel').html('Off');
  }

  //Controls Button
  if (gestureControlsOn) {
    $('#gestureControl').css('background-color', '#5cb85c');
    $('#gestureControl').html('On');
  }
  else {
    $('#gestureControl').css('background-color', '#d9534f');
    $('#gestureControl').html('Off');
  }

  // Gesture Labels Setting
  $('#gestureLabel').on('click', function() {

    if (remote.getGlobal("gestureControlOn")) {
      changeButtonCSS("gestureLabel", remote.getGlobal("gestureLabelsOn"));
      ipcRenderer.send('changeGlobal', "gestureLabelsOn",
                        !remote.getGlobal("gestureLabelsOn"));
    }
  });

  // Gesture Control Activated
  $('#gestureControl').on('click', function() {
    changeButtonCSS("gestureControl", remote.getGlobal("gestureControlOn"));

    // Change labels to false if also turning of gesture control
    if (remote.getGlobal("gestureControlOn")
        && remote.getGlobal("gestureLabelsOn")) {
      ipcRenderer.send('changeGlobal', "gestureLabelsOn",
                        !remote.getGlobal("gestureLabelsOn"));
      $('#gestureLabel').tooltip('destroy');
    }

    ipcRenderer.send('changeGlobal', "gestureControlOn",
                      !remote.getGlobal("gestureControlOn"));
  });
});

function changeButtonCSS(id, currSet) {

  if (currSet) {

    $('#' + id).css('background-color', '#d9534f');
    $('#' + id).html('Off');

    // Disable Gesture labels if you're turning Gesture control off
    if (id.localeCompare("gestureControl") == 0) {
      $('#gestureLabel').toggleClass("disabled");
      $('#gestureLabel').css('background-color', '#d9534f');
      $('#gestureLabel').html('Off');
      $('#gestureLabel').tooltip('destroy');
      $('#gestureControl').tooltip('destroy');
    }
  }
  else {
    $('#' + id).css('background-color', '#5cb85c');
    $('#' + id).html('On');

    if(id.localeCompare("gestureControl") == 0) {
      $('#gestureLabel').toggleClass("disabled");
    }
  }
}
