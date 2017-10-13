$(function() {
  if (chrome.tabs === undefined) {
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = new URL(tabs[0].url);
    var explainURL = 'https://explainxkcd.com' + url.pathname;

    $('#explanation').html('<img src="loading.gif">');
    $('#explanation').css({width: '441px'});

    $.ajax({
      url: explainURL,
      context: document.body,
      success: function(response) {
        $('#explanation').html($(response).find('h2 ~ p'));
      },
      error: function() {
        $('#explanation').html('Something went wrong');
      }
    });
  });
});
