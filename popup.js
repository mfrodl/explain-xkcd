$(function() {
  $('body').on('click', 'a', function() {
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });

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
        // Comic heading
        $('#explanation').html($(response).find('h1#firstHeading'));
        // Link to original explanation
        $('#explanation').append(
          '<a href="' + explainURL + '" class="explain-link" ' +
          'title="Show original explanation"></a>'
        );
        // Explanation text
        $('#explanation').append($(response).find('h2 ~ p'));
      },
      error: function() {
        $('#explanation').html('Something went wrong');
      }
    });
  });
});
