// Initialize Firebase
var config = {
    apiKey: "AIzaSyBycKdfDXgvYk6TJUMKzOxefteWg1OKHYQ",
    authDomain: "njack-web.firebaseapp.com",
    databaseURL: "https://njack-web.firebaseio.com",
    projectId: "njack-web",
    storageBucket: "njack-web.appspot.com",
    messagingSenderId: "492601859045"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
var database = firebase.database();

function fetchFromCache(entity) {

    $.getJSON("/cache/" + entity + ".json", function(data) {
            console.log("success");
            jqxhr = data;
            console.log(jqxhr);
            return data;
        })
        .fail(function() {
            return false;
        })

}


function setUpdates() {
    var sidebarHTML = ""
    cnt = 0;
    firebase.database().ref('/entity/updates').orderByChild('id').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            cnt += 1;
            if (cnt >= 5) {
                return;
            }
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childSnapshot);
            console.log(childData);

            sidebarHTML += '<section>';
            if (childData.hasOwnProperty('img'))
                sidebarHTML += '<a href="#" class="image featured"><img src="' + childData.url + '" alt="" /></a>';
            sidebarHTML += '<header>\
                <h3>' + childData.name + '</h3>\
            </header>\
            <p>' + childData.desc + '</p>';
            if (childData.hasOwnProperty('url'))
                sidebarHTML += '<ul class="actions">\
                    <li><a href="' + childData.url + '" class="button">More Details</a></li>\
                    </ul>';
            sidebarHTML += '</section>';


        });
        if (snapshot.length > 5) {
            sidebarHTML += '<p>Limited to showing 5 latest updates.</p><br>';
            sidebarHTML += '<ul class="actions">\
                    <li><a href="/updates" class="button">Show more</a></li>\
                    </ul>';
        }
        $("#sidebar #loader").fadeOut("slow", function() {
            $("#sidebar").append(sidebarHTML);
        });

    });

}

function setTeam() {
    var teamHTML = ""
    cnt = 0;
    $.getJSON("/cache/team.json", function(data) {
            console.log("success");
            cacheStor = data;
            console.log(cacheStor);
            $.each(cacheStor, function(childKey, childData) {
                if (childData == null)
                    return true;
                teamHTML += '<header class="major">\
            <h2>' + childKey + '</h2>\
            </header>';
                teamHTML += '<div class="row features">';
                $.each(childData, function(gchildKey, gchildData) {
                    if (gchildData == null)
                        return true;
                    teamHTML += '<section class="col-3 col-12-narrower feature">\
                    <div class="image-wrapper first">\
                        <a class="image featured"><img src="' + gchildData.img + '" class="teamMPic" alt="" /></a>\
                    </div> <h3>' + gchildData.name + '</h3>';
                    if (gchildData.desig)
                        teamHTML += '<h4>' + gchildData.desig + '</h4>';

                    teamHTML += '<span>';
                    if (gchildData.web)
                        teamHTML += '<a href="' + gchildData.web + '" target="_blank"> <i class="fa social fa-external-link" aria-hidden="true"></i> </a>';
                    if (gchildData.gh)
                        teamHTML += '<a href="' + gchildData.gh + '" target="_blank"> <i class="fa social fa-github" aria-hidden="true"></i> </a>';

                    if (gchildData.fb)
                        teamHTML += '<a href="' + gchildData.fb + '" target="_blank"> <i class="fa social fa-facebook-official" aria-hidden="true"></i> </a>';

                    teamHTML += '</span>';
                    teamHTML += '</section>';

                });

                teamHTML += '</div>';


            });
            $("#teamContainer #loader").fadeOut("slow", function() {
                $("#teamContainer").append(teamHTML);
            });
            return;
        })
        .fail(function() {

            firebase.database().ref('/entity/team').once('value').then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    teamHTML += '<header class="major">\
            <h2>' + childKey + '</h2>\
        </header>';
                    teamHTML += '<div class="row features">';
                    childSnapshot.forEach(function(grandchildSnapshot) {
                        var gchildData = grandchildSnapshot.val();
                        teamHTML += '<section class="col-3 col-12-narrower feature">\
                <div class="image-wrapper first">\
                    <a class="image featured"><img src="' + gchildData.img + '" class="teamMPic" alt="" /></a>\
                </div> <h3>' + gchildData.name + '</h3>';
                        if (gchildData.desig)
                            teamHTML += '<h4>' + gchildData.desig + '</h4>';

                        teamHTML += '<span>';
                        if (gchildData.web)
                            teamHTML += '<a href="' + gchildData.web + '" target="_blank"> <i class="fa social fa-external-link" aria-hidden="true"></i> </a>';
                        if (gchildData.gh)
                            teamHTML += '<a href="' + gchildData.gh + '" target="_blank"> <i class="fa social fa-github" aria-hidden="true"></i> </a>';

                        if (gchildData.fb)
                            teamHTML += '<a href="' + gchildData.fb + '" target="_blank"> <i class="fa social fa-facebook-official" aria-hidden="true"></i> </a>';

                        teamHTML += '</span>';
                        teamHTML += '</section>';

                    });

                    teamHTML += '</div>';


                });
                $("#teamContainer #loader").fadeOut("slow", function() {
                    $("#teamContainer").append(teamHTML);
                });

            });
            return false;
        })
}

