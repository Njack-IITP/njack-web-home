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

# Caching
To prevent latency in fetching from firebase, caching of firebase DB objects is enabled using the _APIcacheConstructor.py_ script. A second layer of caching will be acting over this cache from cloudflare's reverse proxy caching set to rebuild every 4 hrs. If not manually triggered, local cache is refreshed by a cron job on the travis server every 24 hours at around 5:49pm IST. Remember to rebuild/refresh both caches after making changes to firebase data tree for immediate effect.      
Updates are not cached on either of the three servers.

# Firebase Realtime Database tree structure
 - Everything is an entity.
 - root is "entity" under which different entity types are stored.
 - different data types stored are "team", "updates", "partners", "node", "event" ... as in the image below. 
 - Request co-ordinators for Firebase access
![Firebase Realtime Database tree structure](https://raw.githubusercontent.com/Njack-IITP/njack-web-home/master/public/images/jsonDBStruct.png)
