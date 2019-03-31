Rss and Link Manager
===================

A site to help manage and keep track of links and rss feeds. It allows users to subscribe to rss feeds and save links to look at later. Links can also be added manually. 

The links can be tagged to make it easier to find or manage them later and are grouped into to main categories: To Do and Reference. Where the To Do items appear on the Read Later page but the Reference links do not.

View the example site on glitch:
<a href="https://glitch.com/edit/#!/abalone-valley">
  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fview-source%402x.png?1513093958802" alt="view source" height="33">
</a>

## Setup

Include a client.config.js file that defines a `auth0Config` object on the window. This object is passed to auth0's WebAuth method. The `auth0Config` object will need to define a `domain`, `clientID`, `scope`, `responseType`, `redirectUri`, and `audience` properties.

Add a `AZURE_ENDPOINT`, `AZURE_MASTER_KEY`, and `AUTH0_JWKS` to the environmental variables for the node server.

This site uses a auth0 Single Page App and Machine to Machine app to authenticate. Additionally it connects to an azure CosmosDb backend.

run `npm run start` to start the site.

-------------------

\ ゜o゜)ノ