function setPartners() {
    var partnersHTML = ""
    cnt = 0;
    $.getJSON("/cache/partners.json", function(data) {
            $.each(data, function(childKey, childData) {
                if (childData == null)
                    return true;
                if (childData.hasOwnProperty('url'))
                    partnersHTML += '<a href = "' + childData.url + '">'
                partnersHTML += '<img src="' + childData.img + '" class="partners" >';
                if (childData.hasOwnProperty('url'))
                    partnersHTML += '</a>';

            });
            if (data.length > 5) {
                partnersHTML += '<p>Limited to showing 5 latest updates.</p><br>';
                partnersHTML += '<ul class="actions">\
                    <li><a href="/updates" class="button">Show more</a></li>\
                    </ul>';
            }
            $("#collaborations #loader").fadeOut("slow", function() {
                $("#collaborations").append(partnersHTML);
            });
        })
        .fail(function() {

            firebase.database().ref('/entity/partners').once('value').then(function(snapshot) {
                console.log(snapshot.val())
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    if (childData.hasOwnProperty('url'))
                        partnersHTML += '<a href = "' + childData.url + '">'
                    partnersHTML += '<img src="' + childData.img + '" class="partners" >';
                    if (childData.hasOwnProperty('url'))
                        partnersHTML += '</a>'


                });
                if (snapshot.length > 5) {
                    partnersHTML += '<p>Limited to showing 5 latest updates.</p><br>';
                    partnersHTML += '<ul class="actions">\
                    <li><a href="/updates" class="button">Show more</a></li>\
                    </ul>';
                }
                $("#collaborations #loader").fadeOut("slow", function() {
                    $("#collaborations").append(partnersHTML);
                });

            });
        })

}


function setUpdatesAll() {
    var sidebarHTML = ""
    cnt = 0;
    firebase.database().ref('/entity/updates').orderByChild('id').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            cnt += 1;
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childSnapshot);
            console.log(childData);

            sidebarHTML += '<section>';
            if (childData.hasOwnProperty('img'))
                sidebarHTML += '<a href="#" class="image featured"><img src="' + childData.url + '" alt="" /></a>';
            sidebarHTML += '<header>\
                <h3>' + childData.name + '</h3>\
            </header>\
            <p>' + childData.desc + '</p>';
            if (childData.hasOwnProperty('url'))
                sidebarHTML += '<ul class="actions">\
                    <li><a href="' + childData.url + '" class="button">More Details</a></li>\
                    </ul>';
            sidebarHTML += '</section>';


        });
        $("#sidebar #loader").fadeOut("slow", function() {
            $("#sidebar").append(sidebarHTML);
        });

    });

}