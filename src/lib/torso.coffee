class Torso
  constructor: (@context, @length, @width, @x = 0, @y = 0) ->
    @leanAngle = 0
    @neckPosition = [@x, @y - @length]
    @hipPosition = [@x, @y]

  draw: ->
    @context.save()
    @context.beginPath()
    [x, y] = @neckPosition = @neckCoordinates()
    @context.moveTo(x, y)
    @hipPosition = [@x, @y]
    @context.lineTo(@x, @y)
    @context.lineWidth = @width
    @context.stroke()
    @context.restore()

  neckCoordinates: ->
    angle = @leanAngle * Math.PI / 180
    [@x + @length * Math.sin(angle), @y - @length * (Math.cos(angle))]

  move: (x, y) ->
    @x += x
    @y += y
