$(document).ready(function(){

    //Array of TV SHOWS
    var movies = ["Are You Afraid of The Dark", "Boy Meets World", "Hey Arnold", "All That", "Kenan and Kel", "Ren and Stimpy"]
    GIFArea = " "
    
    // Render Button
    
    //function for displaying tv show data
    function renderButtons() {
    
    //deleting tv buttons
    $("#movies-view").empty();
    
    //looping through the array of movies
    for (var i=0; i < movies.length; i++) {
    
    //generates buttons for each tv show in the array above
    var a = $('<button>');
    //Adding a class
    a.addClass('movie');
    
    //adding a data-attribute 
    a.attr('data-name', movies[i]);
    //providing the button's text with a value 
    a.text(movies[i]);
    //adding the button tto the html
    $("#movies-view").append(a);
    }
    s=
    $("#movie-input").focus();
    
    }
    
    renderButtons();
    
    //click buttons
    //funtion for when each individual button is clicked
    $("#add-movie").on('click', function() {
    
    //used a form so the user doesnt have to click the submit button, and can instead click enter to submit
    event.preventDefault();
    
    //Grabs the text that was typed in the input box
    var movie = $("#movie-input").val().trim();
    
    //the tv added in the text box is added to the array
    movies.push(movie);
    
    //calling renderButtons 
    renderButtons();
    
    });
    
    //DISPLAYING
        $(document).on('click', 'button',  function() {
            // Deleting the tv shows prior to adding new movies
                $('#GIFArea').empty(); 
                var b = $(this).attr('data-name');		
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=Kv8RogBgZpIBlK5qvvmG0qa1PthnMBnF";  //query api url and public key
                console.log(queryURL); 
    
                //ajax call
                $.ajax({
                        url: queryURL,
                        method: 'GET'
                    })
                //data from the API
                    .done(function(response) {
                        console.log(response);
                  //array of results in the results variable
                        var results = response.data;
                //Looping over every result item
                        for (var i = 0; i < results.length; i++) {
                //creating a div class item
                        var gifDiv = $('<div class="item">');
                //storing the items ratings      
                        var rating = results[i].rating;
                 //creating an element to display the items ratings
                        var r = $('<p>').text("Rating: " + rating);
                //image tag
                        var gifImage = $('<img>');
                //image tag gets a src attribute
                            gifImage.attr('src', results[i].images.fixed_height_still.url)
                                    .attr('data-still', results[i].images.fixed_height_still.url)
                                    .attr('data-animate', results[i].images.fixed_height.url)
                                    .attr('data-state', "still")
                                    .addClass("showImage");
                //displaying image and rating
                            gifDiv.append(r)
                                  .append(gifImage);	                    
    
                            	  
                            $('#GIFArea').prepend(gifDiv);
                        }
    
                    });
            });
    

//Still and Working Images
        // function for when the image is clicked on by the user
        $(document).on('click', '.showImage',  function() {
    
            var state = $(this).data('state');
            if (state == "still") {
                console.log("still image works");
             // Set the image to animate
                $(this).attr('src', $(this).data('animate'))
                       .data('state', 'animate');
            } else {
            //  else set src to the data-still value
                console.log("animated image works");
                $(this).attr('src', $(this).data('still'))
                       .data('state', 'still');               
            }
    
        });
    
    });