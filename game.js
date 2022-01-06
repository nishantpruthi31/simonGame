// alert("hello");

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false; // to keep track wether game started or not
var level = 0; // starting level of game

$(document).keypress(function(event) {
  // calling nextSequence when any key is prssed if game is not started yet
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



/*$(document).click(function(){
  // starting the game whenver user clicks on screen
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});  */


$(".btn").click(function() { // event listeners of buttons
  var userChosenColour = $(this).attr("id"); // storing id of that button which is clicked
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour); // to make sound
  animatePress(userChosenColour); // to make animation

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      makeSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }

}

function nextSequence() {

  userClickedPattern = []; // to make user ready for next level

  level++; // whenever nextsequence is called level keep on increasing
  $("#level-title").text("Level " + level); // updating that change



  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

if(level==1)
{
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // selcting the color and generating a flash on it
  makeSound(randomChosenColour);
}
else{
  showAllPattern();
}


}

function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100); // removing pressed animation after 0.1 s
}

function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.

  level = 0;
  gamePattern = [];
  started = false;
}

function showAllPattern()                    // my custom fxn to make gome more awesome
{
  for(var i=0;i<gamePattern.length;i++)
  {
    randomChosenColour=gamePattern[i];
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        makeSound(randomChosenColour);

        /* figuring how to add timeout after each iteration so that animation not looks confusing */

  }
}
