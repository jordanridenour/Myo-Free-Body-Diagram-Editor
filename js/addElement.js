function addRect(canvas, widthInput, heightInput) {
    var width  = parseInt(widthInput.val());
    var height = parseInt(heightInput.val());
    console.log(width);
    console.log(height);
    var rect = new fabric.Rect({
        left: center.x,
        top: center.y,
        fill: 'red',
        width: width,
        height: height
    });
   canvas.add(rect);
}

function addCircle(canvas, diameterInput) {
    var radius = parseInt(diameterInput.val())/2;
    var circle = new fabric.Circle({
        radius: radius, 
        fill: 'green', 
        left: center.x, 
        top: center.y
    });
    canvas.add(circle)
}

function addTriangle(canvas, widthInput, heightInput) {
    var triangle = new fabric.Triangle({
        width: parseInt(widthInput.val()),
        height: parseInt(heightInput.val()),
        fill: 'blue',
        left: center.x,
        top: center.y
    });
    canvas.add(triangle)
}

function addLine(canvas, center) {
    var line = new fabric.Rect({
        left: center.x,
        top: center.y,
        fill: 'black',
        lockScalingY: true,
        width: 100,
        height: 20,
        angle: 45
    });
    line.on('selected', function() {
        updateLineInputVal(line);
    });
    line.on('scaling', function() {
        updateLineInputVal(line);
    });
    line.on('modified', function() {
        line.setHeight(20);
    });
    line.customLine = true;
    canvas.add(line);
}

function addLabel(canvas, textInput, center) {
    var text = textInput.val();
    if (text == '') return;
    var label = new fabric.Text(text, {
        fontFamily: 'Helvetica',
        fontSize: 18,
        left: center.x,
        top: center.y
    });
   canvas.add(label);
}

function addImage(img, center) {
    var imgInstance = new fabric.Image(img, {
        left: center.x,
        top: center.y
    });
    canvas.add(imgInstance);
}
