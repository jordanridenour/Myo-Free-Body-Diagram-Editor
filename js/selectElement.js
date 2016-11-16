function selectNext(canvas) {
  var objs = canvas.getObjects();
  var selectedObj = canvas.getActiveObject();
  var nextIndex;
  if (objs.length < 1) return;

  // Special Handling for arrows
  if (selectedObj && selectedObj['customType']
      && selectedObj['customType'].localeCompare("arrow") == 0) {
        
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

function clearSelections(canvas) {
    canvas.deactivateAll().renderAll();
}

function deleteSelected(canvas) {
    var selectedObj = canvas.getActiveObject();
    if (selectedObj) {

      // Special handling for arrows
      if (selectedObj.get('type').localeCompare("line") == 0) {

        // Move triangle and circle too.
        var arrowIdx = getSelectedIndex(canvas.getObjects(), selectedObj) + 1;
        var circleIdx = arrowIdx + 1;

        var arrowObj = canvas.item(arrowIdx);
        var circleObj = canvas.item(circleIdx);

        canvas.remove(arrowObj);
        canvas.remove(circleObj);
      }

      canvas.remove(selectedObj);
    }
    else {
        alert("No object selected!");
    }
}
