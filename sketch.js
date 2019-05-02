var penta = 4;
var w = Math.floor(window.innerHeight / (16 + penta));
var w2 = w;
var txt;
var card;
var subcards = [];

var activeB;
var inactiveBs = [];

var blocktypes = [{
    name: "I",
    sequence: ["0000", "1100", "0000"]
  },
  {
    name: "II",
    sequence: [
      "0000",
      "1110",
      "0000"
    ]
  },
  {
    name: "III",
    sequence: [
      "0000",
      "1111",
      "0000"
    ]
  },
  {
    name: "J",
    sequence: [
      "0000",
      "1110",
      "0010"
    ]
  },
  {
    name: "L",
    sequence: [
      "0000",
      "1110",
      "1000"
    ]
  },
  {
    name: "LL",
    sequence: [
      "0000",
      "1111",
      "1000"
    ]
  },
  {
    name: "LLL",
    sequence: [
      "1111",
      "1000",
      "1000"
    ]
  },
  {
    name: "O",
    sequence: [
      "0000",
      "0100",
      "0000"
    ]
  },
  {
    name: "OO",
    sequence: [
      "1100",
      "1100",
      "0000"
    ]
  },
  {
    name: "P",
    sequence: [
      "1100",
      "111",
      "0000"
    ]
  },
  {
    name: "Q",
    sequence: [
      "0000",
      "1110",
      "1100"
    ]
  },
  {
    name: "S",
    sequence: [
      "0110",
      "1100",
      "0000"
    ]
  },
  {
    name: "SS",
    sequence: [
      "0000",
      "0111",
      "1100"
    ]
  },
  {
    name: "SSS",
    sequence: [
      "0110",
      "0100",
      "1100"
    ]
  },
  {
    name: "T",
    sequence: [
      "0000",
      "1110",
      "0100"
    ]
  },
  {
    name: "TT",
    sequence: [
      "0000",
      "1111",
      "0100"
    ]
  },
  {
    name: "U",
    sequence: [
      "0000",
      "1010",
      "1110"
    ]
  },
  {
    name: "V",
    sequence: [
      "0000",
      "0110",
      "0100"
    ]
  },
  {
    name: "VV",
    sequence: [
      "1110",
      "1000",
      "1000"
    ]
  },
  {
    name: "Z",
    sequence: [
      "1100",
      "0110",
      "0000"
    ]
  }
];

var cards = [{ // yellow(Y)=easy, green(G)=mid, blue(B)=hard, red(R)=v.hard, black(K)=extreme
    name: "1",
    penta: 3,
    difficulty: "Y",
    blocks: ["O", "T", "Z", "V", "II"]
  }, {
    name: "1'",
    penta: 3,
    difficulty: "Y",
    blocks: ["O", "I", "III", "L", "OO"]
  },
  {
    name: "2",
    penta: 3,
    difficulty: "Y",
    blocks: ["III", "O", "I", "T", "O"]
  }, {
    name: "2'",
    penta: 3,
    difficulty: "Y",
    blocks: ["II", "O", "V", "Z", "L"]
  }, {
    name: "8",
    penta: 3,
    difficulty: "G",
    blocks: ["O", "I", "V", "Z", "SS"]
  }, {
    name: "8'",
    penta: 3,
    difficulty: "G",
    blocks: ["II", "O", "I", "OO", "Q"]
  }, {
    name: "16",
    penta: 4,
    difficulty: "B",
    blocks: ["O", "III", "I", "SSS", "V", "VV"]
  }, {
    name: "16",
    penta: 4,
    difficulty: "B",
    blocks: ["S", "L", "T", "II", "OO", "O"]
  },
];

var Btypes = [""];
for (var a = 0; a < blocktypes.length; a++) {
  Btypes.push(blocktypes[a].name)
}

var activeB;
var inactiveBs = [];

function setup(diff = "") {
  createCanvas(windowWidth, windowHeight - 4, WEBGL);
  activeB = null;
  inactiveBs = [];
  switch (diff) {
    case "":
      card = random(cards);
      break;
    case "Y":
    case "G":
    case "B":
    case "R":
    case "K":
      subcards = []
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].difficulty == diff) {
          subcards.push(cards[i]);
        }
      }
      card = random(subcards);
      break;
    default:
      break;
  }

  if (card) {
    var b = []; // list of blocks to play
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].name == card.name) {
        b = cards[i].blocks;
        penta = cards[i].penta;
      }
    }
    for (var i = 0; i < b.length; i++) {
      tmp = new block;
      tmp.t = b[i];
      tmp.a = false;
      tmp.z = -tmp.w / 2
      tmp.x = (i % 2 == 0) ? 2 * tmp.w : -2 * tmp.w;
      tmp.y = (2 * i + 1) * tmp.w;
      inactiveBs.push(tmp);
    }
    activeB = inactiveBs.shift();
    activeB.a = true;
    activeB.z = 0;
  }
} // end of setup

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
}

