
var PAGE_WIDTH = $('body').width();
var PAGE_HEIGHT = $('body').height();
var rightPlayerScore = 0;
var leftPlayerScore = 0;
//This var is used to boost the ball velocity when
//it hits one of the paddles
var BALL_ACC = 0.1;
var PADDLE_VEL = 3.8;
var BOARD_WIDTH = 500;
var BOARD_HEIGHT = 300;
var BALL_RADIUS = 25;
var MARGIN_LEFT = PAGE_WIDTH/2 - BOARD_WIDTH/2;
var MARGIN_TOP = 20;
var canvas = $('#canvas');
var BAR_WIDTH = 20;
var BAR_HEIGHT = 50;
var PADDLE_HEIGHT = 70;
var ballVel = [0 , 0];
var leftPaddleVel = [0, 0];
var rightPaddleVel = [0, 0];
var leftPaddlePos = [MARGIN_LEFT, MARGIN_TOP + BOARD_HEIGHT/2 +        leftPaddleVel[1] - PADDLE_HEIGHT/2];
var rightPaddlePos = [BOARD_WIDTH + MARGIN_LEFT - BAR_WIDTH, MARGIN_TOP + BOARD_HEIGHT/2 + rightPaddleVel[1] - PADDLE_HEIGHT/2];
var ballPos = [(BOARD_WIDTH/2) + MARGIN_LEFT, (BOARD_HEIGHT/2) + MARGIN_TOP];
var canvasCtx = canvas[0].getContext("2d");

//Function that tests with the ball hit some of the walls
//or one of the board sides which results in a score point
function checkBallForCollision(){
  //Test for collision with the vertical walls
  //This could result in a score
  
      //Check if the the ball hits the right wall
      if(ballPos[0] >= BOARD_WIDTH + MARGIN_LEFT - BAR_WIDTH - BALL_RADIUS){
        //Check if the ball hit the right paddle
        if((ballPos[1] >= rightPaddlePos[1] && ballPos[1] <= rightPaddlePos[1] + PADDLE_HEIGHT)){
        ballVel[0] = -ballVel[0];
          ballVel[0] += ballVel[0] * BALL_ACC;  
        ballPos[0] += ballVel[0];
        }
        //In this case the ball hit the wall so its a point
        //to the left player
        else{
        leftPlayerScore++;
        startNewRound();
        }
     }
    
    //Check if the ball hit the left wall
    if(ballPos[0] < MARGIN_LEFT + BALL_RADIUS + BAR_WIDTH){
      //Check if the ball hit the left paddle
        if((ballPos[1] >= leftPaddlePos[1] && ballPos[1] <= leftPaddlePos[1] + PADDLE_HEIGHT)){
        ballVel[0] = -ballVel[0];
        ballVel[0] += ballVel[0] * BALL_ACC;  
        ballPos[0] += ballVel[0];
        }
        //In this case the ball hit the wall so its a point
        //to the right player
        else{
        //Update score to right player
        rightPlayerScore++;
        startNewRound();
        }
    }
  
  //Collision with the horizontal walls
  //This results in a reflection of the ball
  if(ballPos[1] > BOARD_HEIGHT + MARGIN_TOP - BALL_RADIUS || ballPos[1] < MARGIN_TOP + BALL_RADIUS){
        ballVel[1] = -ballVel[1];
        ballPos[1] += ballVel[1];
  }
}

//Draws the ball in the board, checks for collisions with the //boundaries
function drawBall(){
   ballPos[0] += ballVel[0];
   ballPos[1] += ballVel[1];
  //Check for collision with the vertical and horizontal walls
   checkBallForCollision();
      
   canvasCtx.beginPath();
   canvasCtx.arc(ballPos[0], ballPos[1], BALL_RADIUS, 0, 3 * Math.PI, false);
   canvasCtx.fillStyle = 'grey';
   canvasCtx.fill();
   canvasCtx.lineWidth = 1;
   canvasCtx.strokeStyle = '#FF2211';
   canvasCtx.stroke();
}

function drawPaddles(){
  //Left Paddle
  canvasCtx.fillStyle = "#0000FF";
  //update the position
  leftPaddlePos[1] += leftPaddleVel[1];  
  //Check if the paddle is NOT in the board
  //If so gives a little push to inside 
  if(leftPaddlePos[1] > BOARD_HEIGHT + MARGIN_TOP - PADDLE_HEIGHT || leftPaddlePos[1] < MARGIN_TOP)   {
  leftPaddlePos[1] += -leftPaddleVel[1];  
  }
  canvasCtx.fillRect(leftPaddlePos[0], leftPaddlePos[1], BAR_WIDTH, PADDLE_HEIGHT);
  
  //Right Paddle
  canvasCtx.fillStyle = "#00FF00";
  //Update position
  rightPaddlePos[1] += rightPaddleVel[1];
  //Check if the paddle is NOT in the board
  //If so gives a little push to inside 
  if(rightPaddlePos[1] > BOARD_HEIGHT + MARGIN_TOP - PADDLE_HEIGHT || rightPaddlePos[1] < MARGIN_TOP)   {
  rightPaddlePos[1] += -rightPaddleVel[1];  
  }
  canvasCtx.fillRect(rightPaddlePos[0], rightPaddlePos[1], BAR_WIDTH, PADDLE_HEIGHT);
}

