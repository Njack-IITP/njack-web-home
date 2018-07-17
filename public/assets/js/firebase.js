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
                    <li><a href="updates.html" class="button">Show more</a></li>\
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

function fillEve(childData) {
    var eveHTML = ""
    console.log(childData)
    Object.keys(childData).forEach(function (key, index) {
        val = childData[key]
        eveHTML += '<header class="major">\
            <h2>' + key + '</h2>\
            </header>';
        eveHTML += '<div class="row features">';
        val.forEach(function(cval){
            console.log(eveHTML)
            if (cval == null)
                return true;
            eveHTML += '<section class="col-3 col-12-narrower feature">\
                <div class="image-wrapper first">\
                    <a class="image featured"><img src="' + cval.img + '" class="teamMPic" alt="" /></a>\
                </div> <h3>' + cval.name + '</h3>';
            if (cval.desig)
                eveHTML += '<h4>' + cval.desig + '</h4>';

            eveHTML += '<span>';
            if (cval.web)
                eveHTML += '<a href="' + cval.web + '" target="_blank"> <i class="fa social fa-external-link" aria-hidden="true"></i> </a>';
            if (cval.gh)
                eveHTML += '<a href="' + cval.gh + '" target="_blank"> <i class="fa social fa-github" aria-hidden="true"></i> </a>';

            if (cval.fb)
                eveHTML += '<a href="' + cval.fb + '" target="_blank"> <i class="fa social fa-facebook-official" aria-hidden="true"></i> </a>';

            eveHTML += '</span>';
            eveHTML += '</section>';
            console.log(eveHTML)
        });
        
        eveHTML += '</div>';
    });
    
    return eveHTML;
    
}
function translateDate(dateObj){
    mo = {
        1: "January",
        2: "Febbruary",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }
    return mo[dateObj.m] +" "+ dateObj.y.toString()
}
function setEvents() {
    eveJson = []
    cnt = 0;
    $.getJSON("/cache/events.json", function (data) {
        console.log("success");
        cacheStor = data;
        console.log(cacheStor);
        $.each(cacheStor, function (childKey, childData) {
            if (childData == null)
                return true;

        });
        $("#eveContainer #loader").fadeOut("slow", function () {
            $("#eveContainer").append(fillEve(eveJson));
        });
        return;
    })
        .fail(function () {

            firebase.database().ref('/entity/events').once('value').then(function (snapshot) {
                console.log(snapshot.val());
                var childKey = snapshot.key;
                var childData = snapshot.val();
                snapshot.forEach(function (childSnapshot) {
                        var gchild = childSnapshot.val();
                    if (!eveJson.hasOwnProperty(translateDate(gchild.date)))
                        eveJson[translateDate(gchild.date)] = []
                    eveJson[translateDate(gchild.date)].push(gchild)
                    });
                    console.log(eveJson)
                $("#eveContainer #loader").fadeOut("slow", function () {
                    fillHtml = fillEve(eveJson);
                    console.log(fillHtml)
                    $("#eveContainer").append(fillHtml);
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
                    <li><a href="updates.html" class="button">Show more</a></li>\
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
                    <li><a href="updates.html" class="button">Show more</a></li>\
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