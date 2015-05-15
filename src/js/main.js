import $ from 'jquery';
import colorDefinitions from './colorsDefinitions';
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

var cheatModeConfig = [
  ['blue', 'green', 'orange', 'red', 'blue', 'green', 'red', 'red', 'red'],
  ['blue', 'green', 'yellow', 'red', 'blue', 'green', 'orange', 'red', 'red'],
  ['blue', 'green', 'orange', 'red', 'red', 'green', 'orange', 'red', 'red'],
  ['red', 'green', 'yellow', 'red', 'blue', 'green', 'orange', 'red', 'red'],
  ['blue', 'red', 'yellow', 'red', 'blue', 'green', 'orange', 'red', 'red'],
  ['blue', 'green', 'yellow', 'red', 'blue', 'green', 'orange', 'red', 'red']
];



var doneSquareChecker = 1;


/* 3D Cube - START */
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

  $('.camera-page__save').click(getCameraGridState);

  $('.camera-page__cheat-mode').click(cheatMode);
}

function randomiser() {
  var $facebox = $('.face__box');
  $facebox.each(function() {
    $(this).removeClass('blue-square orange-square white-square red-square yellow-square green-square').addClass(colorClasses[Math.floor(Math.random() * colorClasses.length-1)]);
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
function paintFaceOnCube(face, colors) {
  var $faceSquares = getSquaresOnFace(face);
  $faceSquares.each(function(key, val) {
    $faceSquares.removeClass('blue-square orange-square white-square red-square yellow-square green-square').addClass(colors[key]);
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

/* 3D Cube - END */

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

/* Nav - START */
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

/* Nav - END */


/* Camera Grid */
function paintGridSquare(index, color) {
  $('.camera-page__grid-square:nth-child('+index+')').addClass(colorDefinitions[color]);
}

function toggleColorOnCameraGrid(gridSquare) {
  var currentColorClass = gridSquare.className;
  currentColorClass = currentColorClass.replace('camera-page__grid-square', '').trim();
  var colorIndex = colorClasses.indexOf(currentColorClass);
  var newColorIndex = colorIndex === colorClasses.length - 1 ? 0 : colorIndex + 1;
  $(gridSquare).removeClass(currentColorClass).addClass(colorClasses[newColorIndex]);
}

function setUpCameraGridSquareColorToggle() {
  $('.camera-page__grid-square').click(function() {
    toggleColorOnCameraGrid(this);
  });
}

function getCameraGridState() {
  var cameraSquares = $('.camera-page__grid-square');
  var colorsArr = [];
  for(var i=0; i<cameraSquares.length; i++) {
    var className = cameraSquares[i].className || '';
    colorsArr.push(className.replace('camera-page__grid-square', '').trim());
  }
  console.log('COLORS: ' + colorsArr);
  paintColorClassesFaceOnDoneSquare(doneSquareChecker, colorsArr);
  doneSquareChecker++;
}



/* Done squares */

function paintFaceOnDoneSquare(squareNumber, colors) {
  var doneSquare = $('.done-square')[squareNumber - 1];
  var $doneSquareFaces = $(doneSquare).find('.done-square__grid-square');

  for(var i=0; i< colors.length; i++) {
    $($doneSquareFaces[i]).addClass(colorDefinitions[colors[i]]);
  }
}

function paintColorClassesFaceOnDoneSquare(squareNumber, colors) {
  var doneSquare = $('.done-square')[squareNumber - 1];
  var $doneSquareFaces = $(doneSquare).find('.done-square__grid-square');

  for(var i=0; i< colors.length; i++) {
    $($doneSquareFaces[i]).addClass(colors[i]);
  }
}

function cheatMode() {
   for(var i=1; i<= cheatModeConfig.length; i++) {
     paintFaceOnDoneSquare(i, cheatModeConfig[i-1]);
   }
}

setUpCameraGridSquareColorToggle();
//paintFaceOnDoneSquare(1, ['blue', 'red', 'green','blue', 'red', 'green','blue', 'red', 'green']);

setUpClickEvents();
randomiser();
setMiddleSquares();