//Draw the dinamic elements of the canvas
//bars and the ball
//this method is called multiples times
function draw(){
canvasCtx = canvas[0].getContext("2d");
canvasCtx.clearRect(0,0, PAGE_WIDTH,PAGE_HEIGHT);
drawBoard(); 
drawBall();
drawPaddles();  
      requestAnimFrame(function() {
          draw();
        });
}

function drawBoard(){
canvasCtx.beginPath();
canvasCtx.lineWidth="3";
canvasCtx.strokeStyle="black";
canvasCtx.rect(MARGIN_LEFT,MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT); 
canvasCtx.stroke();
  
   canvasCtx.fillStyle = "#000000";
  var boardXCenter = (BOARD_WIDTH/2 + MARGIN_LEFT);
  //Line in the center of the canvas
  canvasCtx.fillRect(boardXCenter, MARGIN_TOP, 2, BOARD_HEIGHT);
  
  //Line in the left side
  canvasCtx.fillRect(MARGIN_LEFT + BAR_WIDTH, MARGIN_TOP, 3, BOARD_HEIGHT);
  
  //Line in the right side
  canvasCtx.fillRect(BOARD_WIDTH + MARGIN_LEFT - BAR_WIDTH, MARGIN_TOP, 3, BOARD_HEIGHT);
  canvasCtx.save();
  
}

function startNewRound(){
  //Ball in the middle with zero velocity
  ballPos = [(BOARD_WIDTH/2) + MARGIN_LEFT, (BOARD_HEIGHT/2) + MARGIN_TOP];
  ballVel = [0 , 0];
  //Paddles in their sides centers with zero velocity
  leftPaddleVel = [0, 0];
  rightPaddleVel = [0, 0];
  leftPaddlePos = [MARGIN_LEFT, MARGIN_TOP + BOARD_HEIGHT/2 +        leftPaddleVel[1] - PADDLE_HEIGHT/2];
      rightPaddlePos = [BOARD_WIDTH + MARGIN_LEFT - BAR_WIDTH,    MARGIN_TOP + BOARD_HEIGHT/2 + rightPaddleVel[1] -       PADDLE_HEIGHT/2];
  //Update the scores accordingly with the last round
  updateScores();
}

function updateScores(){
  $('#score-p1').text('' + leftPlayerScore);
  $('#score-p2').text('' + rightPlayerScore);
}

function startNewGame(){
  startNewRound();
  //Update the scores
  rightPlayerScore = leftPlayerScore = 0;
  updateScores();
  
}



function mapKeyEvents(){
    $( "body" ).keydown(function( event ) {
      //Enter or Return to roll the ball
       if ( event.which == 13 && ballVel[0] == 0) {
         ballVel[0] = Math.floor((Math.random() * 3) + 1);
         ballVel[1] = Math.floor((Math.random() * 3) + 1);
         //Random side also, go to the left or right
         if(Math.random() > 0.5){
           ballVel[0] = - ballVel[0];
         }
       }
  //Player on left
    //W key  
      if ( event.which == 87 ) {
       leftPaddleVel[1] = -PADDLE_VEL;
      }
    //S key  
      if ( event.which == 83 ) {
       leftPaddleVel[1] = PADDLE_VEL;
      }
  //Player on right
    //O key  
      if ( event.which == 79 ) {
       rightPaddleVel[1] = -PADDLE_VEL;
      }
    //L key
      if ( event.which == 76 ) {
       rightPaddleVel[1] = PADDLE_VEL;
      }
    });
  
  
  //Keyup events
  $( "body" ).keyup(function( event ) {
    //Left Paddle
     if ( event.which == 87 || event.which == 83)    {
      leftPaddleVel[1] = 0;
    }
    //Right Paddle
    if ( event.which == 79 || event.which == 76)    {
      rightPaddleVel[1] = 0;
    }
  });
}
$(document).ready(function(){
  //Set the canvas dimensions
var canvas = $("#canvas")[0];
 var scoreBoard =  $('#score-board');
 scoreBoard.css('margin-left', MARGIN_LEFT + scoreBoard.width()/2);
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;
PAGE_HEIGHT = canvas.height
drawBoard();  
window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  
      })();
  draw();
  //Keyevents
  mapKeyEvents();
  //New game listener
  $( "#new-game" ).click(function() {
  startNewGame();
    $('body').focus();
});
});


