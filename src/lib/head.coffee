class Head
  constructor: (@context, @radius, @relativeTo) ->

  draw: ->
    @context.beginPath()
    [x, y] = @relativeTo()
    @context.arc(x, y, @radius, 0, Math.PI * 2, true)
    @context.fill()
