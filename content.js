chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request['type'] == 'comicID') {
    var body = $('body').html();
    var regex = /Permanent link to this comic: https:\/\/xkcd.com\/([0-9]+)/
    var comicID = regex.exec(body)[1];

    sendResponse(comicID);
  }
});
