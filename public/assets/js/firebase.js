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
    firebase.database().ref('/entity/events').once('value').then(function (esnapshot) {
        console.log(esnapshot.val());
        var echildKey = esnapshot.key;
        var echildData = esnapshot.val();
        var dt = new Date();
        esnapshot.forEach(function (echildSnapshot) {
            var egchildData = echildSnapshot.val();
            console.log(egchildData);
            if (egchildData.date.y == dt.getFullYear() && (egchildData.date.m - dt.getMonth() >=2 )){
                sidebarHTML += '<section class= "eveUpdates">';
                if (egchildData.hasOwnProperty('img'))
                    sidebarHTML += '<a href="#" class="image featured"><img src="' + egchildData.img + '" alt="" /></a>';
                sidebarHTML += '<header>\
                    <h3>' + egchildData.name + '</h3>\
                </header>\
                <p>' + egchildData.desc + '</p>';
                if (egchildData.hasOwnProperty('node'))
                    sidebarHTML += '<ul class="actions">\
                        <li><a href="/node/' + egchildData.node + '" class="button">More Details</a></li>\
                        </ul>';
                else if (egchildData.hasOwnProperty('url'))
                    sidebarHTML += '<ul class="actions">\
                        <li><a href="' + egchildData.url + '" class="button">More Details</a></li>\
                        </ul>';
                sidebarHTML += '</section>';
            }
        });
   
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

            sidebarHTML += '<section class= "eveUpdates">';
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
        $("#updates #loader").fadeOut("slow", function() {
            $("#updates").append(sidebarHTML);
        });

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
    var keysArr = Object.keys(childData);
    keysArr.sort(function(a, b){return b - a});
    keysArr.forEach(function (key, index) {
        val = childData[key]
        eveHTML += '<header class="major">\
            <h2> ' + translateDate(key,false) + ' </h2>\
            </header>';
        eveHTML += '<div class="row features">';
        val.forEach(function(cval){
            if (cval == null)
                return true;
            rimgarr = ['1.jpeg','2.png','3.jpg']
            var rimg = (cval.img) ? cval.img : '/images/random/' + rimgarr[Math.floor(Math.random() * rimgarr.length)];
            eveHTML += '<section class="col-3 col-12-narrower feature">\
                <div class="image-wrapper first">\
                    <a class="image featured"><img src="' + rimg + '" class="evePic" alt="" /></a>\
                </div> <h3>' + cval.name + '</h3>';
            if (cval.date)
                eveHTML += '<h4> <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp;&nbsp;' + dateTostr(cval.date.d, cval.date.m, cval.date.y) + '</h4>';
            if (cval.where)
                eveHTML += '<h4> <i class="fa fa-map-marker" style=""></i> &nbsp;&nbsp;' + cval.where + '</h4>';
            
            if (cval.desc)
                eveHTML += '<h5> ' + cval.desc + '</h5>';
            if (cval.node)
                eveHTML += '<ul class="actions">\
									<li><a href="/node/' + cval.node + '" class="button">More Info</a></li>\
								</ul>';
            eveHTML += '</section>';
        });
        
        eveHTML += '</div>';
    });
    
    return eveHTML;
    
}
function dateTostr(d,m,y){
    monthArr = {
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
    dstr =""
    if (d != 0)
        dstr+=d.toString() + " ";
    if (m != 0)
        dstr += monthArr[m] + " ";
    if (y != 0)
        dstr += y.toString();
    return dstr;
}

function translateDate(dateObj,num){
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
    if (num == false) {
        m = dateObj%100;
        y = Math.floor(dateObj / 100);
        return mo[m] +" "+ y.toString()
    } else {
        return parseInt(dateObj.y*100 + dateObj.m)
    }
}

function setNode(nodeID) {
    eveJson = []
    cnt = 0;
    $.getJSON("/cache/node.json", function (data) {
        console.log("success");
        cacheStor = data;
        console.log(cacheStor);
        $("#title").html(cacheStor[nodeID].title);
        $("#subtitle").html(cacheStor[nodeID].subtitle);
        $.each(cacheStor[nodeID].body, function (childKey, childData) {
            if (childData == null)
                return true;
            console.log(childData)
            var keysArr = Object.keys(childData);
            keysArr.sort(function(a, b){return b - a});
            keysArr.forEach(function (key, index) {
                if (key == 'img')
                    $("#content").append(`<a href="#" class="image featured"><img src="${childData[key]}" alt=""/></a>`);
                else
                    $("#content").append(`<${key}>${childData[key]}</${key}>`);
            });

        });
        $("#loader").fadeOut("slow", function () {
            $("#content").fadeIn();
        });
        return;
    }).fail(function () {
            firebase.database().ref('/entity/node/'+nodeID).once('value').then(function (snapshot) {
                console.log(snapshot.val());
                var childKey = snapshot.key;
                var childData = snapshot.val();
                $("#title").html(childData.title);
                $("#subtitle").html(childData.subtitle);
                childData.body.forEach(function (childSnapshot) {    
                        console.log(childSnapshot)
                        var keysArr = Object.keys(childSnapshot);
                        keysArr.sort(function(a, b){return b - a});
                        keysArr.forEach(function (key, index) {
                            if (key == 'img')
                                $("#content").append(`<a href="#" class="image featured"><img src="${childSnapshot[key]}" alt=""/></a>`);
                            else
                                $("#content").append(`<${key}>${childSnapshot[key]}</${key}>`);
                        });
                    });
                $("#loader").fadeOut("slow", function () {
                    $("#content").fadeIn();
                });

            });
            return false;
        })
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
            print(childKey, childData)
            if (!eveJson.hasOwnProperty(translateDate(gchild.date)))
                eveJson[translateDate(gchild.date)] = []
            eveJson[translateDate(gchild.date)].push(gchild)
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
                    if (!eveJson.hasOwnProperty(translateDate(gchild.date, true)))
                        eveJson[translateDate(gchild.date, true)] = []
                    eveJson[translateDate(gchild.date, true)].push(gchild)
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