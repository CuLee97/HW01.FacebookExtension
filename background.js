/* List of URLs to check against */
var urlList = [
    "http://stackoverflow.com/",
    "http://qwertyuiop.asd/fghjkl",
    "https://www.google.com/",
    "https://www.qwertyuiop.asd/fghjkl"
];

/* Callback to be executed after all URLs have been checked */
var onCheckCompleted = function(unvisitedURLs) {
    console.log("The following URLs have not been visited yet:");
    unvisitedURLs.forEach(function(url) {
        console.log("    " + url);
    });
    alert("History check complete !\n"
          + "Check console log for details.");
};

/* Check all URLs in <urls> and call <callback> when done */
var findUnvisited = function(urls, callback) {
    var unvisitedURLs = [];
    var checkedURLs = 0;

    /* Check each URL... */
    urls.forEach(function(url) {
        chrome.history.getVisits({ "url": url }, function(visitItems) {
            /* If it has not been visited, add it to <unvisitedURLs> */
            if (!visitItems || (visitItems.length === 0)) {
                unvisitedURLs.push(url);
            }

            /* Increment the counter of checked URLs */
            checkedURLs++;
            alert(1);

            /* If this was the last URL to be checked, 
               execute <callback>, passing <unvisitedURLs> */
            if (checkedURLs === urls.length) {
                callback(unvisitedURLs);
            }
        });
    });
};

/* Bind <findUnvisited> to the browser-action */
chrome.browserAction.onClicked.addListener(function() {
    alert(1);
    findUnvisited(urlList, onCheckCompleted);
});