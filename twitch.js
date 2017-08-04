// https://api.twitch.tv/kraken/channels/freecodecamp?client_id=31i9eslpuun6qn34w0fcall00s36mp
// Array of users who stream regularly: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
//Run JQUERY
$(document).ready(function() {
    //local variable array of users who stream regularly
    var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"]
        //API

    $.getJSON("https://api.twitch.tv/kraken/streams/freecodecamp?client_id=31i9eslpuun6qn34w0fcall00s36mp").done(function(info) {
        //console.log(info)
        if (info.stream === null) {
            $("#fccstatus").html("  FreeCodeCamp is currently OFFILINE");
        } else {
            $("#fccstatus").html(" FreeCodeCamp is currently ONILINE");
        }
    });
    //for loop for the iteration of users(array)that are streaming currently.
    //data for channels of the users will be printed
    for (var i = 0; i < users.length; i++) {
        $.ajax({
            type: "GET",
            url: "https://api.twitch.tv/kraken/channels/" + users[i],
            headers: {
                "Client-id": "31i9eslpuun6qn34w0fcall00s36mp" // API key of twitch.tv
            },
            success: function(r) {
                console.log(r)
                $.getJSON("https://api.twitch.tv/kraken/streams/" + r.name + "?client_id=31i9eslpuun6qn34w0fcall00s36mp").done(function(info1) {
                    //console.log(info1)
                    var name = r._links.self.slice(37);
                    var logo = r.logo;
                    var status = r.status;
                    //will print the name, logo and status of the users
                    //console.log(name, logo, status);
                    //data will be populated in html
                    $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" + "<img src='" + r.logo + "'>" + "</div>" + "<div class='col-md-4'>" + r.display_name + "</div>" +
                        "<div class='col-md-4'>" + r.status + "</div>");

                    // users who are offline
                    // if (info1.stream === null) {
                    //$.getJSON(info1._links.channel, function(info2) {
                    //console.log(info2.name);
                    //});
                    //}




                });




            },
            //error handling if the users info isn't available
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + " : " + errorThrown);
                //alert("Error: User not found");
            }
        });
    };
});