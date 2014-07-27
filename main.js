
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = ['veggies', 0];
var player2 = ['junkfood', 0];
var currentPlayer = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer[0]);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]

   || spaces[0] === spaces[4] && spaces[4] === spaces[8]
   || spaces[2] === spaces[4] && spaces[4] === spaces[6]
   
   || spaces[0] === spaces[3] && spaces[3] === spaces[6]
   || spaces[1] === spaces[4] && spaces[4] === spaces[7]
   || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    // TODO: Check for rest of game winning cases
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer[0]);
    currentPlayer[1]++;
    $('player1Wins').text(currentPlayer[1]);
    $('#newgame').show();
  }
};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  // Marks the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  if ((spaces[spaceNum] != player1[0]) && (spaces[spaceNum] != player2[0]) && !gameOver){
    spaces[spaceNum] = currentPlayer[0];
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer[0]);
      checkForWinner();
      setNextTurn();
  } else if (gameOver){
    alert("Game is over. Start new game.");
  } else {
    alert('That space is taken');
  }
});

$(document).on('game-win', function (e, winner) {
  alert("The winner is " + winner + "!")
  gameOver = true;
  $('player1Wins').text(winner + " wins: " + winner[1]);
  $.each(spaces, function(i, val){
    $('#board .space:eq(' + i + ')').animate({
      opacity: 0.25,
      left: "+=50",
      height: "toggle"
    }, 2000, function() {
      // Animation complete.
    });
  });
});

$(document).on('click', '#newgame', function (e){
  clear();
  setNextTurn();
})

var clear = function(){
  $.each(spaces, function(i, val){
    $('#board .space:eq(' + i + ')').animate({
      opacity: 1,
      height: "toggle"
    }, 2000, function() {
      // Animation complete.
    });
  });
  spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];
  $.each(spaces, function(i, val){
    $('#board .space:eq(' + i + ')').removeClass(player1[0]);
    $('#board .space:eq(' + i + ')').removeClass(player2[0]);
  });
  gameOver = false;
};

// Start the game
var gameOver = false;
setNextTurn();
$('#newgame').hide();
