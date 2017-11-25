$(function() {
  $('body').on('click', 'a', function() {
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });

  if (chrome.tabs === undefined) {
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabID = tabs[0].id;
    chrome.tabs.sendMessage(tabID, {type: 'comicID'}, function(comicID) {
      var explainURL = 'https://explainxkcd.com/' + comicID + '/';

      $('#explanation').html('<img src="images/loading.gif">');
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
          for (let element of $(response).find('h2 ~ *')) {
            // Copy explanation until the next heading
            if (element.tagName == 'H2') {
              break;
            }

            // Remove all links from element
            $('a', element).contents().unwrap();

            // Append result to explanation
            $('#explanation').append(element);
          }
        },
        error: function() {
          $('#explanation').html('Something went wrong');
        }
      });
    });
  });
});
