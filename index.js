var express = require("express");
var app = express();
var port = 3700; // any port
 
//Registered a route, which, in this case, is a simple GET request without any parameters.
/*app.get("/", function(req, res){
    res.send("It works!");
});*/
 
//setting up jade template engine and rendering the page.jade file in response 
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");  // rendering the page.jade file
});

// external JavaScript file that will hold the front-end logic and other static contents reside in public folder
// making the system know this
app.use(express.static(__dirname + '/public'));

//app.listen(port);  // replacing this line, to add Socket.io integration
var io = require('socket.io').listen(app.listen(port));

//pon a successful connection, we send a welcome type of message, and, of course, bind another handler that will be used as a receiver.
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);