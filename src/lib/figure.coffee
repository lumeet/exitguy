class Figure
  constructor: (@canvas) ->
    @context = @canvas.getContext('2d')
    @scale = 1
    @x = 0
    @y = 100 * @scale
    @torso = new Torso(@context, 30 * @scale, 14 * @scale, @x, @y)
    @torso.leanAngle = 5
    @head = new Head @context, 10 * @scale, =>
      angle = @torso.leanAngle * Math.PI / 180
      length = @torso.length + @head.radius * 2
      [@x + length * Math.sin(angle), @y - length * Math.cos(angle)]

    @legs = [
      new Leg @context, 50 * @scale, 10 * @scale, => [@x, @y]
      new Leg @context, 50 * @scale, 10 * @scale, => [@x, @y]
    ]

    @arms = [
      new Arm @context, 40 * @scale, 10 * @scale, => @torso.neckPosition.concat([@torso.leanAngle])
      new Arm @context, 40 * @scale, 10 * @scale, => @torso.neckPosition.concat([@torso.leanAngle])
    ]

  setX: (x) ->
    @x = x
    @torso.x = x

  draw: ->
    @context.fillStyle = 'black'
    @context.strokeStyle = 'black'
    @context.lineCap = 'round'
    @context.lineJoin = 'round'
    @torso.draw()
    @head.draw()
    @legs[0].draw()
    @legs[1].draw()
    @arms[0].draw()
    @arms[1].draw()

  hide: ->
    @context.clearRect(0, 0, @canvas.width, @canvas.height)
