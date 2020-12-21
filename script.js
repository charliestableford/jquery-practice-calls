"use strict";

var key = "406fb5b1";
	
	$(".results").on("click"); 

	$("form").on("submit", function(e) {
		e.preventDefault();
        var searchInput = $("input").val()
        ,i = 0
        ,movieTitle;
        
		$.ajax({
			url: "http://www.omdbapi.com/",
			method: "get",
			data: {
                "s": searchInput, 
                "callback": "movies",
                "apikey": `${key}`
            },
			dataType: "jsonp",
			jsonpCallback: "movies",
			success: function(data) {
				console.log(data);
				var movies = data.Search;
				$(".results").empty();
				for (i = 0; i < movies.length; i++) {
					console.log(movies[i].Title);
					movieTitle = movieLi(movies[i]);
					$(".results").append(movieTitle);
				}
			}
		});
	});
