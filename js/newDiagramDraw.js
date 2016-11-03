var canvas = new fabric.Canvas("fbdCanvas");
var center = getCanvasCenter(canvas);

var selectShapeButton = $("#select_shape");
var addLineButton = $("#l_confirm");
var addRectButton = $("#r_confirm");
var deleteButton  = $("#deleteButton");

var lineDecreaseButton = $("#l_minus");
var lineIncreaseButton = $("#l_plus");

var lineLengthInput = $("#lineLengthInput");
var rectWidthInput  = $("#rectWidthInput");
var rectHeightInput = $("#rectHeightInput");

var imageInput = $(".def_img");

$(document).keyup(backspaceDelete);

selectShapeButton.click(showObjects);
addRectButton.click(addRect);
addLineButton.click(addLine);
deleteButton.click(deleteSelected);

// lineLengthInput.change(function() {
//     var selectedObj = canvas.getActiveObject();
//     if (selectedObj.customLine) {
//         var length  = parseInt(lineLengthInput.value);
//         selectedObj.setWidth(length);
//     }
// });

imageInput.dblclick(function(e) {
    e.preventDefault();
    addImage(this);
});

canvas.on('selection:cleared', function() {
    lineLengthInput.val(100);
});

canvas.on('object:added', function(e) {
    console.log(e);
});

function showObjects() {
    var objects = canvas.getObjects();
    console.log(objects);
}

function addRect() {
    var width  = parseInt(rectWidthInput.val());
    var height = parseInt(rectHeightInput.val());
    console.log(width);
    console.log(height);
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
    var line = new fabric.Rect({
        left: center.x,
        top: center.y,
        fill: 'black',
        lockScalingY: true,
        width: 100,
        height: 20,
        angle: 45
    });
    line.on('selected', function() {
        updateLineInputVal(line);
    });
    line.on('scaling', function() {
        updateLineInputVal(line);
    });
    line.on('modified', function() {
        line.setHeight(20);
    });
    line.customLine = true;
    canvas.add(line);
}

function updateLineInputVal(line) {
    var width = line.getWidth();
    lineLengthInput.val(width);
}

function addImage(img) {
    var imgInstance = new fabric.Image(img, {
        left: center.x,
        top: center.y
    });
    canvas.add(imgInstance);
}

function selectNext() {
    var objs = canvas.getObjects();
    var selectedObj = canvas.getActiveObject();
    var currentIndex = 0;
    if (objs.length < 1) return;
    if (selectedObj) currentIndex = objs.find(getSelectedIndex);
    canvas.setActiveObject(canvas.item(currentIndex));
}

function getSelectedIndex(element, index, array) {
    return index;
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
