/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("document ready in client.js");

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
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
          <span>${tweet.created_at}</span>
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

  renderTweets(data);
});
