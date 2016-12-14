// Global array of undo/redo states
canvasStates = [];
var modifyFactor = 5;

function decreaseWidth(canvas) {
   changeWidth(canvas, -modifyFactor);
}

function increaseWidth(canvas) {
   changeWidth(canvas, modifyFactor);
}

function decreaseHeight(canvas) {
   changeHeight(canvas, -modifyFactor);
}

function increaseHeight(canvas) {
   changeHeight(canvas, modifyFactor);
}

function changeWidth(canvas, val) {

   var selectedObj = canvas.getActiveObject();
   if (!selectedObj) {
     return;
   }
   var curWidth = selectedObj.getWidth();
   selectedObj.setWidth(curWidth + val);

   // Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {
     return;
   }

   fireEventAndRender(selectedObj, canvas);
}

function changeHeight(canvas, val) {

   var selectedObj = canvas.getActiveObject();
   if (!selectedObj) {
     return;
   }

   var curHeight = selectedObj.getHeight();
   selectedObj.setHeight(curHeight+val);

   // Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {
     return;
   }

   fireEventAndRender(selectedObj, canvas);
}

function rotateClockwise(canvas) {
   rotate(canvas, modifyFactor);
}

function rotateCounterClockwise(canvas) {
   rotate(canvas, -modifyFactor);
}

function rotate(canvas, degree) {

   var selectedObj = canvas.getActiveObject();
   if (!selectedObj) {
     return;
   }

   var selectedObj = canvas.getActiveObject();
   var curAngle = selectedObj.getAngle();

   // ARROW: Special handling for arrows
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

     var curAngle = selectedObj.getAngle();
     selectedObj.setAngle(curAngle + degree);
   }

   fireEventAndRender(selectedObj, canvas);
}

function rotateWithGesture(canvas, orig, degree) {

  var selectedObj = canvas.getActiveObject();
  if (!selectedObj) {
    return;
  }

  // ARROW: Special handling for arrows
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

    selectedObj.setAngle(orig + degree);
  }

  fireEventAndRender(selectedObj, canvas);

}

function moveLeft(canvas) {
   moveHorizontal(canvas, -modifyFactor)
}

function moveRight(canvas) {
   moveHorizontal(canvas, modifyFactor)
}

function moveUp(canvas) {
   moveVertical(canvas, -modifyFactor)
}

function moveDown(canvas) {
   moveVertical(canvas, modifyFactor)
}

function moveHorizontal(canvas, val) {

   var selectedObj = canvas.getActiveObject();
   if (!selectedObj) {
     return;
   }

   var curLeft = selectedObj.getLeft();

   // Check bounds
   if (!restrictBounds(canvas, selectedObj, val, 0)) {

     return;
   }
   console.log(curLeft + val);
   selectedObj.setLeft(curLeft + val);

   // ARROW: Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {

     // Move triangle and circle too.
     var arrowIdx = getSelectedIndex(canvas.getObjects(), selectedObj) + 1;
     var circleIdx = arrowIdx + 1;

     var arrowObj = canvas.item(arrowIdx);
     var circleObj = canvas.item(circleIdx);

     arrowObj.setLeft(arrowObj.getLeft() + val);
     circleObj.setLeft(circleObj.getLeft() + val);
   }
   fireEventAndRender(selectedObj, canvas);
}

function moveVertical(canvas, val) {

   var selectedObj = canvas.getActiveObject();
   if (!selectedObj) {
     return;
   }

   var curTop = selectedObj.getTop();

   // Check bounds
   if (!restrictBounds(canvas, selectedObj, 0, val)) {

     return;
   }
   console.log(curTop + val);
   selectedObj.setTop(curTop + val);

   // ARROW: Special handling for arrows
   if (selectedObj.get('type').localeCompare("line") == 0) {

     // Move triangle and circle too.
     var arrowIdx = getSelectedIndex(canvas.getObjects(), selectedObj) + 1;
     var circleIdx = arrowIdx + 1;

     var arrowObj = canvas.item(arrowIdx);
     var circleObj = canvas.item(circleIdx);

     arrowObj.setTop(arrowObj.getTop() + val);
     circleObj.setTop(circleObj.getTop() + val);
   }
   fireEventAndRender(selectedObj, canvas);
}

$(document).ready(function () {

  // Adds a copy of canvas on any click
  $('button').on('click', function(evt) {

    return; // Still buggy
    if (canvasStates.length < 5 &&
      evt.target.id.localeCompare("undo_action") != 0) {
      canvasStates.unshift(canvas.toJSON());
    }
  });
});

// Makes sure that things aren't moving out of bounds
function restrictBounds(canvas, obj, newX, newY) {

  var canvasH = 350;
  var canvasW = 760;
  var x = obj.getLeft();
  var y = obj.getTop();
  var width = obj.getWidth();
  var height = obj.getHeight();

  if ((x + newX + width) > canvas.getWidth()
      || (x + newX) < 0) {

    return false;
  }
  else if ((y + newY + height) > canvas.getHeight()
           || (y + newY) < 0) {

    return false;
  }

  return true;
}

function undo(canvas) {

  return; // Still buggy
  if (canvasStates.length > 0) {

    console.log(canvasStates);
    var json = canvasStates[0];
    canvas.loadFromJSON(json, fireEventAndRender(selectedObj, canvas));
    canvasStates.shift();
  }
};

function getSelectedIndex(objs, target) {
    var index = objs.map(function(x) { return x }).indexOf(target);
    return index;
}

function fireEventAndRender(obj, canvas) {
  if (obj.customType === 'arrow_line') {
    obj.trigger('modified');
  }
  canvas.renderAll();
}
