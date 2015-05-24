class Leg
  constructor: (@context, @length, @width, @relativeTo) ->
    @hipAngle = 30
    @kneeAngle = 160

  draw: ->
    @context.save()
    @context.beginPath()
    [x, y] = @relativeTo()
    [kneeX, kneeY] = @kneeCoordinates(@hipAngle, x, y)
    [footX, footY] = @footPosition = @footCoordinates(@kneeAngle, @hipAngle, kneeX, kneeY)
    @context.moveTo(x, y)
    @context.lineTo(kneeX, kneeY)
    @context.lineTo(footX, footY)
    @context.lineWidth = @width
    @context.stroke()
    @context.restore()

  kneeCoordinates: (angle, x, y) ->
    angle = angle * Math.PI / 180
    length = @length * 0.6
    [x + length * Math.sin(angle), y + length * Math.cos(angle)]

  footCoordinates: (angle, hipAngle, kneeX, kneeY) ->
    angle = angle * Math.PI / 180
    hipAngle = hipAngle * Math.PI / 180
    angle = 1.5 * Math.PI - angle - hipAngle
    length = @length * 0.4
    [kneeX + length * Math.cos(angle), kneeY + length * Math.sin(angle)]
