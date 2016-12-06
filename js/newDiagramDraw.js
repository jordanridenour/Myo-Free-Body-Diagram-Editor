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

var timeout = null;
$(document).mouseup(intervalClear);
$(document).mouseout(intervalClear);
$(document).keyup(keyEvents);

undoButton.mousedown(function() {
  undo(canvas);
});

loadJSONButton.mousedown(function() {
    //JSONTextToCanvas(canvas);
    loadFromJSONFile(canvas);
});

selectShapeButton.mousedown(function() {
    selectNext(canvas);
});

decreaseWidthButton.mousedown(function() {
    return interval(function() {
        decreaseWidth(canvas);
    });
});

increaseWidthButton.mousedown(function() {
    return interval(function() {
        increaseWidth(canvas);
    });
});

decreaseHeightButton.mousedown(function() {
    return interval(function() {
        decreaseHeight(canvas);
    });
});

increaseHeightButton.mousedown(function() {
    return interval(function() {
        increaseHeight(canvas);
    });
});

moveUpButton.mousedown(function() {
    return interval(function() {
        moveUp(canvas);
    });
});

moveDownButton.mousedown(function() {
    return interval(function() {
        moveDown(canvas);
    });
});

moveLeftButton.mousedown(function() {
    return interval(function() {
        moveLeft(canvas);
    });
});

moveRightButton.mousedown(function() {
    return interval(function() {
        moveRight(canvas);
    });
});

rotateShapeClockwiseButton.mousedown(function() {
    return interval(function() {
        rotateClockwise(canvas);
    });
});

rotateShapeCounterclockwiseButton.mousedown(function() {
    return interval(function() {
        rotateCounterClockwise(canvas);
    });
});

loadButton.mousedown(function() {
    uploadImage();
});

savePNGLink.mousedown(function() {
    canvas.deactivateAll().renderAll();
    downloadCanvasAsPNG(this);
});

saveButton.mousedown(function() {
    writeDiagramToJson(canvas);
});

addRectButton.mousedown(function() {
    addRect(canvas, 50, 50);
});

addArrowButton.mousedown(function() {
    addArrow(canvas, center);
    //addLine(canvas, center);
});

addLabelButton.mousedown(function() {
    addLabel(canvas, labelTextInput, center);
});

addCircleButton.mousedown(function() {
    addCircle(canvas, 50);
});

addTriangleButton.mousedown(function() {
    addTriangle(canvas, 50, 50);
});

deleteButton.mousedown(function() {
    deleteSelected(canvas);
});

clearButton.mousedown(function() {
  canvas.clear();
});

imageInput.dblmousedown(function(e) {
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
    timeout = setInterval(function(){
        action(); 
    }, 500);

    return false;
}

function intervalClear() {
    clearInterval(timeout);
    return false;
}
