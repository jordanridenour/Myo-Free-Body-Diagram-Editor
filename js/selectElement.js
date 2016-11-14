function selectNext(canvas) {
    var objs = canvas.getObjects();
    var selectedObj = canvas.getActiveObject();
    var nextIndex = 0;
    if (objs.length < 1) return;
    if (selectedObj) {
        nextIndex = getSelectedIndex(objs, selectedObj) + 1;
        if (nextIndex === objs.length) nextIndex = 0;
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
        canvas.remove(selectedObj);
    }
    else {
        alert("No object selected!");
    }
}