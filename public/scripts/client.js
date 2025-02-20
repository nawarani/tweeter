/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("document ready in client.js");


  // protecc input
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src = ${tweet.user.avatars} alt="user avatar">
            <span>${escape(tweet.user.name)}</span>
          </div>
          <span>${escape(tweet.user.handle)}</span>
        </header>
        <section>${escape(tweet.content.text)}</section>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div class = "tweet-icons">
            <i class="fa-sharp fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-sharp fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);
    return $tweet;
  };

  const createError = function(shortBool) {
    if(shortBool){
      $('.error-span').text("Tweet cannot be empty").addClass('visible-error').slideDown();

    } else {
      $('.error-span').text("Tweet cannot be over 140 characters").addClass('visible-error').slideDown();
    }
  };

  
  const renderTweets = function(tweets) {
    $('.tweets').empty();
    for(const tweet of tweets){
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  
  // form submission with jquery
  $('.new-tweet form').on("submit", function(event) {
    event.preventDefault();
    const textContent = $(this).find('textarea').val();
    const data = $(this).serialize();
    console.log(data);

    if(textContent === ''|| textContent === null){
      createError(true);
    } else if(textContent.length > 140) {
      createError(false);
    } else {
      $.ajax({
        type:"POST",
        url: '/tweets',
        data: data,
        success: function(res) {
          console.log('Tweet submitted');
          loadTweets();
        },
        error: function(xhr, status, error) {
          console.log('Error: ', error);
        }
      });
    }
  });
  
  
  // fetching tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      console.log('get /api/tweets: ', data);
      renderTweets(data);
    })
  };

  loadTweets();


  //clear error on form click
  $('.new-tweet form textarea').on("click", function(event) {
    $('.error-span').removeClass('visible-error').slideUp();
  });

});
