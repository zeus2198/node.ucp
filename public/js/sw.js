/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
const version = "0.2",
    cacheName = "n-ucp-" + version,
    files = [
        '/public/css/global.min.css',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'https://code.jquery.com/jquery-3.2.1.slim.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
    ],
    // here we will write other requests to be cached based on the regex pattern:
    cacheRegex = new RegExp(
        [
            '.*googleapis.*',
            '.*/public/img/.*',
            '.*/public/js/.*',
            '.*woff.*' // font requests
        ].join('|')
    );


self.addEventListener("install", function (event) {
    event.waitUntil(caches.open(cacheName)
        .then(function (cache) {
            cache.addAll(files) // adding files to cache            
        })
    );
    console.log('ServiceWorker Installed version:', cacheName);
});

function checkBundle(request) {
    return new Promise(function(resolve, reject){
        caches.open(cacheName).then(function(cache) {
             //first lets check whether its in cahce already or not
            cache.keys(request, { ignoreSearch: true }).then(function(keys) {    
                if(keys.length == 0) {
                    return resolve(fetch(request).then(
                        function (response) {
                            if (!response || (response.status !== 200 && response.status !== 0)) {
                                return response;
                            }                  
                            cache.put(request, response.clone());                           
                            return response;
                        }
                    ));
                }

                const lastVersion = /bundle.js\?v=(.*)$/.exec(keys[0].url)[1],
                    curVersion = /bundle.js\?v=(.*)$/.exec(request.url)[1];
                
                if(lastVersion == curVersion)
                    return resolve(cache.match(request));
               
                //bundle file has changed, lets delete it from cache first
                cache.delete(keys[0]);
                //now we fetch new bundle and serve it and store in cache
                var fetchRequest = request.clone();
                resolve(fetch(fetchRequest).then(
                    function (response) {
                        if (!response || (response.status !== 200 && response.status !== 0)) {
                            return response;
                        }                  
                        cache.put(request, response.clone());                           
                        return response;
                    }
                ));
              });
        });
    });
}

self.addEventListener("fetch", function (event) {
    event.respondWith(
        // intercepting response for bundle.js since bundle.js may change and we need to replace it in our cahce
        event.request.url.indexOf('public/bundle.js') != -1 ?
        checkBundle(event.request) :
        caches.match(event.request)// finding a match for request from our cache
            .then(function(response) {
                if (response)
                    return response;
                else if (!cacheRegex.test(event.request.url))
                    return event.request.cache == 'only-if-cached' ? Response.error() : fetch(event.request).catch(err => console.log(err)); // checking if url is to be cached 
                
                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(
                    function (response) {
                        if (!response || (response.status !== 200 && response.status !== 0)) {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(cacheName)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                )
            })
    );
});

self.addEventListener('activate', function (event) {
    // remove old cache in case of a new version of cache    
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                Promise.all(keyList.map(function (key) {
                    if (key !== cacheName) {                        
                        return caches.delete(key);
                    }
                }));
            })
    );
});