/* globals auth0 */

const profileKey = 'profile';
const tokenKey = 'token';
const expiresAtKey = 'expiresAt';
const redirectKey = 'redirectTo';
const queryStringKey = 'queryString';

function buildElmApp(module, node) {
  
  /* Only register a service worker if it's supported */
  if ('serviceWorker' in navigator) {
    console.log('👍', 'navigator.serviceWorker is supported');
    navigator.serviceWorker.register('/service-worker.js');
  }
  
  if(window.auth0Config === undefined) {
   console.log('missing auth0 config file');
  }
  
  var webAuth = new auth0.WebAuth(window.auth0Config);
  
  function authorize (route, query) {
    localStorage.setItem(redirectKey, route);
    if(query !== undefined) {
      localStorage.setItem(queryStringKey, query);
    }
    webAuth.authorize();
  }
  
  function getAuthData (profile, token, expiresAt) {
    if(window.location.hash.startsWith('#access_token=')) {
      return null;  
    }
    
    if(profile && token && expiresAt) {
      var now = new Date();
      var expires = new Date(expiresAt);
      if(expires <= now) {
        authorize(window.location.hash.slice(1), window.location.search);
        return null; 
      }
      
      return {
        profile: JSON.parse(storedProfile),
        token: storedToken
      };
    }
    
    return null;
  }
  
  var storedProfile = localStorage.getItem(profileKey);
  var storedToken = localStorage.getItem(tokenKey);
  var expiresAt = localStorage.getItem(expiresAtKey);
  
  var authData = getAuthData(storedProfile, storedToken, expiresAt);
  
  var elmFlags = authData;
  
  var app = module.init({ 
    node: node,
    flags: elmFlags
  });
  
  app.ports.authorize.subscribe(function(opts) {
      authorize(opts.route);
  });
  
  app.ports.logout.subscribe(function(opts) {
      localStorage.removeItem(profileKey);
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(expiresAtKey);
    });
  
  webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
      if (err) {
        return console.error(err);
      }
      if (authResult) {
        window.location.hash = '';
        webAuth.client.userInfo(authResult.accessToken, function(err, profile) {
          var result = { err: null, ok: null };
          var token = authResult.accessToken;

          if (err) {
            result.err = err.details;
            // Ensure that optional fields are on the object
            result.err.name = result.err.name ? result.err.name : null;
            result.err.code = result.err.code ? result.err.code : null;
            result.err.statusCode = result.err.statusCode ? result.err.statusCode : null;
          }
          if (authResult) {
            result.ok = { profile: profile, token: token };
            localStorage.setItem(profileKey, JSON.stringify(profile));
            localStorage.setItem(tokenKey, token);
            
            var expireDate = new Date(new Date().getTime() + authResult.expiresIn * 1000);
            localStorage.setItem(expiresAtKey, expireDate.toISOString())
                      
            var redirectTo = localStorage.getItem(redirectKey);
            if (redirectTo) {
              localStorage.removeItem(redirectKey);
                            
              var query = localStorage.getItem(queryStringKey);
              if(query !== null) {
                localStorage.removeItem(queryStringKey);
                redirectTo = query + "#" + redirectTo;
              } else {
                redirectTo = "#" + redirectTo;
              }
              
              var href = window.location.href.replace('#', '');
              result.redirect = href + redirectTo;
            }else {
              result.redirect = null;
              localStorage.removeItem(queryStringKey);
            }
          }
          app.ports.authResult.send(result);
        });
      }
    });
  
  //manifest events
  window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    app.ports.setInstall.send(true);
  });

  app.ports.install.subscribe(function(opts) {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    promptEvent.userChoice.then((result) => {
      console.log('👍', 'userChoice', result);
      // Reset the deferred prompt variable, since 
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button
      app.ports.setInstall.send(false);
    });
  });
  
  return app;
}