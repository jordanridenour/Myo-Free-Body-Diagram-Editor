
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

   if (!canvas.getActiveObject()) {
     return;
   }
   var selectedObj = canvas.getActiveObject();
   var curWidth = selectedObj.getWidth();
   selectedObj.setWidth(curWidth+val);

   // Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {
     return;
   }

   canvas.renderAll();
}

function changeHeight(canvas, val) {

   if (!canvas.getActiveObject()) {
     return;
   }

   var selectedObj = canvas.getActiveObject();
   var curHeight = selectedObj.getHeight();
   selectedObj.setHeight(curHeight+val);

   // Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {
     return;
   }

   canvas.renderAll();
}

function rotateClockwise(canvas) {
   rotate(canvas, 5);
}

function rotateCounterClockwise(canvas) {
   rotate(canvas, -5);
}

function rotate(canvas, degree) {

   if (!canvas.getActiveObject()) {
     return;
   }

   var selectedObj = canvas.getActiveObject();
   var curAngle = selectedObj.getAngle();

   // Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {

     // Move triangle and circle too.
     var arrowIdx = getSelectedIndex(canvas.getObjects(), selectedObj) + 1;
     var circleIdx = arrowIdx + 1;

     var arrowObj = canvas.item(arrowIdx);
     var circleObj = canvas.item(circleIdx);

     var newArrowX = arrowObj.getLeft()*Math.cos(degree) + arrowObj.getTop()*Math.sin(degree);
     var newArrowY = -1*arrowObj.getLeft()*Math.sin(degree) + arrowObj.getTop()*Math.cos(degree);
     console.log(newArrowX);
     arrowObj.setLeft(newArrowX);
     arrowObj.setTop(newArrowY);
   }
   else {
     selectedObj.setAngle(curAngle + degree);
   }

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

   if (!canvas.getActiveObject()) {
     return;
   }

   var selectedObj = canvas.getActiveObject();
   var curLeft = selectedObj.getLeft();
   selectedObj.setLeft(curLeft+val);

   // Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {

     // Move triangle and circle too.
     var arrowIdx = getSelectedIndex(canvas.getObjects(), selectedObj) + 1;
     var circleIdx = arrowIdx + 1;

     var arrowObj = canvas.item(arrowIdx);
     var circleObj = canvas.item(circleIdx);

     arrowObj.setLeft(arrowObj.getLeft() + val);
     circleObj.setLeft(circleObj.getLeft() + val);
   }
   canvas.renderAll();
}

function moveVertical(canvas, val) {

   if (!canvas.getActiveObject()) {
     return;
   }

   var selectedObj = canvas.getActiveObject();
   var curTop = selectedObj.getTop();
   selectedObj.setTop(curTop + val);

   // Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {

     // Move triangle and circle too.
     var arrowIdx = getSelectedIndex(canvas.getObjects(), selectedObj) + 1;
     var circleIdx = arrowIdx + 1;

     var arrowObj = canvas.item(arrowIdx);
     var circleObj = canvas.item(circleIdx);

     arrowObj.setTop(arrowObj.getTop() + val);
     circleObj.setTop(circleObj.getTop() + val);
   }
   canvas.renderAll();
}

function getSelectedIndex(objs, target) {
    var index = objs.map(function(x) { return x }).indexOf(target);
    return index;
}
