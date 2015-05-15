import $ from 'jquery';
import colors from './colorsDefinitions';
import moves from './movesDefinitions';
import Cube from 'rcombs/Cube.js';
import CubeAdapter from './cube-adapter';
import instructions from './instructions';
//import 'mrdoob/three.js';
import tracking from 'eduardolundgren/tracking.js';

var tracker = new tracking.ColorTracker(['yellow']);

var movesArray = ['RIGHT CLOCKWISE', 'RIGHT ANTICLOCKWISE', 'LEFT CLOCKWISE', 'LEFT ANTICLOCKWISE'];

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
    if(faces.hasOwnProperty(face)) {
      var $faceSquares = getSquaresOnFace(face);
      $faceSquares.each(function (key, val) {
        if (key === 4) {
          $(val).addClass(colorClasses[i]);
        }
      });
      i++;
    }
  }
}

function setUpClickEvents() {
  $('.cube__randomise').click(randomiser);

  $('.cube__complete').click(completeCube);

  $('.landing-page__button2').click(swapPageOneForPageTwo);
}

function randomiser() {
  var $facebox = $('.face__box');
  $facebox.each(function() {
    $(this).addClass(colorClasses[Math.floor(Math.random() * colorClasses.length-1)]);
  });

  setMiddleSquares();
}

/**
 * This function sets up the listener for the cube,
 * when you click on the cube, it will rotate in the direction
 * you clicked as if you've pushed it
 */
$('.cube').mouseup(function(e) {
  transformCube(e.clientX, e.clientY);
});


function tranfromCube(x, y) {
  $('.cube').css({transform: 'rotateY('+ x +'deg) rotateX(' + y + 'deg)' });
}

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



/* This function will complete the cube by coloring all the sides the same */
function completeCube() {
  var i = 0;
  for(var face in faces) {
    if (faces.hasOwnProperty(face)) {
      var $faceSquares = getSquaresOnFace(face);
      $faceSquares.each(function () {
        $(this).removeClass('blue-square orange-square white-square red-square yellow-square green-square').addClass(colorClasses[i]);
      });
      i++;
    }
  }
  swapInstructionText('BOOM!!!');
}

function showVideo() {
  tracking.track('#camera', tracker, {camera: true});
  tracker.on('track', function(event) {
    console.log(event.data.length);
  });
}

function setUpCameraPageNextClickEvent() {
  $('.camera-page__next').click(swapPageTwoForPageThree);
}

function swapInstructionText(text) {
  $('.cube__instructions').text(text);
}

/* TEST */
function startRandomMoves() {
  setInterval(function() {
    swapInstructionText(getRandomMove() + '!!!');
    randomiser();
    tranfromCube(Math.floor(Math.random() * 360), Math.floor(Math.random() * 360));
  }, 3000);

}

function getRandomMove() {
  return movesArray[Math.floor(Math.random() * movesArray.length)];
}

/* Nav */
function swapPageOneForPageTwo() {
  $('.landing-page').hide();
  $('.camera-page').show();
  showVideo();
  setUpCameraPageNextClickEvent();
}

function swapPageTwoForPageThree() {
  $('.camera-page').hide();
  $('.loading-page').show();
  setTimeout(swapPageThreeForPageFour, 5000);
}

function swapPageThreeForPageFour() {
  $('.loading-page').hide();
  $('.solution-page').show();
  startRandomMoves()
}



setUpClickEvents();
randomiser();
setMiddleSquares();
