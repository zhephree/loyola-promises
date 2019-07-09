$("#login").click(function(){
	fetch('https://jsonplaceholder.typicode.com/users?username=' + $('#username').val())
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			var user = json[0];

			$("#login-form").hide();
			$("#homepage").show();

			$("#name").html(user.name);
		})
		.catch(function(error){
			alert(error);
		})
})