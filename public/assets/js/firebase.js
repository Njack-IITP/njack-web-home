// Initialize Firebase
var config = {
apiKey: "AIzaSyBycKdfDXgvYk6TJUMKzOxefteWg1OKHYQ",
authDomain: "njack-web.firebaseapp.com",
databaseURL: "https://njack-web.firebaseio.com",
projectId: "njack-web",
storageBucket: "njack-web.appspot.com",
messagingSenderId: "492601859045"
};
firebase.initializeApp(config);
var database = firebase.database();

 function setUpdates(){
    var sidebarHTML = ""
    cnt = 0;
    firebase.database().ref('/entity/updates').orderByChild('id').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            cnt += 1;
            if (cnt >=5){
                return;
            }
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childSnapshot);
            console.log(childData);
           
            sidebarHTML += '<section>';
            if(childData.hasOwnProperty('img'))
            sidebarHTML += '<a href="#" class="image featured"><img src="' + childData.url + '" alt="" /></a>';
            sidebarHTML += '<header>\
                <h3>' + childData.name + '</h3>\
            </header>\
            <p>' + childData.desc + '</p>';
            if(childData.hasOwnProperty('url'))
                sidebarHTML +='<ul class="actions">\
                    <li><a href="' + childData.url + '" class="button">More Details</a></li>\
                    </ul>';
            sidebarHTML +='</section>';
            
            
          });
          if (snapshot.length > 5){
            sidebarHTML +='<p>Limited to showing 5 latest updates.</p><br>';
            sidebarHTML +='<ul class="actions">\
                    <li><a href="updates.html" class="button">Show more</a></li>\
                    </ul>';
          }
          $("#sidebar #loader").fadeOut("slow",function(){
              $("#sidebar").append(sidebarHTML);
        });
        
    });
    
}

function setUpdatesAll(){
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
            if(childData.hasOwnProperty('img'))
            sidebarHTML += '<a href="#" class="image featured"><img src="' + childData.url + '" alt="" /></a>';
            sidebarHTML += '<header>\
                <h3>' + childData.name + '</h3>\
            </header>\
            <p>' + childData.desc + '</p>';
            if(childData.hasOwnProperty('url'))
                sidebarHTML +='<ul class="actions">\
                    <li><a href="' + childData.url + '" class="button">More Details</a></li>\
                    </ul>';
            sidebarHTML +='</section>';
            
            
          });
          $("#sidebar #loader").fadeOut("slow",function(){
              $("#sidebar").append(sidebarHTML);
        });
        
    });
    
}