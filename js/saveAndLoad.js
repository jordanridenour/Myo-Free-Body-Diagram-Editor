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

function downloadCanvas(canvas) {
   
}