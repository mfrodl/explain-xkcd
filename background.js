function setPopup(tabId, url) {
  var url = new URL(url);
  if (url.hostname == 'xkcd.com') {
    chrome.pageAction.show(tabId);
  }
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
