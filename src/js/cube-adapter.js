function colorReduce(prev, curr) {
  var facelets = {
    r: 'U',
    g: 'R',
    w: 'F',
    o: 'D',
    b: 'L',
    y: 'B'
  };

  return prev + facelets[curr];
}

export default class CubeAdapter {
  constructor() {
    this.sides = {
      red: 'r'.repeat(9).split(''),
      green: 'g'.repeat(9).split(''),
      white: 'w'.repeat(9).split(''),
      orange: 'o'.repeat(9).split(''),
      blue: 'b'.repeat(9).split(''),
      yellow: 'y'.repeat(9).split('')
    };
  }

  setSide(side, colors) {
    colors[4] = side.substring(0, 1); // force middle color
    this.sides[side] = colors;
  }

  asString(front, top) {
    var state = '';

    state = this.sides.red.reduce(colorReduce, state);
    state = this.sides.green.reduce(colorReduce, state);
    state = this.sides.white.reduce(colorReduce, state);
    state = this.sides.orange.reduce(colorReduce, state);
    state = this.sides.blue.reduce(colorReduce, state);
    state = this.sides.yellow.reduce(colorReduce, state);

    return state;
  }
};
