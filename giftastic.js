$(document).ready(function(){
    var topics = ['penguin', 'mouse', 'bear', 'dolphin', 'giraffe', 'pig', 'cow', 'cobra'];

   
    function buttonExpress(){
        
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {

            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        
        }
    
    }    
    
    buttonExpress();
   


  $(document).on('click', '.expression', function() {

    var animal = $(this).html(); 
    
    console.log(animal);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=srEKxRt7Kxm0WFYeTutG7q3xR2He2C7S&limit=10";
        
        $.ajax({url: queryURL, method: 'GET'})
        
        .done(function(response) {
            
            var results = response.data;
            
            $('#expressView').empty();
                
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                       
                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', playGif);
                    
                    
                    var rating = results[j].rating;
                            
                    var displayRated= $('<p>').text("Rating: " + rating);
                    $('#expressView').prepend(displayRated);
            
                }
       
            }); 

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 
                    if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } 
                 else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 
                
    }) 

       $(document).on('click', '#addExpress', function(){
    
        if ($('#express-input').val().trim() == ''){
      
            alert('Please add animal.');
   }
   else {
    
    var animal = $('#express-input').val().trim();
    
    topics.push(animal);
    
    $('#express-input').val('')
    
    buttonExpress();
    
    return false;

    }

});



});  