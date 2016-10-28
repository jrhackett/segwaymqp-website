(function($) {
	$(document).ready(function() {

		$("#input-name").focus();

		$('#input-submit').on("click", function() {
			var lastName = $("#input-name")[0].value;
			console.log(lastName);
			console.log("trying to get json");

			$.getJSON("assets/patients.json", function(data) {
				$.each(data["patients"], function(key, val) {
					if(val["lastName"].toLowerCase() == lastName.toLowerCase())  {
						console.log(val["firstName"] + " " + val["gender"]);
						window.location.href = window.location.href.replace("checkin.html", "id.html") + "?firstName=" + escape(val["firstName"]) + "&lastName=" + escape(val["lastName"]) + "&gender=" + escape(val["gender"]);
					}
				});
			});
		});
	});
})(jQuery);