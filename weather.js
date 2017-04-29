function weatherAPI(place, state){
  $.ajax({
  url : "https://api.wunderground.com/api/96d25e39e45771c9/geolookup/conditions/q/"+state+"/"+place+".json",
  dataType : "jsonp",
  success : function(parsed_json) {
    //Variables for conditions
    place = parsed_json.location.city;
    temp_f = parsed_json.current_observation.temp_f;
    zipcode = parsed_json.location.zip;
    state = parsed_json.location.state;
    status = parsed_json.current_observation.weather;
    image = parsed_json.current_observation.icon_url;


    // Transfer content to HTML
    $(".city").html("<h1>" + place +","+state + "</h1>");
    $(".zipcode").html("Your Zipcode is: " + zipcode);
    $(".status").html("It is: " + status);
    $(".status").append('<img src='+image+'>');
    $(".temp").html("<h1>" + temp_f + "&deg; </h1>");

    // Log the data in the console as well
    console.log(place);
    console.log(zipcode);
    console.log(state);
    console.log(status);
    console.log(temp_f);

    playlistSend();


  }
}); //ajax closing bracket
} //Weather Api Function Closing bracket