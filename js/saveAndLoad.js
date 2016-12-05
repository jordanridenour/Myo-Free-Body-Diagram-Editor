function writeDiagramToJson(canvas) {
	const fs = require('fs');
	var json = JSON.stringify(canvas.toDatalessJSON());
	const fileWrite = './js/downloads/download.txt';
	fs.writeFileSync(fileWrite, json);
	var downloadButton = $("#link");
	downloadButton.click();
}

function JSONTextToCanvas(canvas) {
	var text = $("#loadInput").val();
	if (text == "") {
		alert("There is no data to load onto the canvas.");
		return;
	}
	if (text.substring(0, 12) != '{"objects":[') {
		alert("The data to load is not well formed. Please copy and paste from a saved .json diagram.");
		return;
	}

	var json = JSON.parse(text);
	// var json2 = JSON.parse(text);
	// var objects = json['objects'];
	// var objects2 = json2['objects'];
	// var lineIndexs = [];

	// for (var i = 0; i < objects.length - 2; ++i) {
	// 	if (objects[i]['type'] == 'line') {
	// 		if (objects[i + 1]['type'] == 'triangle') {
	// 			if (objects[i + 2]['type'] == 'circle') {
	// 				objects.splice(i, 3);
	// 				lineIndexs.push(i);
	// 				i--;
	// 			}
	// 		}
	// 	}
	// }
	canvas.loadFromDatalessJSON(json, canvas.renderAll.bind(canvas));
	// for (var i = 0; i < lineIndexs.length; i++) {
	// 	addArrowFromJSON(canvas, objects2[lineIndexs[i]]);
	// }
}

// This is an attempt to load json with prompt.
function loadFromJSONFile() {

	var remote = require('electron').remote;
	var dialog = remote.dialog;
	var fs = require('fs');

	dialog.showOpenDialog(function (fileNames) {
		// fileNames is an array that contains all the selected
		if(fileNames === undefined){

			console.log("No file selected");
		}
		else {

			try {

				var json = JSON.parse(fs.readFileSync(fileNames[0]));
				canvas.loadFromDatalessJSON(json, canvas.renderAll.bind(canvas));
			}
			catch(err) {

				alert("There was an error opening the selected file.\nIt may be invalid.");
			}
		}
	});
}

function addArrowFromJSON(canvas, inputLine) {
	//							x1, y1, x2, y2
  var line = new fabric.Line([inputLine['x1'], inputLine['y1'], inputLine['x2'], inputLine['y2']], {
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

function downloadCanvasAsPNG(link) {
   link.href = document.getElementById("fbdCanvas").toDataURL();
   link.download = "canvas_image";
}


function uploadImage() {
	var remote = require('electron').remote;
	var dialog = remote.dialog;
	var fs = require('fs');

	dialog.showOpenDialog(function (fileNames) {
        // fileNames is an array that contains all the selected
       if(fileNames === undefined){

						console.log("No file selected");
       }
			 else if (fileNames[0].substr(-4, 4).localeCompare(".png") != 0) {

				 alert("Invalid file format. Please load only .png images");
				 return;
			 }
			 else {

						readFile(fileNames[0]);
       }
	});

	function readFile(filepath){
	    fs.readFile(filepath, 'base64', function (err, data) {
	          if(err){
	              alert("An error ocurred reading the file :" + err.message);
	              return;
	          }
	          // Change how to handle the file content
	          // console.log("The file content is : " + data);
	          var num = Math.floor(Math.random()*100 + 1);
	          var name = "pic_" + num.toString() + ".png";
	          writeFile(name, data);
	    });
	}

	function writeFile(name, data) {
		var directory = './images/';
		fs.writeFile(directory+name, data, function(err) {});

		fs.writeFile(directory+name, data, 'base64', function(err){
				if (err) throw err;
		  console.log('File saved.');
		});
		loadImageFromDisk(name);
	}
}
