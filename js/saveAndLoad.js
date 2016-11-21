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
	canvas.loadFromDatalessJSON(json, canvas.renderAll.bind(canvas), function(e) {
		if(e) {
			console.log("error exists");
		}
	});
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
       }else{
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
	 //   var base64Image = data.toString('base64');
	 //   var decodedImage = new Buffer(base64Image, 'base64');
	 //   fs.writeFile(directory+'_default'+name, decodedImage, function(err) {});
		fs.writeFile(directory+name, data, 'base64', function(err){
         if (err) throw err;
         console.log('File saved.');
      });
		addImage(name);
	}

	/*
	//	For multiple files use this function
	dialog.showOpenDialog({ 
		properties: [ 
			'openFile', 
			'multiSelections',
			function(fileNames) {
		  		console.log(fileNames);
		  	}
	  	]
	 });
	 */
}

