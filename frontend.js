var fs = require('fs');

var frontend = function(FIFO){
	
	this.FIFOFile = FIFO;
	
	this.onFrontChanged = function(data){};
	
	this._readStream = fs.createReadStream(this.FIFOFile);
	
	this._readStream.on('data',function(data){
		//Modify here the inputed data
		console.log('Info - new data read : ' + data);
		onFrontChanged(data);
	});
	
	return this;
	
};

module.exports = frontend;