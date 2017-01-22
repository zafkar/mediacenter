var fs = require('fs');

var mplayer = function(FIFO,FIFOin){
	
	var self = this;
	
	this.FIFOFile = FIFO;
	
	this.FIFOFileIn = FIFOin;
	
	this._writeStream = fs.createWriteStream(self.FIFOFile);
	
	this._readStream = fs.createReadStream(self.FIFOFileIn);
	
	this.currentStatus = {};
	
	this.updateCurrentStatus = function(){
		self.currentStatus = {};
		self.sendcommand('get_file_name');
		self.sendcommand('get_meta_album');
		self.sendcommand('get_meta_artist');
		self.sendcommand('get_meta_comment');
		self.sendcommand('get_meta_genre');
		self.sendcommand('get_meta_title');
		self.sendcommand('get_meta_track');
		self.sendcommand('get_meta_year');
		self.sendcommand('get_property volume');
		self.sendcommand('get_time_length');
		self.sendcommand('get_percent_pos');
	};
	
	this.sendcommand = function(cmd){
		
		self._writeStream.write(cmd + "\n",'utf-8');
	};
	
	this.onStreamData = function(data){
		//Modify here the inputed data
		console.log('Info - new data read : ' + data);
		var str = data.toString();
		
		if(str.match(/^ANS_.*/)){
			var answer = /^ÂNS_(.*?)=(.*)/.exec(str)
			self.currentStatus[answer[1]] = answer[2];
			self.onStatusChanged(self.currentStatus,answer[1]);
		}
		
		if(str.match(/Starting playback\.\.\./)){
			updateCurrentStatus();
		}
	};
	
	this._readStream.on('data',onStreamData);
	
	this.onStatusChanged = function(status,val) {};
	
	return this;
	
};

module.exports = mplayer;