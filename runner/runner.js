var canvas, figure, runner;

canvas = document.getElementById('canvas');

figure = new Figure(canvas);

figure.setX(-50);

figure.draw();

runner = new RunMovement(figure, {
  speed: 1,
  tempo: 1
}, function() {
  var prop;
  if (this.figure.x * 2 < canvas.width) {
    prop = this.figure.x * 2 / canvas.width;
    if (prop < .1) {
      prop = .1;
    }
    this.figure.torso.leanAngle = (1 - prop) * 30 + 5;
    this.tempo = prop * .5 + .5;
  }
  if (this.figure.x > canvas.width + 50) {
    this.figure.setX(-50);
  }
  return false;
});

runner.start();
