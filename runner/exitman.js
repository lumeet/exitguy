var Arm;

Arm = (function() {
  function Arm(context, length1, width, relativeTo) {
    this.context = context;
    this.length = length1;
    this.width = width;
    this.relativeTo = relativeTo;
    this.shoulderAngle = 45;
    this.elbowAngle = 180;
  }

  Arm.prototype.draw = function() {
    var elbowX, elbowY, handX, handY, leanAngle, ref, ref1, ref2, x, y;
    this.context.save();
    this.context.beginPath();
    ref = this.relativeTo(), x = ref[0], y = ref[1], leanAngle = ref[2];
    ref1 = this.elbowCoordinates(this.shoulderAngle, leanAngle, x, y), elbowX = ref1[0], elbowY = ref1[1];
    ref2 = this.handCoordinates(this.elbowAngle, this.shoulderAngle, elbowX, elbowY), handX = ref2[0], handY = ref2[1];
    this.context.moveTo(x, y);
    this.context.lineTo(elbowX, elbowY);
    this.context.lineTo(handX, handY);
    this.context.lineWidth = this.width;
    this.context.stroke();
    return this.context.restore();
  };

  Arm.prototype.elbowCoordinates = function(angle, leanAngle, x, y) {
    var length;
    angle = (angle - leanAngle) * Math.PI / 180;
    length = this.length * 0.6;
    return [x + length * Math.sin(angle), y + length * Math.cos(angle)];
  };

  Arm.prototype.handCoordinates = function(angle, shoulderAngle, elbowX, elbowY) {
    var length;
    angle = angle * Math.PI / 180;
    shoulderAngle = shoulderAngle * Math.PI / 180;
    angle = 0.5 * Math.PI + angle - shoulderAngle;
    length = this.length * 0.4;
    return [elbowX - length * Math.cos(angle), elbowY - length * Math.sin(angle)];
  };

  return Arm;

})();

var Figure;

