$(document).ready(function() {
  console.log("document ready");

  $("#tweet-text").on('input', function() {
    const charCount = $(this).val().length;
    const remainingChars = 140 - charCount;
    const counter = $(this).siblings('div').find('.counter');
    counter.text(remainingChars);
    if (remainingChars < 0) {
      counter.addClass('red-counter');
    } else {
      counter.removeClass('red-counter');
    }
  });
});

