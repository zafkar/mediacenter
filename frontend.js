var fs = require('fs');

var frontend = function(FIFO){
	
	var self = this;
	
	this.currentTrack = {};
	
	this.FIFOFile = FIFO;
	
	this.onFrontChanged = function(data){};
	
	this._readStream = fs.createReadStream(self.FIFOFile);
	
	this.getFront = function(){
		return JSON.stringify(self.currentTrack);
	}
	
	this.changeFront = function(){
		onFrontChanged(getFront());
	};
	
	this.onStreamData = function(data){
		//Modify here the inputed data
		console.log('Info - new data read : ' + data);
		var str = data.toString();
		
		if(str.match(/.*?Playing.*\./)){
			self.currentTrack = {filename: /.*?Playing (.*)\./.exec(str)[1]};
		}
		
		if(str.match(/title:/)){
			var arr = str.split(/\r\n|\r|\n/);
			
			for(l in arr){
				var attr = arr[l].split(':');
				self.currentTrack[attr[0]] = attr[1];
			}
		}
		
		if(str.match(/Starting playback\.\.\./)){
			changeFront();
		}
	};
	
	this._readStream.on('data',onStreamData);
	
	return this;
	
};

module.exports = frontend;