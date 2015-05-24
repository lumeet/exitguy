window.requestAnimFrame = ( ->
  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
       window.mozRequestAnimationFrame ||
         (callback) -> window.setTimeout(callback, 1000 / 60)
)()

class RunMovement
  constructor: (@figure, options = {}, @stopCallback) ->
    {@tempo, @speed} = options
    @speed ?= 1
    @tempo ?= 1
    @phases = [
      [0,   180, 0, 90, 3 - @tempo * 2]
      [-30, 180, 45, 40, 3 - @tempo * 2]
      [0, (1 - @tempo) * 120, 0, 90 + 30 * @tempo, 3 - @tempo * 2]
      [10 + 80 * @tempo, 70 + (20 * @tempo), -45, 90, 3 - @tempo * 2]
    ]
    @curPhase0 = 1
    @curPhase1 = 3
    @curFrame = 0
    @maxFrameCount = 7 / @speed

  init: ->
    half = @phases.length / 2
    @legs(0).hipAngle = @phases[0][0]
    @legs(0).kneeAngle = @phases[0][1]
    @legs(1).hipAngle = @phases[half][0]
    @legs(1).kneeAngle = @phases[half][1]
    @arms(0).shoulderAngle = @phases[0][2]
    @arms(0).elbowAngle = @phases[0][3]
    @arms(1).shoulderAngle = @phases[half][2]
    @arms(1).elbowAngle = @phases[half][3]

  start: ->
    @init()
    @move()

  move: ->
    @update()
    @figure.hide()
    @figure.draw()
    requestAnimFrame(@move.bind(this)) unless @shouldStop()

  shouldStop: ->
    if @stopCallback? then @stopCallback.call(this) else false

  legs: (index) -> @figure.legs[index]
  
  arms: (index) -> @figure.arms[index]

  update: ->
    @frameCount ?= Math.ceil(@phases[@curPhase0][4] * @maxFrameCount)
    @xIncr ?= @speed * 10 / @phases[@curPhase0][4] * @tempo * @figure.scale
    @figure.x += @xIncr
    @figure.torso.move(@xIncr, 0)

    @updateLimbs()
    @curFrame += 1

    @changePhase() if @curFrame == @frameCount
      
  changePhase: ->
    @frameCount = null
    @xIncr = null
    @curPhase0 += 1
    @curPhase0 = 0 if @curPhase0 == 4
    @curPhase1 += 1
    @curPhase1 = 0 if @curPhase1 == 4
    @curFrame = 0
  
  updateLimbs: ->
    @updateLeg(@legs(0), @curPhase0)
    @updateLeg(@legs(1), @curPhase1)
    @updateArm(@arms(0), @curPhase0)
    @updateArm(@arms(1), @curPhase1)

  updateLeg: (leg, phase) ->
    prevPhase = if phase == 0 then @phases.length - 1 else phase - 1
    hipIncrement = (@phases[phase][0] - @phases[prevPhase][0]) / @frameCount
    kneeIncrement = (@phases[phase][1] - @phases[prevPhase][1]) / @frameCount
    leg.hipAngle += hipIncrement
    leg.kneeAngle += kneeIncrement
    
  updateArm: (arm, phase) ->
    prevPhase = if phase == 0 then @phases.length - 1 else phase - 1
    shoulderIncrement = (@phases[phase][2] - @phases[prevPhase][2]) / @frameCount
    elbowIncrement = (@phases[phase][3] - @phases[prevPhase][3]) / @frameCount
    arm.shoulderAngle += shoulderIncrement
    arm.elbowAngle += elbowIncrement
