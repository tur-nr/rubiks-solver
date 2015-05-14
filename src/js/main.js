import colors from './colors';

var colorClasses = ['blue-square', 'orange-square', 'white-square', 'red-square', 'yellow-square', 'green-square'];

var faces = {
  front: '.cube-face-front',
  back: '.cube-face-back',
  left: '.cube-face-left',
  right: '.cube-face-right',
  top: '.cube-face-top',
  bottom: '.cube-face-bottom'
};

function setMiddleSquares() {
  var i = 0;
  for(var face in faces) {
    var $faceSquares = getSquaresOnFace(face);
    $faceSquares.each(function(key, val) {
      if(key === 4) {
        $(val).addClass(colorClasses[i]);
      }
    });
    i++;
  }
}

$('.randomise').click(randomiser);

$('.complete').click(completeCube);

function randomiser() {
  var $facebox = $('.face__box');
  $facebox.each(function() {
    $(this).addClass(colorClasses[Math.floor(Math.random() * colorClasses.length)]);
  });

  setMiddleSquares();
}

/**
 * This function sets up the listener for the cube,
 * when you click on the cube, it will rotate in the direction
 * you clicked as if you've pushed it
 */
$('.cube').mouseup(function(e) {
  $('.cube').css({transform: 'rotateY('+e.clientX+'deg) rotateX(' + e.clientY + 'deg)' });
});

randomiser();
setMiddleSquares();



/**
 * This function paints the given face of the cube
 *
 * @param: face 'string' - front/back/left...
 * @param: colors 'array of strings: 9' - ['blue', 'green']
 */
function paintFace(face, colors) {
  var $faceSquares = getSquaresOnFace(face);
  $faceSquares.each(function(key, val) {
    $faceSquares.addClass(colors[key]);
  });
}

/**
 * This function returns a bunch of jquery wrapped
 * square for a given face
 *
 * @param face 'String' - front/back/left/right
 */
function getSquaresOnFace(face) {
  var faceClass = faces[face];
  return $(faceClass).find('.face__box');
}

function completeCube() {
  var i = 0;
  for(var face in faces) {
    var $faceSquares = getSquaresOnFace(face);
    $faceSquares.each(function() {
      $(this).removeClass('blue-square orange-square white-square red-square yellow-square green-square').addClass(colorClasses[i]);
    });
    i++;
  }
}