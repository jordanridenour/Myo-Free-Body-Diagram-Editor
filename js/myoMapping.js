/* This file provides library to map Myo gestures to UI controls.
Written by Jordan Ridenour */
var Myo = require('myo');

// Register Myo Events
Myo.onError = function () {
        alert("Couldn't connect to Myo Connect. Make sure you have connected with Myo Connect.");
}


// Actually open socket to communicate with Myo
Myo.connect();
