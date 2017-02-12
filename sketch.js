/*
Code Liberation MoMa Sunday, February 12
http://codeliberation.org
Sketch by: Adelle lin & Saskia Freeke
based on p5.js Gibber library by Charlie Roberts
*/

// fftSize must be at least 32, and a power of 2 (32,64,128,256 etc.)
var fftSize = 64 // setting buffer size
var mic;
var binSize = fftSize/2; // The actual size of the FFT buffer is twice the number of bins
var micLevel;
var micLevelScaled;

new p5.AudioIn([errorCallback])

function setup() {
  createCanvas(windowWidth, windowHeight)

  // wave = Sine();
  // wave.Frequency.seq( [220], 1/4 )
  // wave.amp = .25
  // wave2 = Sine();
  // wave2.Frequency.seq( [660, 440], 1/4 )
  // wave2.amp = .25

  // wave3 = Sine();
  // wave3.Frequency.seq( [220,440,880,1760,], 1/8 )
  //wave3.amp = .25

  /* x's represent kick drum hits, o's represent snares, and - represent hihats. */
  //drums = EDrums('x*')
  //drums = EDrums('x*--')
  // drums = EDrums('x*ox*xo-')
  // drums.amp = .75
  //
  // bass = FM('bass')
  // .note.seq([0, 0, 0, 7, 14, 13].rnd(), [1 / 8, 1 / 16].rnd(1/16,2))

 // The Synth class has four presets: short, bleep, rhodes and calvin

  // rhodes = Synth('rhodes', {
  //   amp: .35
  // })
  // //.chord([0,2,4])
  // .chord.seq(Rndi(0, 6, 3), 1) // with a constant rythm
  // //.chord.seq(Rndi(0, 6, 3, 4), [1, 1, 1/2, 1/2]) // varying the rythm
  // .fx.add(Delay())

  // rhodes = Synth('calvin', {
  //   amp: .35
  // })
  // .chord.seq(Rndi(4, 0, 2), 1)
  //  .fx.add(Reverb())

  fft = FFT(fftSize)

  Gibber.scale.root.seq(['c4', 'ab3', 'bb3'], [4, 2, 2])
  Gibber.scale.mode.seq(['Minor', 'Mixolydian'], [6, 2])
  //Gibber.scale.mode.seq(['Major', 'Chromatic'], [6, 2])

  noStroke()
  colorMode(HSB, 255)

  mic = new p5.AudioIn()
  mic.start();

}

function draw() {
  /* background color */
  /* change in gray scale 0-255 */
  /* or RGB: background(25,200,100); */
  background(64)
  noStroke();
  micLevel = mic.getLevel();
  micLevelScaled = micLevel*50;
  ellipse(width/2, height/2, 100 * micLevelScaled, 100 * micLevelScaled)

  // freqReadout();
  // freqBars();
  // freqCircles();
  // freqSpiral();
  // micCircle();

}

function freqReadout() {

  /* Frequency text on top & mic input visuals at the bottom */


   textSize(10);

   for (var i = 0; i< binSize; i++){
    var x = map(i, 0, binSize, 0, width);
    var h = -height + map(fft[i], 0, 255, height, 0);
    value = (fft[i] / 255) * height
    barColor = color((i / binSize) * 255, 255, 255, 255)
    fill(barColor)
    ellipse(x+15, height - value - 30, 10 * micLevelScaled, 10 * micLevelScaled)
    text("mic level  " + Math.floor(micLevel*1000), width-100, 60)
    text(Math.floor(fft[i]/255 * height), x+15, 30);
  }

}

function freqBars() {

    /* Frequency bars on the right */

    barHeight = (height - 1) / binSize,
    barColor = null,
    value = null

    for (var i = 0; i < binSize; i++) {
      barColor = color((i / binSize) * 255, 255, 255, 255 * micLevel)
      fill(barColor)

      // read FFT value, which ranges from 0-255, and scale it.
      value = (fft[i] / 255) * width

      rect(0, barHeight * i, value, barHeight * 3/4)
    }

}

function freqCircles() {

    /* Mic input right with lerp color */

    micLevelScaled = micLevel*10;
     for (var i = 0; i< binSize; i++){
      var y = map(i, 0, binSize, 0, height);
      var h = -height + map(fft[i], 0, 255, height, 0);
      value = (fft[i] / 255) * height

     /* lerp color from one to another when micLevel changes */
      from = color(190, 10, 40);
      to = color(35, 30, 65);
      colorMode(RGB);
      c1 = lerpColor(from, to, micLevelScaled);

      fill(c1);
      ellipse(width - value - 50, y, 5 + (20 * micLevelScaled), 5 + (20 * micLevelScaled));
    }

}

function freqSpiral() {
  /* Circle Frequency Lines */

  var radius = 200;

  for (var i = 0; i< binSize; i++){
    var nums = 360/binSize;
    var angle = radians(i*nums); // denotes points around a circle
    var midX = width/2 ; // center of the circle in the center of the screen
    var midY = height/2;

    var h = map(fft[i], 0, 255, 0, 125);
    var xPos = midX + (cos(angle) * (radius/2));
    var yPos = midY + (sin(angle) * (radius/2));
    var xPosTo = midX + (cos(angle) * (radius+h));
    var yPosTo = midY + (sin(angle) * (radius+h));

    /* lerp color */
    from = color(190, 10, 40);
    to = color(35, 30, 65);
    colorMode(RGB);
    c1 = lerpColor(from, to, i/10);

    stroke(c1);
    strokeWeight(2);
    line(xPos, yPos, xPosTo, yPosTo);
    noStroke();
  }
}

function micCircle() {
  /* Circle Mic */

  var radius = 200;

  for (var i = 0; i< binSize; i++){
    var nums = 360/binSize;
    var angle = radians(i*nums);
    var midX = width/2 ;
    var midY = height/2;

    var h = map(micLevelScaled, 0, 5, 0, 125);
    //var h = map(fft[i], 0, 255, 0, 125);
    var xPos = midX + (cos(angle) * (radius+h));
    var yPos = midY + (sin(angle) * (radius+h));

    /* lerp color from one to another when micLevel changes */
    from = color(190, 10, 40);
    to = color(35, 30, 65);
    colorMode(RGB);
    c1 = lerpColor(from, to, micLevelScaled);

    fill(c1);
    ellipse(xPos, yPos , 5 + (10 * micLevelScaled), 5 + (10 * micLevelScaled));
  }

}
