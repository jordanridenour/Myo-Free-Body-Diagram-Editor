var remote = require('electron').remote;
const {ipcRenderer} = require('electron');

// Button events
$(document).ready(function() {

  // Set button current settings
  changeButtonCSS("gestureLabel", !remote.getGlobal('gestureLabelsOn'));
  changeButtonCSS("gestureControl", !remote.getGlobal('gestureControlOn'));
  changeButtonCSS("mouseControl", !remote.getGlobal('mouseControlOn'));

  // Gesture Labels Setting
  $('#gestureLabel').on('click', function() {

    var currSet = remote.getGlobal('gestureLabelsOn');
    console.log(currSet);
    changeButtonCSS("gestureLabel", currSet);
    ipcRenderer.send('changeGlobal', "gestureLabelsOn", !currSet);
  });

  // Gesture Control Activated
  $('#gestureControl').on('click', function() {

    var currSet = remote.getGlobal('gestureControlOn');
    changeButtonCSS("gestureControl", currSet);
    ipcRenderer.send('changeGlobal', "gestureControlOn", !currSet);
  });

  $('#mouseControl').on('click', function() {

    var currSet = remote.getGlobal('mouseControlOn');
    changeButtonCSS("mouseControl", currSet);
    ipcRenderer.send('changeGlobal', "mouseControlOn", !currSet);
  })
});

function changeButtonCSS(id, currSet) {

  if (currSet) {
    $('#' + id).css('background-color', '#d9534f');
    $('#' + id).html('Off');
  }
  else {
    $('#' + id).css('background-color', '#5cb85c');
    $('#' + id).html('On');
  }
}
