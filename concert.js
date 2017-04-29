// start of concert schedule script

function concertSchedule(artist){

  console.log(artist);

var queryURL = "https://api.seatgeek.com/2/events?geoip=true&type=concert&client_id=NzM2NTc3NXwxNDkyNjQ4MzE1LjY4";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {

      console.log("it works", response);

var concertDiv = $("<div class='concert'>");

var concertArray = response.events;
console.log(concertArray);


for(i=0 ; i < 6 ; i++) {

          //Storing the venue data
          var concertVenue = response.events[i].venue.address;

          var concertPerformer = response.events[i].venue.name;

          var concertArtistName = response.events[i].performers[0].name;

          // Creating an element to have the rating displayed
          var venueInfo = $("<p>").html(concertVenue + "<br>" + concertPerformer + "<br>" +concertArtistName);

          // Displaying the rating
          concertDiv.append(venueInfo);

                  $("#concerts-view").prepend(concertDiv);

}

for(i=0 ; i < concertArray.length ; i++) {

  console.log("the event is", concertArray[i]);

  var artistArray = concertArray[i].performers;

  for(j=0; j < artistArray.length ; j++) {

    console.log("the artists are", artistArray[j].name);
  }

  }

    });

}

  console.log("before"); // call concertSchedule function 
  concertSchedule('artist');




//var audioPlayerPlay = document.querySelector('.play-button');
//var audioPlayerPlayCustom = document.querySelector('.play-button-custom');

//audioPlayerPlayCustom.addEventListener('click', function() {
//  audioPlayerPlay.click();  
//});


