var canvas = new fabric.Canvas("fbdCanvas");
var center = getCanvasCenter(canvas);

var moveUpButton = $("#upArrow");
var moveDownButton = $("#downArrow");
var moveLeftButton = $("#leftArrow");
var moveRightButton = $("#rightArrow");

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

$(document).keyup(keyEvents);

selectShapeButton.click(function() {
    selectNext(canvas);
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
  //console.log(src);
  console.log(imgElement);
  console.log(imgInstance);
  canvas.add(imgInstance);
});

function updateLineInputVal(line) {
    var width = line.getWidth();
    lineLengthInput.val(width);
}

function keyEvents(event) {
    if (!labelTextInput.is(':focus')) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 8:  // maps to backspace
                console.log("deleteSelected()");
                deleteSelected(canvas);
                break;
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
