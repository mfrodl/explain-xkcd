chrome.webNavigation.onCompleted.addListener(function(details) {
  var url = new URL(details.url);
  if (url.hostname != 'xkcd.com') {
    chrome.browserAction.setPopup({popup: '', tabId: details.tabId});
  }
});
