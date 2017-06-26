var http = require('http');
var fs = require('fs');
var url = require('url');

var config = require('./config');
var mplayer = require('./mplayer')(config.FIFOToMplayer,config.FIFOFromMplayer);
var frontend = require('./frontend')();

var server = http.createServer(function(req,res){
	var page = '.' + url.parse(req.url).pathname;
	
	if(page == './'){
		page = './index.html';
	}
	
	if (fs.existsSync(page)){
		fs.readFile(page,'utf-8',function(err,data){
			res.writeHead(200);
			//{'Content-type':'text/html'}
			res.end(data);
		});
	}
	else{
		res.writeHead(404);
		res.end('Error 404 : The requested page doesn\'t exists');
	}
	
});

var io = require('socket.io').listen(server);

io.on('connection',function(socket){
	console.log('Info - new user connected : ' + socket.conn.id);
	socket.emit('message','You are currently connected.')
	
	frontend.sendCurrentFront();
	
	socket.on('mplayer',function(data){
		console.log('Info - new command : ' + data);
		mplayer.sendcommand(data);
	});
});

mplayer.onStatusChanged = frontend.updateStatus;

frontend.onFrontChanged = function(data){
	console.log('Info - new status : ' + data);
	io.emit('status',data);
};

server.listen(config.port);
