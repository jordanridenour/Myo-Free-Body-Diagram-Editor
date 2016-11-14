
function decreaseWidth(canvas) {
   changeWidth(canvas, -5);
}

function increaseWidth(canvas) {
   changeWidth(canvas, 5);
}

function decreaseHeight(canvas) {
   changeHeight(canvas, -5);
}

function increaseHeight(canvas) {
   changeHeight(canvas, 5);
}

function changeWidth(canvas, val) {
   var selectedObj = canvas.getActiveObject();
   var curWidth = selectedObj.getWidth();
   selectedObj.setWidth(curWidth+val);
   canvas.renderAll();
}

function changeHeight(canvas, val) {
   var selectedObj = canvas.getActiveObject();
   var curHeight = selectedObj.getHeight();
   selectedObj.setHeight(curHeight+val);
   canvas.renderAll();
}

function rotateClockwise(canvas) {
   rotate(canvas, 5);
}

function rotateCounterClockwise(canvas) {
   rotate(canvas, -5);
}

function rotate(canvas, degree) {
   var selectedObj = canvas.getActiveObject();
   var curAngle = selectedObj.getAngle();
   selectedObj.setAngle(curAngle+degree);
   canvas.renderAll();
}

function moveLeft(canvas) {
   moveHorizontal(canvas, -5)
}

function moveRight(canvas) {
   moveHorizontal(canvas, 5)
}

function moveUp(canvas) {
   moveVertical(canvas, -5)
}

function moveDown(canvas) {
   moveVertical(canvas, 5)
}

function moveHorizontal(canvas, val) {
   var selectedObj = canvas.getActiveObject();
   var curLeft = selectedObj.getLeft();
   selectedObj.setLeft(curLeft+val);
   canvas.renderAll();
}

function moveVertical(canvas, val) {
   var selectedObj = canvas.getActiveObject();
   var curTop = selectedObj.getTop();
   selectedObj.setTop(curTop+val);
   canvas.renderAll();
}
