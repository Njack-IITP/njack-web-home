# njack-web-home
Website for the NJACK root domain.   
    
![Travis CI](https://travis-ci.org/Njack-IITP/njack-web-home.svg?branch=firebase-deploy)  [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)  [![HitCount](http://hits.dwyl.io/Njack-IITP/njack-web-home.svg)](http://hits.dwyl.io/Njack-IITP/njack-web-home)
# local installation    
 - git clone git clone git@github.com:Njack-IITP/njack-web-home.git  && cd njack-web-home
 - npm install -g firebase-tools (assumong you have node preinstalled)
 - firebase login
 - firebase init
 - firebase serve

# deployment
Firebase is set to autodeploy from Travis builds restricted to the "firebase-deploy" branch.    
"firebase-deploy" can not be pushed to. Commits must be made to "staging" or other branches and then open a PR/MR to "firebase-deploy" for shipping into production.

# Firebase Realtime Database tree structure
 - Everything is an entity.
 - root is "entity" under which different entity types are stored.
 - different data types stored are "team", "updates", "partners", "node", "event" ... as in the image below. 
 - Request co-ordinators for Firebase access
![Firebase Realtime Database tree structure](https://raw.githubusercontent.com/Njack-IITP/njack-web-home/master/public/images/jsonDBStruct.png)
