// Front-end script for canvas controls
const {ipcRenderer} = require('electron');

$('.def_img').dblclick(function(e) {
    e.preventDefault();
    var src = $(this).attr('src');
    addImage(src);
});

function addImage(src) {
    var canvas = $('#fbdCanvas')[0];
    context = canvas.getContext('2d');
    var img = new Image();
    img.src = src
    context.drawImage(img, canvas.width/2 - 100/2, canvas.height/2 - 100/2, 100, 100)
}
