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
	})
})(jQuery);