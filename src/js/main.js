import $ from 'jquery';
import colors from './colorsDefinitions';
import Cube from 'akheron/cubejs/lib/cube';
import 'akheron/cubejs/lib/solve';
import CubeAdapter from './cube-adapter';
import instructions from './instructions';

window.Cube = Cube;
window.CubeAdapter = CubeAdapter;
window.instructions = instructions;

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

$('.cube__randomise').click(randomiser);

$('.cube__complete').click(completeCube);

$('.landing-page__button2').click(swapPageOneForPageTwo);



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
}


randomiser();
setMiddleSquares();


function showVideo() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  var video = $('.camera-page__webcam')[0];
  var hdConstraints = {
    video: {
      mandatory: {
        minWidth: 425,
        minHeight: 425
      }
    }
  };

  navigator.getUserMedia(hdConstraints, function(stream) {
    video.src = window.URL.createObjectURL(stream);
  }, function(err) {
    console.log(err);
  });

  video.play();

}

function setUpCameraNext() {
  $('.camera-page__next').click(swapPageTwoForPageThree);
}


/* Nav */
function swapPageOneForPageTwo() {
  $('.landing-page').hide();
  $('.camera-page').show();
  showVideo();
  setUpCameraNext();
}

function swapPageTwoForPageThree() {
  $('.camera-page').hide();
  $('.loading-page').show();
  setTimeout(function() {
    $('.loading-page').hide();
    $('.solution-page').show();
  }, 5000);
}