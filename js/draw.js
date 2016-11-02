var canvas = new fabric.Canvas("myCanvas");

var addRectButton = document.getElementById("addRectangleButton");
var addLineButton = document.getElementById("addLineButton");
var addCircleButton = document.getElementById("addCircleButton");
var addTriangleButton = document.getElementById("addTriangleButton");
var deleteButton = document.getElementById("deleteButton");

addRectButton.addEventListener("click", addRect);
addLineButton.addEventListener("click", addLine);
addCircleButton.addEventListener("click", addCircle);
addTriangleButton.addEventListener("click", addTriangle);
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

function addLine() {
    var line = new fabric.Line([50, 100, 200, 200], {
        left: 170,
        top: 150,
        stroke: 'black'
    });
    canvas.add(line);
}

function addCircle() {
    var circle = new fabric.Circle({
        radius: 20, 
        fill: 'green', 
        left: 100, 
        top: 100
    });
    canvas.add(circle)
}

function addTriangle() {
    var triangle = new fabric.Triangle({
        width: 20,
        height: 30,
        fill: 'blue',
        left: 100,
        top: 100
    });
    canvas.add(triangle)
}

function deleteSelected() {
    var selectedObj = canvas.getActiveObject();
    if (selectedObj) {
        canvas.remove(selectedObj);
    }
    else {
        alert("No object selected!");
    }
}
