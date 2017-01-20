var fs = require('fs');

var mplayer = function(FIFO){
	this.FIFOFile = FIFO;
	
	this.sendcommand = function(cmd){
		fs.appendFileSync(this.FIFOFile, cmd + "\n")
	};
	
	return this;
	
};

module.exports = mplayer;