// Connecting to ROS
var ros = new ROSLIB.Ros({
	url : 'ws://localhost:9090'
});

ros.on('connection', function() {
	console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
	console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
	console.log('Connection to websocket server closed.');
});

var listener = new ROSLIB.Topic({
	ros : ros,
	name : '/web',
	messageType : 'std_msgs/String'
});

var publisher = new ROSLIB.Topic({
	ros : ros,
	name : '/python_server',
	messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
	if(message.data == "server_ready") {
		HandshakeServer();
	}
});

// Let the server know you got its message, which means that both sides are ready
function HandshakeServer(){
	var msg = new ROSLIB.Message({
		data: 'client_handshake'
	});
	publisher.publish(msg);
	console.log("Server ready!")
	console.log("-----------------------")

	// Jake will hate this!
	document.getElementById("status").innerHTML = "Ready!"

	// Alternatively, load a different page?
	//window.location.href = "./index.html"
}

console.log("Front end ready!");