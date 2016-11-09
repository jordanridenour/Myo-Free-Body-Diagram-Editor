/* This file provides library to map Myo gestures to UI controls.
Written by Jordan Ridenour */
// Establish Myo Connection
var myMyo;
var Myo = require('myo');

// Connection error
Myo.onError = function () {
  alert("Couldn't connect to Myo.\nMake sure you have connected with Myo Connect.");
}

Myo.connect("com.MyoFBD.Editor");
