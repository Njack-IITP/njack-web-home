import pyrebase
import json
import os, sys
import shutil

def constructEntityCache(db, entity):
    team = db.child("entity").child(entity).get()
    r = json.dumps(team.val())
    print(r)
    fo = open("public/cache/" + entity + ".json", "w+")
    fo.write(r)
    fo.close()

config = {
  "apiKey": "AIzaSyBycKdfDXgvYk6TJUMKzOxefteWg1OKHYQ",
  "authDomain": "projectId.firebaseapp.com",
  "databaseURL": "https://njack-web.firebaseio.com",
  "storageBucket": "njack-web.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
if os.path.isdir("public/cache"):
            shutil.rmtree("public/cache", ignore_errors=True)
if not os.path.isdir("public/cache"):
        os.mkdir( "public/cache", 0755 )

constructEntityCache(db,"team")
# constructEntityCache(db,"events")
constructEntityCache(db,"partners")
constructEntityCache(db,"node")
