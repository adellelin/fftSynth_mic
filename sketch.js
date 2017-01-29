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
  background(64)


  //var spectrum = fftWave.analyze();
  noStroke();
   // spectrum is green
  micLevel = mic.getLevel();
  micLevelScaled = micLevel*50;
  binSize = fftSize/2
  for (var i = 0; i< binSize; i++){
    var x = map(i, 0, binSize, 0, width);
    var h = -height + map(fft[i], 0, 255, height, 0);
    value = (fft[i] / 255) * height
    barColor = color((i / binSize) * 255, 255, 255, 255)
    fill(barColor)
    ellipse(x, height - value, 10 * micLevelScaled, 10)


    text(Math.floor(fft[i]/255 * height), x, 30);
  }
  text(micLevelScaled, 100, 50);
/*
  var numBars = fftSize / 2,
    barHeight = (height - 1) / numBars,
    barColor = null,
    value = null

  for (var i = 0; i < numBars; i++) {
    barColor = color((i / numBars) * 255, 255, 255, 255)
    fill(barColor)

    // read FFT value, which ranges from 0-255, and scale it.
    value = (fft[i] / 255) * width

    rect(0, barHeight * i, value, barHeight)


  }
  */

  //ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height), 10, 10);
}
