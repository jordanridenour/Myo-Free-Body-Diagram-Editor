var canvas = new fabric.Canvas("fbdCanvas");
var center = getCanvasCenter(canvas);

var addRectButton = document.getElementById("r_confirm");
var addLineButton = document.getElementById("l_confirm");
var deleteButton  = document.getElementById("deleteButton");

var rectWidthInput  = document.getElementById("rectWidthInput");
var rectHeightInput = document.getElementById("rectHeightInput");

addRectButton.addEventListener("click", addRect);
addLineButton.addEventListener("click", addLine);
deleteButton.addEventListener("click", deleteSelected);

document.addEventListener("keyup", backspaceDelete);

$('.def_img').dblclick(function(e) {
    e.preventDefault();
    addImage(this);
});

function addRect() {
    var width  = parseInt(rectWidthInput.value);
    var height = parseInt(rectHeightInput.value);
    var rect = new fabric.Rect({
        left: center.x,
        top: center.y,
        fill: 'red',
        width: width,
        height: height
    });
   canvas.add(rect);
}

function addLine() {
    var line = new fabric.Line([0, 0, 150, 170], {
        left: center.x,
        top: center.y,
        stroke: 'black',
    });
    canvas.add(line);
}

function addImage(img) {
    var imgInstance = new fabric.Image(img, {
        left: center.x,
        top: center.y
    });
    canvas.add(imgInstance);
}

function backspaceDelete(event) {
    // keyCode 8 maps to backspace
    if (event.keyCode == 8) deleteSelected();
}

function deleteSelected() {
    var selectedObj = canvas.getActiveObject();
    if (selectedObj) {
        canvas.remove(selectedObj);
    }
    else {
        alert("No object selected!");
    }
}

function getCanvasCenter(canvas) {
    var x_mid = canvas.width  / 2;
    var y_mid = canvas.height / 2;

    return { x: x_mid, y: y_mid };
}
