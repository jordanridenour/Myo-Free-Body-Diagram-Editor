// Front-end script for canvas controls
const {ipcRenderer} = require('electron');

function addImage(src) {
  var canvas = $('#fbdCanvas')[0];
  context = canvas.getContext('2d');
  var img = new Image();
  img.src = src
  context.drawImage(img, canvas.width/2 - 100/2, canvas.height/2 - 100/2, 100, 100)
}

function LineControlButtonClick(btn_id) {

  fieldName = $('#' + btn_id).attr('data-field')
  type = $('#' + btn_id).attr('data-type')
  var input = $("input[name='" + fieldName + "']")
  var currentVal = parseInt(input.val())

  if (!isNaN(currentVal)) {
    if(type == 'minus') {

      if(currentVal > input.attr('min')) {
        input.val(currentVal - 1).change();
      }
    }
    else if (type == 'plus') {

      if(currentVal < input.attr('max')) {
        input.val(currentVal + 1).change();
      }
    }
    else { input.val(0) }
  }
}

function focusInLineButton(btn_id) {
  $('#' + btn_id).data('oldValue', $('#' + btn_id).val())
}

function onConfirmClick() {

  // Width and Height are starting position of line
  var lineLength = $('#input-length').val()
  var pX = $('#input-width').val()
  var pY = $('#input-height').val()
  var angle = $('#input-angle').val()

  var canvas = $('#fbdCanvas')[0];
  context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(pX, pY);
  console.log(pX + lineLength*Math.cos(angle))
  context.lineTo(pX + lineLength*Math.cos(Math.PI*angle/180.0),
                pY + lineLength*Math.sin(Math.PI*angle/180.0));
  context.stroke();
}
