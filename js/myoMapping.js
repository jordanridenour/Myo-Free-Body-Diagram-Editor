/* This file provides library to map Myo gestures to UI controls.
Written by Jordan Ridenour */
var Myo = require('myo');

// Register Myo Events
Myo.onError = function () {
        alert("Couldn't connect to Myo Connect. Make sure you have connected with Myo Connect.");
}

/* Assigns Myo gestures to the correct controls
based on the current page that the app is on. This will
be where most of the logic between the app and the Myo exist */
function toggleControls(pageCode) {

  switch(pageCode) {
    case "home":
      break;
    case "about":
      break;
    case "help":
      break;
    case "draw":
      break;
    case "load":
      break;
  }
}

// Actually open socket to communicate with Myo
Myo.connect();
