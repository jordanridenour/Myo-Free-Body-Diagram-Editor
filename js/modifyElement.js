
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