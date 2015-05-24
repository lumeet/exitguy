canvas = document.getElementById('canvas')
figure = new Figure(canvas)
figure.setX(-50)
figure.draw()

runner = new RunMovement figure, {speed: 1, tempo: 1}, ->
  if @figure.x * 2 < canvas.width
    prop = @figure.x * 2 / canvas.width
    prop = .1 if prop < .1
    @figure.torso.leanAngle = (1 - prop) * 30 + 5
    @tempo = prop * .5 + .5

  @figure.setX(-50) if @figure.x > canvas.width + 50
  false
runner.start()