Figure = (function() {
  function Figure(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.scale = 1;
    this.x = 0;
    this.y = 100 * this.scale;
    this.torso = new Torso(this.context, 30 * this.scale, 14 * this.scale, this.x, this.y);
    this.torso.leanAngle = 5;
    this.head = new Head(this.context, 10 * this.scale, (function(_this) {
      return function() {
        var angle, length;
        angle = _this.torso.leanAngle * Math.PI / 180;
        length = _this.torso.length + _this.head.radius * 2;
        return [_this.x + length * Math.sin(angle), _this.y - length * Math.cos(angle)];
      };
    })(this));
    this.legs = [
      new Leg(this.context, 50 * this.scale, 10 * this.scale, (function(_this) {
        return function() {
          return [_this.x, _this.y];
        };
      })(this)), new Leg(this.context, 50 * this.scale, 10 * this.scale, (function(_this) {
        return function() {
          return [_this.x, _this.y];
        };
      })(this))
    ];
    this.arms = [
      new Arm(this.context, 40 * this.scale, 10 * this.scale, (function(_this) {
        return function() {
          return _this.torso.neckPosition.concat([_this.torso.leanAngle]);
        };
      })(this)), new Arm(this.context, 40 * this.scale, 10 * this.scale, (function(_this) {
        return function() {
          return _this.torso.neckPosition.concat([_this.torso.leanAngle]);
        };
      })(this))
    ];
  }

  Figure.prototype.setX = function(x) {
    this.x = x;
    return this.torso.x = x;
  };

  Figure.prototype.draw = function() {
    this.context.fillStyle = 'black';
    this.context.strokeStyle = 'black';
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.torso.draw();
    this.head.draw();
    this.legs[0].draw();
    this.legs[1].draw();
    this.arms[0].draw();
    return this.arms[1].draw();
  };

  Figure.prototype.hide = function() {
    return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  return Figure;

})();

var Head;

Head = (function() {
  function Head(context, radius, relativeTo) {
    this.context = context;
    this.radius = radius;
    this.relativeTo = relativeTo;
  }

  Head.prototype.draw = function() {
    var ref, x, y;
    this.context.beginPath();
    ref = this.relativeTo(), x = ref[0], y = ref[1];
    this.context.arc(x, y, this.radius, 0, Math.PI * 2, true);
    return this.context.fill();
  };

  return Head;

})();

var Leg;

Leg = (function() {
  function Leg(context, length1, width, relativeTo) {
    this.context = context;
    this.length = length1;
    this.width = width;
    this.relativeTo = relativeTo;
    this.hipAngle = 30;
    this.kneeAngle = 160;
  }

  Leg.prototype.draw = function() {
    var footX, footY, kneeX, kneeY, ref, ref1, ref2, x, y;
    this.context.save();
    this.context.beginPath();
    ref = this.relativeTo(), x = ref[0], y = ref[1];
    ref1 = this.kneeCoordinates(this.hipAngle, x, y), kneeX = ref1[0], kneeY = ref1[1];
    ref2 = this.footPosition = this.footCoordinates(this.kneeAngle, this.hipAngle, kneeX, kneeY), footX = ref2[0], footY = ref2[1];
    this.context.moveTo(x, y);
    this.context.lineTo(kneeX, kneeY);
    this.context.lineTo(footX, footY);
    this.context.lineWidth = this.width;
    this.context.stroke();
    return this.context.restore();
  };

  Leg.prototype.kneeCoordinates = function(angle, x, y) {
    var length;
    angle = angle * Math.PI / 180;
    length = this.length * 0.6;
    return [x + length * Math.sin(angle), y + length * Math.cos(angle)];
  };

  Leg.prototype.footCoordinates = function(angle, hipAngle, kneeX, kneeY) {
    var length;
    angle = angle * Math.PI / 180;
    hipAngle = hipAngle * Math.PI / 180;
    angle = 1.5 * Math.PI - angle - hipAngle;
    length = this.length * 0.4;
    return [kneeX + length * Math.cos(angle), kneeY + length * Math.sin(angle)];
  };

  return Leg;

})();

var RunMovement;

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
})();

