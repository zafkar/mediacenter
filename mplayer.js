var fs = require('fs');

var mplayer = function(FIFO){
	this.FIFOFile = FIFO;
	
	this._writeStream = fs.createWriteStream(this.FIFOFile);
	
	this.sendcommand = function(cmd){
		
		this._writeStream.write(cmd + "\n",'utf-8');
	};
	
	return this;
	
};

module.exports = mplayer;