function draw() {
  translate(0, -height / 5, 0);
  background(100);
  strokeWeight(1);
  switch (card.difficulty) {
    case "Y":
      stroke(170, 170, 20);
      break;
    case "G":
      stroke(20, 170, 20);
      break;
    case "B":
      stroke(20, 20, 170);
      break;
    case "R":
      stroke(170, 20, 20);
      break;
    case "K":
      stroke(20, 20, 20);
      break;
    default:
      stroke(150);
      break;
  }
  for (var i = 0; i < penta + 1; i++) {
    for (var j = 0; j < 5 + 1; j++) {
      line(-2.5 * w, -i * w - w / 2, -w / 2 + 1, 2.5 * w, -i * w - w / 2, -w / 2 + 1);
      line(j * w - 2.5 * w, -penta * w - w / 2, -w / 2 + 1, j * w - 2.5 * w, -w / 2, -w / 2 + 1);
    }
  }
  // fill(255, 255, 255, 0);
  // noStroke();
  // rect(-2.5 * w, -w * (penta + .5), w * 5, w * penta)

  if (activeB) {
    activeB.draw();
  }
  inactiveBs.forEach(B => B.draw())
} //end of draw

function mouseDragged() {
  activeB.x += mouseX - pmouseX;
  activeB.y += mouseY - pmouseY;
}

function mouseReleased() {
  if (mouseButton === CENTER) {
    if (activeB) {
      activeB.fix();
    } else {
      activeB = inactiveBs.shift();
      activeB.a = true;
      activeB.z = 0;
    }
  } else {
    if ((activeB.x == round(activeB.x / w) * w) && (activeB.y == round(activeB.y / w) * w)) {
      activeB.rot(1);
    } else {
      activeB.x = round(activeB.x / w) * w;
      activeB.y = round(activeB.y / w) * w;
    }
  }
}

function mouseWheel(event) { // number of scrolls --> event.delta
  if (activeB) {
    activeB.scroll(event.delta)
  } else {
    activeB = inactiveBs.shift();
    activeB.a = true;
    activeB.z = activeB.w / 2;
  }
  return false; //comment to allow page scrolling
}

function keyPressed() {
  switch (keyCode) {
    case ENTER:
      activeB.fix();
      break;
    case 32: //spacebar
      if (activeB) {
        activeB.flip();
      }
      break;
    case ESCAPE:
      if (activeB) {
        activeB.teleport();
      }
      break;
    case SHIFT: // scroll through pieces
      if (activeB) {
        activeB.rot();
      }
      break;
    case BACKSPACE:
      if (activeB) {
        activeB.flip();
      }
      break;
    case UP_ARROW:
      if (activeB) {
        activeB.move(0, -1, 0);
      }
      break;
    case DOWN_ARROW:
      if (activeB) {
        activeB.move(0, 1, 0);
      }
      break;
    case LEFT_ARROW:
      if (activeB) {
        activeB.move(-1, 0, 0);
      }
      break;
    case RIGHT_ARROW:
      if (activeB) {
        activeB.move(1, 0, 0);
      }
      break;
    case 187: // key 'equal' moves up
      if (activeB) {
        activeB.move(0, 0, -1);
      }
      break;
    case 189: // key 'dash' moves down
      if (activeB) {
        activeB.move(0, 0, 1);
      }
      break;
    default:
      break;
  }
}

function keyTyped() {
  var letter = key.toUpperCase();
  switch (key) {
    case "i":
    case "l":
    case "s":
      if (activeB) {
        switch (activeB.t) {
          case letter:
            activeB.t = letter + letter;
            break;
          case letter + letter:
            activeB.t = letter + letter + letter;
            break;
          default:
            activeB.t = letter;
            break;
        }
      } else {
        activeB = new block;
        activeB.t = letter;
      }
      break;
    case "j":
      if (activeB) {
        if (activeB.t == "J") {
          activeB.t = "LL";
        } else {
          activeB.t = "J";
        }
      } else {
        activeB = new block;
        activeB.t = letter;
      }
      break;
    case "o":
    case "t":
    case "v":
      if (activeB) {
        switch (activeB.t) {
          case letter:
            activeB.t = letter + letter;
            break;
          default:
            activeB.t = letter;
            break;
        }
      } else {
        activeB = new block;
        activeB.t = letter;
      }
      break;
    case "p":
    case "q":
    case "u":
    case "z":
      if (activeB) {
        activeB.t = letter;
      } else {
        activeB = new block;
        activeB.t = letter;
      }
      break;
    case "3":
    case "4":
    case "5":
    case "6":
      penta = parseInt(key);
      break;
    case "y":
    case "g":
    case "b":
    case "r":
    case "k":
      setup(letter);
      break;
    case "1":
      w += 5;
      w2 = w;
      activeB.w = w;
      for (var i = 0; i < inactiveBs.length; i++) {
        inactiveBs[i].w = w;
      }
      break;
    case "2":
      w -= 5;
      w2 = w;
      activeB.w = w;
      for (var i = 0; i < inactiveBs.length; i++) {
        inactiveBs[i].w = w;
      }
      break;
    default:
      3
      break;
  }
}

