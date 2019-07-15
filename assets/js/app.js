var loggedInUser = null;
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

			loggedInUser = user;

			var userPosts = fetch('https://jsonplaceholder.typicode.com/posts?userId=' + user.id);
			var userAlbums = fetch('https://jsonplaceholder.typicode.com/albums?userId=' + user.id);

			return Promise.all([userPosts, userAlbums]);
		})
		.then(function(results){
			var posts;
			var albums;


			results[0].json().then(function(res){
				posts = res.json();
			});

			results[1].json().then(function(res){
				albums = res.json();
			})


			posts.forEach(function(post){
				var li = $('<li></li>');
				li.text(post.title);
				$("#posts").append(li);
			});

			albums.forEach(function(album){
				var li = $('<li></li>');
				li.text(album.title);
				$('#albums').append(li);
			})
		})
		.catch(function(error){
			alert(error);
		})
})