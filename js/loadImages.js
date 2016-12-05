// Front-end script for canvas controls

var imgList = [];
var imgIdx = 0;

$(document).ready(function () {

  var prevImgButton = $("#prevImg");
  var nextImgButton = $("#nextImg");
  loadImages();

  prevImgButton.click(function () {

    if (imgIdx == 0) {

      imgIdx = imgList.length - 1;
    }
    else {

      imgIdx--;
    }

    $("#outer-gallery img").attr('src', imgList[imgIdx]);
    $("#outer-gallery img").attr('id', "img_" + imgIdx);
  });

  nextImgButton.click(function () {

    if (imgIdx == (imgList.length - 1)) {

      imgIdx = 0;
    }
    else {

      imgIdx++;
    }

    $("#outer-gallery img").attr('src', imgList[imgIdx]);
    $("#outer-gallery img").attr('id', "img_" + imgIdx);
  });

});

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
            var photo = "../images/" + file;
            imgList.push(photo);
            count++;
          }
      });

      $("#outer-gallery img").attr('src', imgList[imgIdx]);
      $("#outer-gallery img").attr('id', "img_" + imgIdx);
    }
  });
}

function loadImageFromDisk(file) {
  const fs = require('fs');
  const testFolder = './images/';
  fs.readdir(testFolder, (err, files) => {
    if (err) {
      console.log('Error');
    } else {
      var count = files.length - 1;
      var photo = "../images/" + file;
      imgList.push(photo);
    }
  });
}
