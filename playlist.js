// playlistSend function:
function playlistSend() {
//set variables for the time and and Temperature
var date = new Date();
var timestamp = date.getHours();
console.log(date.getHours());
var playlist;
var timeFrame = document.querySelector('.time');

console.log(timeFrame);


// playlist names assigned to ojects
//earlybird is var name for 6 a.m. - 8 a.m.
var earlybird = {
  hot:"good vibes",
  cool:"relax and unwind",
  rainy:"in the shower",
  cold:"mood booster"
};
// busybee is var name for 8:01am - 5pm
var busybee = {
  hot:"young & free",
  cool:"relax and unwind",
  rainy:"good vibes",
  cold:"have a great day"
};
// windDown is var name for 5:01pm - 9pm
var winddown = {
  hot:"good vibes",
  cool:"relax and unwind",
  rainy:"your favorite coffeehouse",
  cold:"wild & free"
};
// shitface is var name for 9:01pm - 1am
var shitface = {
  hot:"feelin good",
  cool:"acoustic",
  cold:"on fleek",
  rainy:"relax and unwind"
};
// nightowl is var name for 1:01am - 5:59am
var nightowl = {
  hot:"wild & free",
  cool:"dreamy vibes",
  cold:"you & me",
  rainy:"relax and unwind"
};


//condition for the cold temperature
if (temp_f <= 63) {
  console.log("It's Cold" +temp_f+" Degrees! The hour is "+timestamp);
  if (timestamp >= 6 && timestamp <= 8) {
    playlist = earlybird.cold;
  }
  else if(timestamp >= 9 && timestamp <= 17) {
    playlist = busybee.cold;
  }

  else if(timestamp >= 18 && timestamp <= 21) {
    playlist = winddown.cold;
  }
  else if(timestamp >= 22 || timestamp <= 2) {
    playlist = shitface.cold;
  }
  else if(timestamp >= 3 && timestamp <= 5) {
    playlist = nightowl.cold;
  }
}

//condition for the cool temperature
else if(temp_f >= 64 && temp_f <= 84) {
  if (timestamp >= 6 && timestamp <= 8) {
    playlist = earlybird.cool;
    getPlaylist(playlist);
  }
  else if(timestamp >= 9 && timestamp <= 17) {
    playlist = busybee.cool;
    getPlaylist(playlist);
  }

  else if(timestamp >= 18 && timestamp <= 21) {
    playlist = winddown.cool;
    getPlaylist(playlist);
  }
  else if(timestamp >= 22 || timestamp <= 2) {
    playlist = shitface.cool;
    getPlaylist(playlist);
  }
  else if(timestamp >= 3 && timestamp <= 5) {
    playlist = nightowl.cool;
    getPlaylist(playlist);
  }
  console.log("It's Cool: " +temp_f+" Degrees! The hour is "+timestamp)
}

//condition for the hot temperature
else if(temp_f >= 85) {
  if (timestamp >= 6 && timestamp <= 8) {
    playlist = earlybird.hot;
    getPlaylist(playlist);
  }
  else if(timestamp >= 9 && timestamp <= 17) {
    playlist = busybee.hot;
    getPlaylist(playlist);
  }

  else if(timestamp >= 18 && timestamp <= 21) {
    playlist = winddown.hot;
    getPlaylist(playlist);
  }
  else if(timestamp >= 22 || timestamp <= 2) {
    playlist = shitface.hot;
    getPlaylist(playlist);
  }
  else if(timestamp >= 3 && timestamp <= 5) {
    playlist = nightowl.hot;
    getPlaylist(playlist);
  }
  console.log("It's Hot: " +temp_f+" Degrees! The hour is "+timestamp);

 }

   timeFrame.textContent = playlist;

}

//weather condition === playlist var
//var playlist = shitface.cold;
// console.log(playlist);
// plalist name is used in the api to pull plalist uri
function getPlaylist(playlist) {

var queryURL = "https://api.spotify.com/v1/search?q=" + playlist + "&type=playlist";
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  // Printing the entire object to console
  console.log(response);
  // Printing the artist id from the Spotify object to console
  var playlistID = response.playlists.items[0].id;
  console.log("playlistID " + playlistID);
  var playlistsTracks = response.playlists.items[0].uri;
  console.log("playlistsTracks uri " + playlistsTracks);
  var tracks = response.playlists.items[0].tracks.href;
  console.log(tracks);


  $.ajax({
    url: tracks + "?offset=0&limit=10",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer BQAjAR1nO5rSsKVamqnCTb7Q6CysZLdmvU_D3qtIrCFVgMgSVMPilndoMmA3bfEPhszELH2PPFh7_P5mNT9JeA-unVibkCyrTNABL9Z42HpBJcX4pGrX5qsEtMyC2pwnd04UNkuBre87mXiEWJcKjXvGs0KCLE0");
    },
    xhrFields: {
      withCredentials: true
    },
    //headers: {Authorization: "Bearer BQAjAR1nO5rSsKVamqnCTb7Q6CysZLdmvU_D3qtIrCFVgMgSVMPilndoMmA3bfEPhszELH2PPFh7_P5mNT9JeA-unVibkCyrTNABL9Z42HpBJcX4pGrX5qsEtMyC2pwnd04UNkuBre87mXiEWJcKjXvGs0KCLE0"},
    method: "GET"
  }).done(function (responseTracks) {
    console.log(responseTracks);

    var artist = responseTracks.items[0].track.artists[0].name;
    var trackArr = responseTracks.items
    console.log(trackArr);
    console.log(artist);

    for (var i = 0; i < trackArr.length; i++) {
      // console.log("the track array " + trackArr[i]);
      var artistArr = trackArr[i].track.artists;
      for (j = 0; j < artistArr.length; j++) {
        console.log("artists are " + artistArr[j].name);

      }
    }




  })
// the uri is used to load in the iframe player
// Building a Spotify player playing the top song associated with the artist
// (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
var playButton = "<iframe src='https://open.spotify.com/embed?uri=" +
  response.playlists.items[0].uri +
 "' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>";
// console's the full path being used for the player
console.log(playButton);
// updating dom with the new player
$("#player-div").html(playButton);
});
}
// i frame is added to the dom
//$("#go").on("click", function(event) {
  // console.log("button was pressed");
  // var playlist = busybee.cold;
  // console.log(playlist);
  // getPlaylist(playlist);
//});

//end of playlistSend function