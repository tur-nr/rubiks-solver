var map = {
  'B': 'Back',
  'D': 'Bottom',
  'F': 'Front',
  'L': 'Left',
  'R': 'Right',
  'U': 'Up',
  'B2': 'Back x2',
  'D2': 'Bottom x2',
  'F2': 'Front x2',
  'L2': 'Left x2',
  'R2': 'Right x2',
  'U2': 'Up x2',
  'B\'': 'Back Reverse',
  'D\'': 'Bottom Reverse',
  'F\'': 'Front Reverse',
  'L\'': 'Left Reverse',
  'R\'': 'Right Reverse',
  'U\'': 'Up Reverse'
};

export default function(instr) { 
  var arr = instr.split(' ');

  return arr.map(function(ins) { 
    return { text: map[ins], key: ins };
  });
};
