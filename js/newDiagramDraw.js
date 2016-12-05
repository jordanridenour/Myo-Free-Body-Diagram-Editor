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
var undoButton = $("#undo_action");
var rotateShapeClockwiseButton = $("#rotate_shape_clockwise");
var rotateShapeCounterclockwiseButton = $("#rotate_shape_counter_clockwise");

var addLabelButton = $("#labelButton");
var addArrowButton = $("#l_confirm");
var addRectButton = $("#r_confirm");
var addCircleButton = $("#c_confirm");
var addTriangleButton = $("#t_confirm");
var deleteButton  = $("#deleteButton");
var clearButton = $("#clearButton");

var labelTextInput = $("#labelInput");
var imageInput = $(".def_img");

var loadButton = $("#loadPic");
var saveButton = $("#saveBtn");
var savePNGLink = $("#savePNGLink");
var savePNGButton = $("#savePNGButton");
var loadJSONButton = $("#submitLoad");


$(document).keyup(keyEvents);

undoButton.click(function() {
  undo(canvas);
});

loadJSONButton.click(function() {
    //JSONTextToCanvas(canvas);
    loadFromJSONFile(canvas);
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

loadButton.click(function() {
    uploadImage();
});

savePNGLink.click(function() {
    canvas.deactivateAll().renderAll();
    downloadCanvasAsPNG(this);
});

saveButton.click(function() {
    writeDiagramToJson(canvas);
});

addRectButton.click(function() {
    addRect(canvas, 50, 50);
});

addArrowButton.click(function() {
    addArrow(canvas, center);
});

addLabelButton.click(function() {
    addLabel(canvas, labelTextInput, center);
});

addCircleButton.click(function() {
    addCircle(canvas, 50);
});

addTriangleButton.click(function() {
    addTriangle(canvas, 50, 50);
});

deleteButton.click(function() {
    deleteSelected(canvas);
});

clearButton.click(function() {
  canvas.clear();
});

imageInput.dblclick(function(e) {
    e.preventDefault();
    addImageToCanvas(this.src, center);
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
