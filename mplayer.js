var fs = require('fs');

var mplayer = function(FIFO){
	this.FIFOFile = FIFO;
	
	this._writeStream = fs.createWriteStream(this.FIFOFile);
	
	this.sendcommand = function(cmd){
		
		this._writeStream.write(this.FIFOFile, cmd + "\n")
	};
	
	return this;
	
};

module.exports = mplayer;