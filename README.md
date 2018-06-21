# njack-web-home
Website for the NJACK root domain.

# local installation    
git clone git clone git@github.com:Njack-IITP/njack-web-home.git   && cd njack-web-home
npm install -g firebase-tools (assumong you have node preinstalled)
firebase login
firebase init
firebase serve

# deployment
Firebase is set to autodeploy from Travis builds restricted to the "firebase-deploy" branch.   
Write access to "firebase-deploy" branch is restricted to admins.

# Firebase Realtime Database tree structure
 - Everything is an entity.
 - root is "entity" under which different entity types are stored.
 - different data types stored are "team", "updates", "partners", "node", "event" ... as in the image below. 
 - Request co-ordinators for Firebase access
![Firebase Realtime Database tree structure](https://raw.githubusercontent.com/Njack-IITP/njack-web-home/master/public/images/jsonDBStruct.png)