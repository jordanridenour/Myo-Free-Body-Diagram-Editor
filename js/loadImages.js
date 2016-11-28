// Front-end script for canvas controls
const {ipcRenderer} = require('electron');

loadImages();

function loadImages() {
  const fs = require('fs');
  const testFolder = './images/';
  fs.readdir(testFolder, (err, files) => {
    if (err) {
      console.log('Error');
    } else {
      var count = 0;
      files.forEach(file => {
          if (file[0] != '.') {
            var photo = '<img src="../images/' + file + '" class="def_img tabbed twoTabbed" placeholder="Image" id="img_' + count + '">';
            var gallery = document.getElementById('wrapper');
            gallery.innerHTML = gallery.innerHTML + photo;
            count++;
          }
        })
    }
  });
}

function addImage(file) {
  const fs = require('fs');
  const testFolder = './images/';
  fs.readdir(testFolder, (err, files) => {
    if (err) {
      console.log('Error');
    } else {
      var count = files.length - 1;
      var photo = '<img src="../images/' + file + '" class="def_img tabbed" placeholder="Image" id="img_' + count + '">';
      var gallery = document.getElementById('wrapper');
      gallery.innerHTML = gallery.innerHTML + photo;
    }
  });
}
