/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("document ready in client.js");

  
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src = ${tweet.user.avatars} alt="user avatar">
            <span>${tweet.user.name}</span>
          </div>
          <span>${tweet.user.handle}</span>
        </header>
        <section>${tweet.content.text}</section>
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
  
  const renderTweets = function(tweets) {
    for(const tweet of tweets){
      const $tweet = createTweetElement(tweet);
      $('.tweets').append($tweet);
    }
  };

  
  // form submission with jquery
  $('.new-tweet form').on("submit", function(event) {
    event.preventDefault();
    const textContent = $(this).find('textarea').val();
    const data = $(this).serialize();
    console.log(data);

    if(textContent === ''|| textContent === null){
      alert("Tweet cannot be empty");
    } else if(textContent.length > 140) {
      alert("Tweet cannot be over 140 characters");
    } else {
      $.ajax({
        type:"POST",
        url: '/tweets',
        data: data,
        success: function(res) {
          console.log('Tweet submitted');
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

});
