// Front-end script for canvas controls
const {ipcRenderer} = require('electron');

function addImage(x) {
  var canvas = $('#fbdCanvas')[0];
  context = canvas.getContext('2d');
  var img = new Image();
  img.src = x
  context.drawImage(img, canvas.width/2 - 75/2, canvas.height/2 - 75/2, 75, 75)
}
