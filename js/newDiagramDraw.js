var remote = require('electron').remote;

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

var selectShapeOneButton = $("#select_shape_one");
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
var savePNGLink = $("#savePNGAnchor");
var savePNGButton = $("#savePNGButton");
var loadJSONButton = $("#submitLoad");

const TIMEOUT_DURATION = 50;
var timeout = null;
$(document).mouseup(intervalClear);
$(document).mouseout(intervalClear);
$(document).keyup(keyEvents);

loadJSONButton.click(function() {
  loadFromJSONFile(canvas);
});

selectShapeOneButton.click(function() {
  selectNext(canvas);
});

selectShapeButton.click(function() {
  selectNext(canvas);
});

decreaseWidthButton.click(function() {
    decreaseWidth(canvas);
});

decreaseWidthButton.mousedown(function() {
    return interval(function() {
        decreaseWidth(canvas);
    });
});

increaseWidthButton.click(function() {
    increaseWidth(canvas);
});

increaseWidthButton.mousedown(function() {
    return interval(function() {
        increaseWidth(canvas);
    });
});

decreaseHeightButton.click(function() {
    decreaseHeight(canvas);
});

decreaseHeightButton.mousedown(function() {
    return interval(function() {
        decreaseHeight(canvas);
    });
});

increaseHeightButton.click(function() {
    increaseHeight(canvas);
});

increaseHeightButton.mousedown(function() {
    return interval(function() {
        increaseHeight(canvas);
    });
});

moveUpButton.click(function() {
    moveUp(canvas);
});

moveUpButton.mousedown(function() {
    return interval(function() {
        moveUp(canvas);
    });
});

moveDownButton.click(function() {
    moveDown(canvas);
});

moveDownButton.mousedown(function() {
    return interval(function() {
        moveDown(canvas);
    });
});

moveLeftButton.click(function() {
    moveLeft(canvas);
});

moveLeftButton.mousedown(function() {
    return interval(function() {
        moveLeft(canvas);
    });
});

moveRightButton.click(function() {
    moveRight(canvas);
});

moveRightButton.mousedown(function() {
    return interval(function() {
        moveRight(canvas);
    });
});

rotateShapeClockwiseButton.click(function() {
    rotateClockwise(canvas);
});

rotateShapeClockwiseButton.mousedown(function() {
    return interval(function() {
        rotateClockwise(canvas);
    });
});

rotateShapeCounterclockwiseButton.click(function() {
    rotateCounterClockwise(canvas);
});

rotateShapeCounterclockwiseButton.mousedown(function() {
    return interval(function() {
        rotateCounterClockwise(canvas);
    });
});

loadButton.click(function() {
    uploadImage();
});

savePNGButton.click(function() {
    canvas.deactivateAll().renderAll();
    downloadCanvasAsPNG(savePNGLink);
});

saveButton.click(function() {
    writeDiagramToJson(canvas);
});

addRectButton.click(function() {
    addRect(canvas, 50, 50);
});

addArrowButton.click(function() {
    //addArrow(canvas, center);
    addLine(canvas, center);
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
  if(confirm("Are you sure you want to delete the selected object?")) {
    deleteSelected(canvas);
  }
});

clearButton.click(function() {

  if(confirm("Are you sure you want to clear the whole canvas?")) {
    canvas.clear();
  }
});

imageInput.click(function(e) {
    e.preventDefault();
    addImageToCanvas(this.src, center);
});

canvas.on('object:added', function(e) {
    console.log(e);
});

$('#wrapper').on('mousedown', 'img', function(e) {
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

function interval(action) {
    action();
    timeout = setInterval(function(){
        action();
    }, TIMEOUT_DURATION);

    return false;
}

function intervalClear() {
    clearInterval(timeout);
    return false;
}
