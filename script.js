"use strict";

var key = "406fb5b1";
	
function movieLi(obj){
    return $('<li class="result" data-id="' + obj.imdbID +
  '"><strong>' + obj.Title + '</strong><em> (' + obj.Year + ')</em></li>');
  }
  
  function moviePoster(url){
      return $('<img src="' +url+ '" alt="Movie Poster" />');
  }
  
  function getMovieDetails(id){
      // alert(id);
      $.ajax({
              url: "http://www.omdbapi.com/",
              method: "get",
              data: {
                  "i": id, 
                  "callback": "movies", 
                  "apikey": `${key}`
                },
              dataType: "jsonp",
              jsonpCallback: "movies",
              success: function(data) {
                  console.log(data);
                  var posterUrl = data.Poster;
                  var moviePosterImg = moviePoster(posterUrl);
                  $('.movieDets').empty().append(moviePosterImg);
              }
          });
  }
  
  function getID(){
      var id = $(this).attr("data-id");
      getMovieDetails(id);
  }
  
  // jQuery Main Function
  $(function() {
      
      $(".results").on("click", "li", getID); 
  
      $("form").on("submit", function(e) {
          e.preventDefault();
          var searchTerm = $("input").val()
              , i = 0
              , movieTitle
          ;
          // console.log(searchTerm);
          $.ajax({
              url: "http://www.omdbapi.com/",
              method: "get",
              data: {
                  "s": searchTerm, 
                  "callback": "movies",
                  "apikey": `${key}`
                },
              dataType: "jsonp",
              jsonpCallback: "movies",
              success: function(data) {
                //   console.log(data);
                  var movies = data.Search;
                  $(".results").empty();
                  for (i = 0; i < movies.length; i++) {
                      movieTitle = movieLi(movies[i]);
                      $(".results").append(movieTitle);
                  }
              }
          });
      });
  });