class block {
  constructor(t = random(Btypes), w = w2, x = 0, y = -3, z = 0, r = 0, f = false, a = true) {
    this.w = w;
    this.x = this.w * x; // (-)left-right(+)
    this.y = this.w * -y; // (-)down-up(+)
    this.z = 0; // (-)back-front(+)
    this.r = r; // 0=0°, 1=90°, 2=180°, 3=270°
    this.a = a; // true=active 
    this.f = f; // true=flipped
    this.t = (isNaN(t) ? t : Btypes[t]); // Btypes I,II,III,J,L,LL,LLL,O,OO,P,Q,S,SS,SSS,T,U,V,VV,Z
    // Type I    : [+][ ]               // Type S*   :    [+][ ]
    // Type II   : [ ][+][ ]            //             [ ][ ]
    // Type III* : [ ][+][ ][ ]         // Type SS   :       [ ][ ]
    // Type J*   : [ ][+][ ]            //             [ ][ ][+]
    //  L-mirror         [ ]            // Type SSS  :    [ ][ ]
    // Type L*   : [ ][+][ ]            //                [+]
    //             [ ]                  //             [ ][ ]
    // Type LL   : [ ][+][ ][ ]         // Type T*   : [ ][+][ ]
    //             [ ]                  //                [ ]
    // Type LLL  : [ ][ ][ ][ ]         // Type TT   : [ ][+][ ][ ]
    //             [ ] +                //                [ ]
    //             [ ]                  // Type U    : [ ] + [ ]
    // Type O    : [+]                  //             [ ][ ][ ]
    // Type OO*  : [+][ ]               // Type V    : [+][ ]
    //             [ ][ ]               //             [ ]
    // Type P    : [ ][ ]               // Type VV   : [ ][ ][ ]
    //             [ ][+][ ]            //             [ ] +
    // Type Q    : [ ][+][ ]            //             [ ]
    //  P-mirror   [ ][ ]               // Type Z    : [ ][+]
    //                                  //  S-mirror      [ ][ ]
    // + : rotation center=origin
    // * : base tetris
    // Model     : [ ][ ][ ][ ]
    //             [ ][+][ ][ ]        + always at position (1,1)
    //             [ ][ ][ ][ ]    
  }
  move(x = 0, y = 0, z = 0, r = 0) {
    this.x += x * this.w;
    this.y += y * this.w;
    this.z += z * this.w;
  }
  rot(r = 0) {
    this.r += r;
    this.f = ((floor(this.r / 4)) % 2 == 0)
  }
  flip() {
    this.f = !this.f;
  }
  fix() {
    this.z = 0;
    this.a = false;
    this.scroll(1);
  }
  reset() {
    inactiveBs = [];
    var t = window.prompt(Btypes.join()).toUpperCase();
  }
  teleport() {
    this.x = 0;
    this.y = 3 * (this.w);
    this.z = 0;
    this.r = 0;
  }
  scroll(sign) {
    this.a = false;
    if (sign >= 0) {
      inactiveBs.push(activeB);
      activeB = inactiveBs.shift();
    } else {
      inactiveBs.unshift(activeB);
      activeB = inactiveBs.pop();
    }
    activeB.a = true;
    activeB.z = 0;
  }
  col() { // color according to type
    var n = Btypes.indexOf(this.t);
    let d = 20;
    let p = 3;
    let h = floor((255 - d * 2) / p);
    let i = floor(n / 3 / 3);
    let j = floor(n / 3) % 3;
    let k = n % 3;
    let alpha = (this.a ? 60 : 255);
    return color(d + i * h, d + j * h, d + k * h, alpha);
  }
  draw() {
    push();
    strokeWeight(2);
    stroke(5); // stroke(this.col());
    fill(this.col())
    translate(this.x, this.y, this.z);
    rotateZ(this.r * HALF_PI);
    if (this.f) {
      rotateX(PI)
    };
    translate(-this.w, -this.w, 0);
    var seq = this.getSequence();
    if (seq) {
      for (var i = 0; i < seq.length; i++) {
        for (var j = 0; j < seq[i].length; j++) {
          if (seq[i][j] == "1") {
            box(this.w);
          }
          translate(this.w, 0, 0);
        }
        translate(-seq[0].length * this.w, this.w, 0);
      }
    }
    pop();
  }
  getSequence() {
    for (var a = 0; a < blocktypes.length; a++) {
      if (blocktypes[a].name == this.t) {
        var seq = blocktypes[a].sequence
      }
    }
    return seq;
  }
  nbCubes() {
    var seq = this.getSequence();
    var sum = 0;
    if (seq) {
      for (var i = 0; i < seq.length; i++) {
        for (var j = 0; j < seq[i].length; j++) {
          sum += parseInt(seq[i][j]);
        }
      }
    }
    return sum;
  }
}