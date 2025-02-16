$(document).ready(function() {
  console.log("inside char counter js");

  $("#tweet-text").on('input', function() {
    const charCount = $(this).val().length;
    console.log("count", charCount);
    const remainingChars = 140 - charCount;
    $(this).siblings('div').find('.counter').text(remainingChars);
    if (remainingChars < 0) {
      $(this).siblings('div').find('.counter').addClass('red-counter');
    } else {
      $(this).siblings('div').find('.counter').removeClass('red-counter');
    }
  });
});

