var canvas = new fabric.Canvas("fbdCanvas");
var center = getCanvasCenter(canvas);

var selectShapeButton = $("#select_shape");
var addLineButton = $("#l_confirm");
var addRectButton = $("#r_confirm");
var addCircleButton = $("#c_confirm");
var addTriangleButton = $("#t_confirm");
var deleteButton  = $("#deleteButton");

var lineDecreaseButton = $("#l_minus");
var lineIncreaseButton = $("#l_plus");
var circleDecreaseButton = $("#d_minus");
var circleIncreaseButton = $("#d_plus");

var lineLengthInput = $("#lineLengthInput");
var rectWidthInput  = $("#rectWidthInput");
var rectHeightInput = $("#rectHeightInput");
var triangleWidthInput = $("#triangleWidthInput");
var triangleHeightInput = $("#triangleHeightInput");
var circleDiameterInput = $("#circleDiameterInput");

var imageInput = $(".def_img");

$(document).keyup(backspaceDelete);

selectShapeButton.click(selectNext);
addRectButton.click(addRect);
addLineButton.click(addLine);
addCircleButton.click(addCircle);
addTriangleButton.click(addTriangle);
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

function addCircle() {
    var radius = parseInt(circleDiameterInput.val())/2;
    var circle = new fabric.Circle({
        radius: radius, 
        fill: 'green', 
        left: center.x, 
        top: center.y
    });
    canvas.add(circle)
}

function addTriangle() {
    var triangle = new fabric.Triangle({
        width: parseInt(triangleWidthInput.val()),
        height: parseInt(triangleHeightInput.val()),
        fill: 'blue',
        left: center.x,
        top: center.y
    });
    canvas.add(triangle)
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
    console.log(objs);
    var selectedObj = canvas.getActiveObject();
    var nextIndex = 0;
    if (objs.length < 1) return;
    if (selectedObj) {
        //nextIndex = objs.find(getSelectedIndex) + 1;
        nextIndex = getSelectedIndex(objs, selectedObj) + 1;
        if (nextIndex === objs.length) {
            canvas.deactivateAll().renderAll();
            return;
        }
    }
    console.log('Next Index: ' + nextIndex);
    console.log('Next Object: ' + canvas.item(nextIndex));
    canvas.setActiveObject(canvas.item(nextIndex));
}

function getSelectedIndex(objs, target) {
    var index = objs.map(function(x) { return x }).indexOf(target);
    console.log('Selected Index: ' + index);
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
