(function($) {
	// Connecting to ROS
	// -----------------

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

	// Publishing a Topic
	// ------------------

	function PublishMessage(){

		var msg = new ROSLIB.Message({
			data: document.getElementById("inmessage").value
		});
		listener.publish(msg);
	}

	// Subscribing to a Topic
	// ----------------------

	var listener = new ROSLIB.Topic({
		ros : ros,
		name : '/listener',
		messageType : 'std_msgs/String'
	});

	listener.subscribe(function(message) {
		console.log('Received message on ' + listener.name + ': ' + message.data);
		document.getElementById("messages").textContent = message.data;
		//listener.unsubscribe(); <--- how to unsubscribe, if you wanted to
	});

	// Calling a service
	// -----------------

	// TODO edit everything below here once we figure out ROS services

	var addTwoIntsClient = new ROSLIB.Service({
		ros : ros,
		name : '/add_two_ints',
		serviceType : 'rospy_tutorials/AddTwoInts'
	});

	function AddRequest(){
		var localrequest = new ROSLIB.ServiceRequest({
			a : parseInt(document.getElementById("val1").value),
			b : parseInt(document.getElementById("val2").value)
		});

		if(typeof localrequest.a == 'number' && typeof localrequest.b == 'number'){
			console.log("Adding " + localrequest.a + " + " + localrequest.b + "...");

			addTwoIntsClient.callService(localrequest, function(result) {
				console.log('Result for service call on '
					+ addTwoIntsClient.name
					+ ': '
				 	result.sum);
				document.getElementById("output").textContent = result.sum;
			});

		}
		else{
			console.log('Invalid input!');
		}
	}
	
}) (jQuery);