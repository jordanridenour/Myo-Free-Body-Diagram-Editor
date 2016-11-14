var canvas = new fabric.Canvas("fbdCanvas");
var center = getCanvasCenter(canvas);

var selectShapeButton = $("#select_shape");
var rotateShapeClockwiseButton = $("#rotate_shape_clockwise");
var rotateShapeCounterclockwiseButton = $("#rotate_shape_counter_clockwise");
var addLabelButton = $("#labelButton");
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
var labelTextInput = $("#labelInput");
var rectWidthInput  = $("#rectWidthInput");
var rectHeightInput = $("#rectHeightInput");
var triangleWidthInput = $("#triangleWidthInput");
var triangleHeightInput = $("#triangleHeightInput");
var circleDiameterInput = $("#circleDiameterInput");

var imageInput = $(".def_img");

var saveButton = $("#saveBtn");


$(document).keyup(keyEvents);

selectShapeButton.click(selectNext);

rotateShapeClockwiseButton.click(rotateClockwise);

rotateShapeCounterclockwiseButton.click(rotateCounterClockwise);

saveButton.click(function() {
    writeDiagramToJson(canvas);
});

addRectButton.click(function() {
    addRect(canvas, rectWidthInput, rectHeightInput);
});

addLineButton.click(function() {
    addLine(canvas, center);
});

addLabelButton.click(function() {
    addLabel(canvas, labelTextInput, center);
});

addCircleButton.click(function() {
    addCircle(canvas, circleDiameterInput);
});

addTriangleButton.click(function() {
    addTriangle(canvas, triangleWidthInput, triangleHeightInput);
});

deleteButton.click(deleteSelected);

imageInput.dblclick(function(e) {
    e.preventDefault();
    addImage(this, center);
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

$('#wrapper').on('click', 'img', function(e) {
  e.preventDefault();
  var src = $(this).attr('src');
  var imgElement = $(this).attr('id');
  var imgInstance = new fabric.Image(imgElement, {
    left: 100,
    top: 100
  });
  canvas.add(imgInstance);
});

function updateLineInputVal(line) {
    var width = line.getWidth();
    lineLengthInput.val(width);
}

function rotateClockwise() {
    rotate(5);
}

function rotateCounterClockwise() {
    rotate(-5);
}

function rotate(degree) {
    var selectedObj = canvas.getActiveObject();
    var curAngle = selectedObj.getAngle();
    console.log(curAngle);
    selectedObj.setAngle(curAngle+degree); 
    canvas.renderAll();
}

function selectNext() {
    var objs = canvas.getObjects();
    var selectedObj = canvas.getActiveObject();
    var nextIndex = 0;
    if (objs.length < 1) return;
    if (selectedObj) {
        nextIndex = getSelectedIndex(objs, selectedObj) + 1;
        if (nextIndex === objs.length) nextIndex = 0;
    }
    canvas.setActiveObject(canvas.item(nextIndex));
}

function getSelectedIndex(objs, target) {
    var index = objs.map(function(x) { return x }).indexOf(target);
    return index;
}

function clearSelections() {
    canvas.deactivateAll().renderAll();
}

function keyEvents(event) {
    if (!labelTextInput.is(':focus')) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 8:  // maps to backspace
                console.log("deleteSelected()");
                deleteSelected();
                break;
            case 67: // maps to 'c'
                console.log("clearSelections()");
                clearSelections();
                break;
            case 78: // maps to 'n'
                console.log("selectNext()");
                selectNext();
        }
    }
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
    console.log({ x: x_mid, y: y_mid });
    return { x: x_mid, y: y_mid };
}
