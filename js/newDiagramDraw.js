var canvas = new fabric.Canvas("fbdCanvas");
var center = getCanvasCenter(canvas);

var moveUpButton = $("#upArrow");
var moveDownButton = $("#downArrow");
var moveLeftButton = $("#leftArrow");
var moveRightButton = $("#rightArrow");

var decreaseWidthButton = $("#width_minus");
var increaseWidthButton = $("#width_plus");
var decreaseHeightButton = $("#height_minus");
var increaseHeightButton = $("#height_plus");

var selectShapeButton = $("#select_shape");
var rotateShapeClockwiseButton = $("#rotate_shape_clockwise");
var rotateShapeCounterclockwiseButton = $("#rotate_shape_counter_clockwise");

var addLabelButton = $("#labelButton");
var addArrowButton = $("#l_confirm");
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
var loadJSONButton = $("#submitLoad");


$(document).keyup(keyEvents);

loadJSONButton.click(function() {
    JSONTextToCanvas(canvas);
});

selectShapeButton.click(function() {
    selectNext(canvas);
});

decreaseWidthButton.click(function() {
    decreaseWidth(canvas);
});

increaseWidthButton.click(function() {
    increaseWidth(canvas);
});

decreaseHeightButton.click(function() {
    decreaseHeight(canvas);
});

increaseHeightButton.click(function() {
    increaseHeight(canvas);
});

moveUpButton.click(function() {
    moveUp(canvas);
});

moveDownButton.click(function() {
    moveDown(canvas);
});

moveLeftButton.click(function() {
    moveLeft(canvas);
});

moveRightButton.click(function() {
    moveRight(canvas);
});

rotateShapeClockwiseButton.click(function() {
    rotateClockwise(canvas);
});

rotateShapeCounterclockwiseButton.click(function() {
    rotateCounterClockwise(canvas);
});

saveButton.click(function() {
    writeDiagramToJson(canvas);
});

addRectButton.click(function() {
    addRect(canvas, rectWidthInput, rectHeightInput);
});

addArrowButton.click(function() {
    addArrow(canvas, center);
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

deleteButton.click(function() {
    deleteSelected(canvas);
});

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
    selectedObj.setAngle(curAngle+degree);
    canvas.renderAll();
}

function selectNext() {
    var objs = canvas.getObjects();
    var selectedObj = canvas.getActiveObject();
    var nextIndex;
    if (objs.length < 1) return;

    // Special Handling for arrows
    if (selectedObj && selectedObj['customType']
        && selectedObj['customType'].localeCompare("arrow") == 0) {
      console.log(selectedObj.get('type'));
      nextIndex = getSelectedIndex(objs, selectedObj) + 3;
      if (nextIndex === objs.length) nextIndex = 0;
    }
    else if (selectedObj) {
        nextIndex = getSelectedIndex(objs, selectedObj) + 1;
        if (nextIndex === objs.length) nextIndex = 0;
    }
    else {
      nextIndex = 0;
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
        switch (event.keyCode) {
            case 67: // maps to 'c'
                console.log("clearSelections()");
                clearSelections(canvas);
                break;
            case 78: // maps to 'n'
                console.log("selectNext()");
                selectNext(canvas);
        }
    }
}

function getCanvasCenter(canvas) {
    var x_mid = canvas.width  / 2;
    var y_mid = canvas.height / 2;
    console.log({ x: x_mid, y: y_mid });
    return { x: x_mid, y: y_mid };
}
