function selectNext(canvas) {

  var objs = canvas.getObjects();
  var selectedObj = canvas.getActiveObject();
  var nextIndex;
  if (objs.length < 1) return;

  // ARROW: Special Handling for arrows
  if (selectedObj && selectedObj['customType']
      && selectedObj['customType'].localeCompare('arrow_line') == 0) {

    var currIndex = getSelectedIndex(objs, selectedObj);
    nextIndex = currIndex + 2;

    if (nextIndex === objs.length) nextIndex = 0;

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
      && nowObj['customType'].localeCompare("line_arrow") == 0) {

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
      if (selectedObj && selectedObj['customType']
          && selectedObj['customType'].localeCompare('arrow_line') == 0) {

        // Move triangle and circle too.
        var arrowIdx = getSelectedIndex(canvas.getObjects(), selectedObj) + 1;

        var arrowObj = canvas.item(arrowIdx);

        canvas.remove(arrowObj);
      }

      canvas.remove(selectedObj);
    }
    else {
        alert("No object selected!");
    }
}
