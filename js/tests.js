// Label
function testLabel(canvas, center) {
	var label = $('#labelInput');
	label.set('value', 'test');
	addLabel(canvas, label, center);
	var json = canvas.toDatalessJSON();
	return (json.includes('text') && json.includes('test'));
}

// Arrow
function testArrow(canvas) {
	var arrowButton = $('#l_confirm');
	arrowButton.click();
	var json = canvas.toDatalessJSON();
	return (json.includes('triangle') && json.include('rect'));
}

// Rectangle
function testRectangle(canvas) {
	var rectangleButton = $('#r_confirm');
	rectangleButton.click();
	var json = canvas.toDatalessJSON();
	return (json.includes('rect'));
}

// Clear 
function testClear(canvas) {
	var arrowButton = $('#l_confirm');
	var rectangleButton = $('#r_confirm');
	var clearButton = $('#clearButton');
	rectangleButton.click();
	arrowButton.click();
	clearButton.click();
	var json = canvas.toDatalessJSON();
	return (json == '');

}