var canvas = new fabric.Canvas("myCanvas");

var addButton = document.getElementById("addButton");
var deleteButton = document.getElementById("deleteButton");

addButton.addEventListener("click", addRect);
deleteButton.addEventListener("click", deleteSelected);

function addRect() {
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 80,
        height: 60
    });
   canvas.add(rect);
}

function deleteSelected() {
    var currentRect = canvas.getActiveObject();
    if (currentRect) {
        canvas.remove(currentRect);
    }
    else {
        alert("No rectangle selected!");
    }
}
