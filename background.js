function setPopup(tabId, url) {
  var url = new URL(url);
  var popup = (url.hostname == 'xkcd.com' ? 'popup.html' : '');
  chrome.browserAction.setPopup({popup: popup, tabId: tabId});
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    setPopup(activeInfo.tabId, tabs[0].url);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url !== undefined) {
    setPopup(tabId, changeInfo.url);
  }
});
