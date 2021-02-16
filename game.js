var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
// $(document).keydown(function () {
//     if (level === 0) {
//         nextSequence();
//         $("h1").text("Level 0")
//     }
// });
$("#btnStart").click(function(){
  var idButton = this.id;
  // if (level === 0) {
          nextSequence();
          $("h1").text("Level 0")
      // }
  // ;
  animatePress(idButton);
  $("#btnStart").hide();
})

function nextSequence() {

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    // para la eleccion de los colores
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //para el flasheo de los botones
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    console.log(level);

}


// para el registro de los clicks
$(".btn").click(function () {
    var userChosenColour = this.id;
    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    console.log("gamePattern");
    console.log(gamePattern);

    console.log(gamePattern[level - 1]);
    console.log("userclickedPattern");
    console.log(userClickedPattern);

    console.log(userClickedPattern[level - 1]);
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
    // if (gamePattern.length === userClickedPattern.length) {
    //     checkAnswer(level);
    // }

});

//funcion del sonido
function playSound(name) {
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
};

//
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}



//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            $("h1").text("Level " + level);
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        $("h1").text("Game Over");
        $("#btnStart").text("Volver a intentar");
        $("#btnStart").show();
    }


    //
    function startOver() {
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
    }
}
