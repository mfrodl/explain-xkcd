function setPopup(tabId, url) {
  if (/^https:\/\/xkcd.com\/([0-9]+\/)?$/.test(url)) {
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
