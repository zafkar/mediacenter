var fs = require('fs');

var frontend = function(){
	
	var self = this;
	
	this.status = {};
	
	this.onFrontChanged = function(data){};
	
	this.getFrontFromStatus = function(){
		var result = '';
		for(k in self.status){
			result += k[0].toUpperCase() + k.substring(1) + ' : ' + self.status[k] + '<br/>';
		}
		return result;
	}
	
	this.updateStatus = function(data,key){
		self.status = data;
		self.onFrontChanged(self.getFrontFromStatus());
	};
	
	return this;
	
};

module.exports = frontend;