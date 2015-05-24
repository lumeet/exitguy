class Arm
  constructor: (@context, @length, @width, @relativeTo) ->
    @shoulderAngle = 45
    @elbowAngle = 180

  draw: ->
    @context.save()
    @context.beginPath()
    [x, y, leanAngle] = @relativeTo()
    [elbowX, elbowY] = @elbowCoordinates(@shoulderAngle, leanAngle, x, y)
    [handX, handY] = @handCoordinates(@elbowAngle, @shoulderAngle, elbowX, elbowY)
    @context.moveTo(x, y)
    @context.lineTo(elbowX, elbowY)
    @context.lineTo(handX, handY)
    @context.lineWidth = @width
    @context.stroke()
    @context.restore()

  elbowCoordinates: (angle, leanAngle, x, y) ->
    angle = (angle - leanAngle) * Math.PI / 180
    length = @length * 0.6
    [x + length * Math.sin(angle), y + length * Math.cos(angle)]

  handCoordinates: (angle, shoulderAngle, elbowX, elbowY) ->
    angle = angle * Math.PI / 180
    shoulderAngle = shoulderAngle * Math.PI / 180
    angle = 0.5 * Math.PI + angle - shoulderAngle
    length = @length * 0.4
    [elbowX - length * Math.cos(angle), elbowY - length * Math.sin(angle)]
