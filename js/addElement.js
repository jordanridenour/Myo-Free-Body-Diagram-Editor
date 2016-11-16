function addRect(canvas, widthInput, heightInput) {
    var width  = parseInt(widthInput.val());
    var height = parseInt(heightInput.val());
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

function addArrow(canvas, center) {

  var line = new fabric.Line([50, 50, 100, 100], {
              stroke: '#000',
              selectable: true,
              strokeWidth: '2',
              padding: 5,
              hasBorders: false,
              hasControls: false,
              originX: 'center',
              originY: 'center',
              lockScalingX: true,
              lockScalingY: true
            });

  var centerX = (line.x1 + line.x2)/2;
  var centerY = (line.y1 + line.y2)/2;
  var deltaX = line.left - centerX;
  var deltaY = line.top - centerY;

  var arrow = new fabric.Triangle({
                left: line.get('x1') + deltaX,
                top: line.get('y1') + deltaY,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                pointType: 'arrow_start',
                angle: -45,
                width: 20,
                height: 20,
                fill: '#000'
              });

  arrow.line = line;

  var circle = new fabric.Circle({
                left: line.get('x2') + deltaX,
                top: line.get('y2') + deltaY,
                radius: 3,
                stroke: '#000',
                strokeWidth: 3,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                pointType: 'arrow_end',
                fill: '#000'
              });

  circle.line = line;
  line.customType = arrow.customType = circle.customType = 'arrow';
  line.circle = arrow.circle = circle;
  line.arrow = circle.arrow = arrow;
  canvas.add(line, arrow, circle);

  function moveEnd(obj) {
    var p = obj, x1, y1, x2, y2;

    if (obj.pointType === 'arrow_end') {
      obj.line.set('x2', obj.get('left'));
      obj.line.set('y2', obj.get('top'));
    }
    else {
      obj.line.set('x1', obj.get('left'));
      obj.line.set('y1', obj.get('top'));
    }

    obj.line._setWidthHeight();

    x1 = obj.line.get('x1');
    y1 = obj.line.get('y1');
    x2 = obj.line.get('x2');
    y2 = obj.line.get('y2');

    angle = calcArrowAngle(x1, y1, x2, y2);

    if (obj.pointType === 'arrow_end') {
      obj.arrow.set('angle', angle - 90);
    }
    else {
      obj.set('angle', angle - 90);
    }

    obj.line.setCoords();
    canvas.renderAll();
  }

  function moveLine() {
    var oldCenterX = (line.x1 + line.x2)/2;
    var oldCenterY = (line.y1 + line.y2)/2;
    var deltaX = line.left - oldCenterX;
    var deltaY = line.top - oldCenterY;

    line.arrow.set({
      'left': line.x1 + deltaX,
      'top': line.y1 + deltaY
    }).setCoords();

    line.circle.set({
      'left': line.x2 + deltaX,
      'top': line.y2 + deltaY
    }).setCoords();

    line.set({
      'x1': line.x1 + deltaX,
      'y1': line.y1 + deltaY,
      'x2': line.x2 + deltaX,
      'y2': line.y2 + deltaY
    });

    line.set({
      'left': (line.x1 + line.x2) / 2,
      'top': (line.y1 + line.y2) / 2
    });
  }

  function deleteArrow() {
    canvas.remove(line);
    canvas.remove(arrow);
    canvas.remove(circle);
  }

  arrow.on('moving', function() {
    moveEnd(arrow);
    console.log("Arrow:");
    console.log("left:" + line.arrow.left);
    console.log("top:" + line.arrow.top);
    console.log("Line");
    console.log("left:" + line.left);
    console.log("top: " + line.top);
  });

  circle.on('moving', function() {
    moveEnd(circle);
  });

  line.on('moving', function() {
    moveLine();
  });
}

function calcArrowAngle(x1, y1, x2, y2) {

  var angle = 0;
  var x = (x2 - x1);
  var y = (y2 - y1);

  if (x === 0) {
    angle = (y === 0) ? 0 : (y > 0) ? Math.PI/2 : Math.PI*3/2;
  }
  else if (y === 0) {
    angle = (x > 0) ? 0 : Math.PI;
  }
  else {
    angle = (x < 0) ? Math.atan(y/x) + Math.PI : (y < 0) ? Math.atan(y/x) + (2*Math.PI) : Math.atan(y/x);
  }

  return (angle*180 / Math.PI);
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
