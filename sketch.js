// based on p5.js Gibber library by

/*
Code Liberation MoMa Sunday, February 12
http://codeliberation.org
Sketch by: Adelle lin & Saskia Freeke
*/


// fftSize must be at least 32, and a power of 2 (32,64,128,256 etc.)
var fftSize = 64 // setting buffer size
var mic;

new p5.AudioIn([errorCallback])

function setup() {
  createCanvas(windowWidth, windowHeight)
  drums = EDrums('x*')
  drums.amp = .75

  bass = FM('bass')
  .note.seq([0, 0, 0, 7, 14, 13].rnd(), [1 / 8, 1 / 16].rnd(1 / 16, 2))

  rhodes = Synth('rhodes', {
    amp: .35
  })
  .chord.seq(Rndi(0, 6, 3), 1)
  .fx.add(Delay())



  fft = FFT(fftSize)
  //fftWave = new p5.FFT();

  Gibber.scale.root.seq(['c4', 'ab3', 'bb3'], [4, 2, 2])
  Gibber.scale.mode.seq(['Minor', 'Mixolydian'], [6, 2])

  noStroke()
  colorMode(HSB, 255)

  mic = new p5.AudioIn()
  mic.start();

/*
  // testing frequency range of sketch
  a = Sine()
  a.frequency = 20000
  */

}

function draw() {
  /* background color */
  /* change in gray scale 0-255 */
  /* or RGB: background(25,200,100); */
  background(64)
  noStroke();

  /*************/
  /* Block One */
  /* Frequency text on top & mic input visuals at the bottom */

  // var spectrum = fftWave.analyze();

     // spectrum is green
  //  micLevel = mic.getLevel();
  //  micLevelScaled = micLevel*50;
  //  binSize = fftSize/2
  //  for (var i = 0; i< binSize; i++){
  //   var x = map(i, 0, binSize, 0, width);
  //   var h = -height + map(fft[i], 0, 255, height, 0);
  //   value = (fft[i] / 255) * height
  //   barColor = color((i / binSize) * 255, 255, 255, 255)
  //   fill(barColor)
  //   ellipse(x, height - value, 10 * micLevelScaled, 10)

  //   text(Math.floor(fft[i]/255 * height), x, 30);
  // }

  /* end Block One */
  /*****************/

  /*************/
  /* Block Two */
  /* Frequency bars on the right */

  // var numBars = fftSize / 2,
  // barHeight = (height - 1) / numBars,
  // barColor = null,
  // value = null

  // for (var i = 0; i < numBars; i++) {
  //   barColor = color((i / numBars) * 255, 255, 255, 255)
  //   fill(barColor)

  //   // read FFT value, which ranges from 0-255, and scale it.
  //   value = (fft[i] / 255) * width

  //   rect(0, barHeight * i, value, barHeight)

  // }

  /* end Block Two */
  /*****************/

  /*************/
  /* Block Three */
  /* Mic input right with lerp color */

   // micLevel = mic.getLevel();
   // micLevelScaled = micLevel*50;
   // binSize = fftSize/2
   // for (var i = 0; i< binSize; i++){
   //  var y = map(i, 0, binSize, 0, height);
   //  var h = -height + map(fft[i], 0, 255, height, 0);
   //  value = (fft[i] / 255) * height

   /* lerp color from one to another when micLevel changes */
  //   from = color(190, 10, 40);
  //   to = color(35, 30, 65);
  //   colorMode(RGB);
  //   c1 = lerpColor(from, to, micLevelScaled);

  //   fill(c1);
  //   ellipse(width - value - 50, y, 5 + (20 * micLevelScaled), 5 + (20 * micLevelScaled));
  // }

  /* end Block Three */
  /*****************/

  /*************/
  /* Block Four */
  /* Circle Frequency Lines */

  var radius = 200;

  micLevel = mic.getLevel();
  micLevelScaled = micLevel*50;
  binSize = fftSize/2
  for (var i = 0; i< binSize; i++){
    var nums = 360/binSize;
    var angle = radians(i*nums);
    var midX = width/2 ;
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

  /* end Block Four */
  /*****************/

  /*************/
  /* Block Five */
  /* Circle Mic */

  var radius = 200;

  micLevel = mic.getLevel();
  micLevelScaled = micLevel*50;
  binSize = fftSize/2
  for (var i = 0; i< binSize; i++){
    var nums = 360/binSize;
    var angle = radians(i*nums);
    var midX = width/2 ;
    var midY = height/2;

    var h = map(micLevelScaled, 0, 5, 0, 75);
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

  /* end Block Five */
  /*****************/



  // text(micLevelScaled, 100, 50);
  // ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height), 10, 10);
}
