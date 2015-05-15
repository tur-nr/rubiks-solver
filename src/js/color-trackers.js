function hue(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var hue = 0;

  switch (max) {
    case r: hue = (g - b) / (max - min); break;
    case g: hue = 2.0 + (b - r) / (max - min); break;
    case b: hue = 4.0 + (r - g) / (max - min); break
  }

  hue = hue * 60;

  if (hue < 0) hue = hue + 360;

  return Math.ceil(hue);
}

export default { red, orange, green, blue, white };

export function red(r, g, b) {
  var h = hue(r, g, b);
  return h <= 20 || h >= 340;
};

export function orange(r, g, b) {
  var h = hue(r, g, b);
  return h > 20 && h <= 40;
};

export function green(r, g, b) {
  var threshold = 50,
    dx = r - 0,
    dy = g - 255,
    dz = b - 0;

  if ((g - r) >= threshold && (r - b) >= threshold) {
    return true;
  }

  return dx * dx + dy * dy + dz * dz < 30000;
};

export function blue(r, g, b) {
  var threshold = 50,
  dx = r-0 ,
  dy = g-0,
  dz = b-255;

  if ((b - g) >= threshold && (g - r) >= threshold) {
    return true;
  }

  return (dx*dx + dy*dy + dz*dz) < 35000;
};

export function white(r, g, b) {
  var color = new Color({r, g, b});
  return color.whiteness() >= 90;
};