RunMovement = (function() {
  function RunMovement(figure, options, stopCallback) {
    this.figure = figure;
    if (options == null) {
      options = {};
    }
    this.stopCallback = stopCallback;
    this.tempo = options.tempo, this.speed = options.speed;
    if (this.speed == null) {
      this.speed = 1;
    }
    if (this.tempo == null) {
      this.tempo = 1;
    }
    this.phases = [[0, 180, 0, 90, 3 - this.tempo * 2], [-30, 180, 45, 40, 3 - this.tempo * 2], [0, (1 - this.tempo) * 120, 0, 90 + 30 * this.tempo, 3 - this.tempo * 2], [10 + 80 * this.tempo, 70 + (20 * this.tempo), -45, 90, 3 - this.tempo * 2]];
    this.curPhase0 = 1;
    this.curPhase1 = 3;
    this.curFrame = 0;
    this.maxFrameCount = 7 / this.speed;
  }

  RunMovement.prototype.init = function() {
    var half;
    half = this.phases.length / 2;
    this.legs(0).hipAngle = this.phases[0][0];
    this.legs(0).kneeAngle = this.phases[0][1];
    this.legs(1).hipAngle = this.phases[half][0];
    this.legs(1).kneeAngle = this.phases[half][1];
    this.arms(0).shoulderAngle = this.phases[0][2];
    this.arms(0).elbowAngle = this.phases[0][3];
    this.arms(1).shoulderAngle = this.phases[half][2];
    return this.arms(1).elbowAngle = this.phases[half][3];
  };

  RunMovement.prototype.start = function() {
    this.init();
    return this.move();
  };

  RunMovement.prototype.move = function() {
    this.update();
    this.figure.hide();
    this.figure.draw();
    if (!this.shouldStop()) {
      return requestAnimFrame(this.move.bind(this));
    }
  };

  RunMovement.prototype.shouldStop = function() {
    if (this.stopCallback != null) {
      return this.stopCallback.call(this);
    } else {
      return false;
    }
  };

  RunMovement.prototype.legs = function(index) {
    return this.figure.legs[index];
  };

  RunMovement.prototype.arms = function(index) {
    return this.figure.arms[index];
  };

  RunMovement.prototype.update = function() {
    if (this.frameCount == null) {
      this.frameCount = Math.ceil(this.phases[this.curPhase0][4] * this.maxFrameCount);
    }
    if (this.xIncr == null) {
      this.xIncr = this.speed * 10 / this.phases[this.curPhase0][4] * this.tempo * this.figure.scale;
    }
    this.figure.x += this.xIncr;
    this.figure.torso.move(this.xIncr, 0);
    this.updateLimbs();
    this.curFrame += 1;
    if (this.curFrame === this.frameCount) {
      return this.changePhase();
    }
  };

  RunMovement.prototype.changePhase = function() {
    this.frameCount = null;
    this.xIncr = null;
    this.curPhase0 += 1;
    if (this.curPhase0 === 4) {
      this.curPhase0 = 0;
    }
    this.curPhase1 += 1;
    if (this.curPhase1 === 4) {
      this.curPhase1 = 0;
    }
    return this.curFrame = 0;
  };

  RunMovement.prototype.updateLimbs = function() {
    this.updateLeg(this.legs(0), this.curPhase0);
    this.updateLeg(this.legs(1), this.curPhase1);
    this.updateArm(this.arms(0), this.curPhase0);
    return this.updateArm(this.arms(1), this.curPhase1);
  };

  RunMovement.prototype.updateLeg = function(leg, phase) {
    var hipIncrement, kneeIncrement, prevPhase;
    prevPhase = phase === 0 ? this.phases.length - 1 : phase - 1;
    hipIncrement = (this.phases[phase][0] - this.phases[prevPhase][0]) / this.frameCount;
    kneeIncrement = (this.phases[phase][1] - this.phases[prevPhase][1]) / this.frameCount;
    leg.hipAngle += hipIncrement;
    return leg.kneeAngle += kneeIncrement;
  };

  RunMovement.prototype.updateArm = function(arm, phase) {
    var elbowIncrement, prevPhase, shoulderIncrement;
    prevPhase = phase === 0 ? this.phases.length - 1 : phase - 1;
    shoulderIncrement = (this.phases[phase][2] - this.phases[prevPhase][2]) / this.frameCount;
    elbowIncrement = (this.phases[phase][3] - this.phases[prevPhase][3]) / this.frameCount;
    arm.shoulderAngle += shoulderIncrement;
    return arm.elbowAngle += elbowIncrement;
  };

  return RunMovement;

})();

var Torso;

Torso = (function() {
  function Torso(context, length, width, x1, y1) {
    this.context = context;
    this.length = length;
    this.width = width;
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
    this.leanAngle = 0;
    this.neckPosition = [this.x, this.y - this.length];
    this.hipPosition = [this.x, this.y];
  }

  Torso.prototype.draw = function() {
    var ref, x, y;
    this.context.save();
    this.context.beginPath();
    ref = this.neckPosition = this.neckCoordinates(), x = ref[0], y = ref[1];
    this.context.moveTo(x, y);
    this.hipPosition = [this.x, this.y];
    this.context.lineTo(this.x, this.y);
    this.context.lineWidth = this.width;
    this.context.stroke();
    return this.context.restore();
  };

  Torso.prototype.neckCoordinates = function() {
    var angle;
    angle = this.leanAngle * Math.PI / 180;
    return [this.x + this.length * Math.sin(angle), this.y - this.length * (Math.cos(angle))];
  };

  Torso.prototype.move = function(x, y) {
    this.x += x;
    return this.y += y;
  };

  return Torso;

})();
