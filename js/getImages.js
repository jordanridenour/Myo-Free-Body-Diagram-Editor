const fs = require('fs');
const testFolder = './images/';
fs.readdir(testFolder, (err, files) => {
	if (err) {
		console.log('Error');
	} else {
		var count = 0;
		files.forEach(file => {
    		if (file[0] != '.') {
    			var photo = '<img src="../images/' + file + '" class="def_img" id="img_' + count + '">';
    			var gallery = document.getElementById('inner-gallery');
    			gallery.innerHTML = gallery.innerHTML + photo;
    			count++;
    		}
    	})
	}
	
});