(function($) {

	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}

	$(document).ready(function() {
		var firstName = $.urlParam("firstName");
		var lastName = $.urlParam("lastName");
		var gender = $.urlParam("gender");
		var fullName = firstName + " " + lastName;

		$("#identification-name").text(fullName);
		$("#identification-picture").attr("src", "../assets/" + gender + ".png");


		$("#no-id").on("click", function(e) {
			// TODO need to send a message to ROS to get a different person and link back
			// this is just a temporary solution
			tmp = window.location.href.replace("id.html", "checkin.html");
			tmp = tmp.substring(0, tmp.indexOf("?") + 1);
			console.log(tmp);
			window.location.href = tmp;
		});

		$("#yes-id").on("click", function(e) {
			window.location.href = window.location.href.replace("id.html", "result.html");
		});
	})
})(jQuery);