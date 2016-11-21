function selectNext(canvas) {

  var objs = canvas.getObjects();
  var selectedObj = canvas.getActiveObject();
  var nextIndex;
  if (objs.length < 1) return;

  // ARROW: Special Handling for arrows
  if (selectedObj && selectedObj['customType']
      && selectedObj['customType'].localeCompare("arrow") == 0) {

    var currIndex = getSelectedIndex(objs, selectedObj);
    nextIndex = currIndex + 3;

    if (nextIndex === objs.length) nextIndex = 0;

    // Unhighlight arrow
    selectedObj.stroke = '#000';
    objs[currIndex + 1].stroke = '#000';
    objs[currIndex + 2].stroke = '#000';
    objs[currIndex + 2].fill = '#000';
  }
  else if (selectedObj) {
      nextIndex = getSelectedIndex(objs, selectedObj) + 1;
      if (nextIndex === objs.length) nextIndex = 0;
  }
  else {
    nextIndex = 0;
  }

  // ARROW: Highlight if arrow
  var nowObj = canvas.item(nextIndex);
  if (nowObj && nowObj['customType']
      && nowObj['customType'].localeCompare("arrow") == 0) {

    nowObj.stroke = '#4372B6';
    objs[nextIndex + 1].stroke = '#4372B6';
    objs[nextIndex + 2].stroke = '#4372B6';
    objs[nextIndex + 2].fill = '#4372B6';
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

      // ARROW: Special handling for arrows
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
