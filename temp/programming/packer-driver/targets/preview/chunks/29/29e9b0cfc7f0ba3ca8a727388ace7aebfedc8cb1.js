System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, UITransform, Vec3, director, instantiate, Prefab, Label, PositionCalculator, AnimationHelper, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, GameView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPositionCalculator(extras) {
    _reporterNs.report("PositionCalculator", "./PositionCalculator", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAnimationHelper(extras) {
    _reporterNs.report("AnimationHelper", "./AnimationHelper", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      director = _cc.director;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      PositionCalculator = _unresolved_2.PositionCalculator;
    }, function (_unresolved_3) {
      AnimationHelper = _unresolved_3.AnimationHelper;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "61a25aTSjRKC7IUyR4joUd6", "GameView", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Vec3', 'director', 'instantiate', 'Prefab', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameView", GameView = (_dec = ccclass('GameView'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec8 = property({
        type: Number,
        tooltip: "(units per second)"
      }), _dec9 = property(Label), _dec10 = property(Label), _dec(_class = (_class2 = class GameView extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "startScreen", _descriptor, this);

          _initializerDefineProperty(this, "playScreen", _descriptor2, this);

          _initializerDefineProperty(this, "gameOverScreen", _descriptor3, this);

          _initializerDefineProperty(this, "playerPrefab", _descriptor4, this);

          _initializerDefineProperty(this, "stickPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "columnPrefab", _descriptor6, this);

          _initializerDefineProperty(this, "growthSpeed", _descriptor7, this);

          _initializerDefineProperty(this, "scoreLabel", _descriptor8, this);

          _initializerDefineProperty(this, "currentScoreLabel", _descriptor9, this);

          this.playerNode = null;
          this.stickNode = null;
          this.startColumnNode = null;
          this.nextColumnNode = null;
          this.canvasWidth = 0;
          this.columnHeight = 0;
          this.prefabColumnWidth = 0;
          this.randomPosition = 0;
        }

        start() {
          this.setScreenIndices();
          this.prefabColumnWidth = this.getNodeWidth(instantiate(this.columnPrefab));
          this.setupScene();
          this.showStartScreen();
          this.logNullLabels();
        }

        setScreenIndices() {
          this.startScreen.setSiblingIndex(10);
          this.playScreen.setSiblingIndex(11);
          this.gameOverScreen.setSiblingIndex(12);
        }

        logNullLabels() {
          if (!this.currentScoreLabel) console.error("GameView: currentScoreLabel is not assigned!");
          if (!this.scoreLabel) console.error("GameView: scoreLabel is not assigned!");
        }

        resetScene() {
          [this.startColumnNode, this.nextColumnNode, this.playerNode, this.stickNode].forEach(node => node == null ? void 0 : node.destroy());
          this.startColumnNode = this.nextColumnNode = this.playerNode = this.stickNode = null;
          this.setupScene();
        }

        setupScene() {
          var canvas = this.getCanvas();
          this.canvasWidth = this.getNodeWidth(canvas);
          var canvasBottomY = -this.getNodeHeight(canvas) / 2;
          this.startColumnNode = this.createNode(this.columnPrefab, canvas, 2);
          this.columnHeight = this.getNodeHeight(this.startColumnNode);
          this.startColumnNode.setPosition(0, canvasBottomY + this.columnHeight / 2, 0);
          this.playerNode = this.createNode(this.playerPrefab, canvas, 4);
          var playerHeight = this.getNodeHeight(this.playerNode);
          this.playerNode.setPosition(0, canvasBottomY + this.columnHeight + playerHeight / 2, 0);
        }

        setupNextColumn(futureStartColumnX) {
          var _this$nextColumnNode;

          var canvas = this.getCanvas();
          (_this$nextColumnNode = this.nextColumnNode) == null || _this$nextColumnNode.destroy();
          this.nextColumnNode = this.createNode(this.columnPrefab, canvas, 2);
          var randomWidth = (_crd && PositionCalculator === void 0 ? (_reportPossibleCrUseOfPositionCalculator({
            error: Error()
          }), PositionCalculator) : PositionCalculator).generateRandomWidth(this.prefabColumnWidth);
          this.nextColumnNode.getComponent(UITransform).width = randomWidth;
          var startColumnX = futureStartColumnX != null ? futureStartColumnX : this.startColumnNode.position.x;
          var startColumnRightEdge = startColumnX + this.getNodeWidth(this.startColumnNode) / 2;
          var canvasBottomY = -this.getNodeHeight(canvas) / 2;
          this.randomPosition = (_crd && PositionCalculator === void 0 ? (_reportPossibleCrUseOfPositionCalculator({
            error: Error()
          }), PositionCalculator) : PositionCalculator).calculateNextColumnPosition(startColumnRightEdge, this.prefabColumnWidth * 2, randomWidth, this.canvasWidth);
          var startX = this.canvasWidth / 2 + randomWidth / 2 + this.randomPosition;
          this.nextColumnNode.setPosition(startX, canvasBottomY + this.columnHeight / 2, 0);
        }

        animateInitialSetup(startColumnX, playerX, nextColumnX) {
          (_crd && AnimationHelper === void 0 ? (_reportPossibleCrUseOfAnimationHelper({
            error: Error()
          }), AnimationHelper) : AnimationHelper).animateNodes(this.node, [{
            node: this.startColumnNode,
            x: startColumnX
          }, {
            node: this.playerNode,
            x: playerX
          }, {
            node: this.nextColumnNode,
            x: nextColumnX
          }]);
        }

        animateSceneShift(_oldStartX, newStartX, playerX, nextX, callback) {
          (_crd && AnimationHelper === void 0 ? (_reportPossibleCrUseOfAnimationHelper({
            error: Error()
          }), AnimationHelper) : AnimationHelper).animateNodes(this.node, [{
            node: this.startColumnNode,
            x: newStartX
          }, {
            node: this.nextColumnNode,
            x: nextX
          }, {
            node: this.playerNode,
            x: playerX
          }], callback);
        }

        updatePlayer(x, instant) {
          if (instant === void 0) {
            instant = false;
          }

          if (!this.playerNode) return;

          if (instant) {
            this.playerNode.setPosition(x, this.playerNode.position.y, 0);
          } else {
            (_crd && AnimationHelper === void 0 ? (_reportPossibleCrUseOfAnimationHelper({
              error: Error()
            }), AnimationHelper) : AnimationHelper).animateNodePosition(this.playerNode, x, this.playerNode.position.y, 0.3);
          }
        }

        createStick(startX, startY) {
          var _this$stickNode;

          (_this$stickNode = this.stickNode) == null || _this$stickNode.destroy();
          this.stickNode = this.createNode(this.stickPrefab, this.getCanvas(), 5);
          this.stickNode.setPosition(startX, startY, 0);
          this.stickNode.getComponent(UITransform).anchorY = 0;
          this.stickNode.setScale(new Vec3(1, 0.1, 1));
          this.stickNode.angle = 0;
          console.log("Stick created at position: (" + startX + ", " + startY + ")");
          console.log("Canvas size: (" + this.canvasWidth + ", " + this.getNodeHeight(this.getCanvas()) + ")");
        }

        updateStick(scaleY, angle) {
          if (this.stickNode) {
            this.stickNode.setScale(new Vec3(1, scaleY, 1));
            this.stickNode.angle = angle;
          }
        }

        dropStick(instant, callback) {
          if (!this.stickNode) return;
          var stick = this.stickNode;

          if (instant) {
            stick.angle = -90;
            callback(stick);
          } else {
            (_crd && AnimationHelper === void 0 ? (_reportPossibleCrUseOfAnimationHelper({
              error: Error()
            }), AnimationHelper) : AnimationHelper).animateStickDrop(stick, callback);
          }
        }

        animatePlayerToStickEnd(stickEndX, callback) {
          if (this.playerNode) {
            (_crd && AnimationHelper === void 0 ? (_reportPossibleCrUseOfAnimationHelper({
              error: Error()
            }), AnimationHelper) : AnimationHelper).animateNodePosition(this.playerNode, stickEndX, this.playerNode.position.y, 0.5, callback);
          }
        }

        updateColumnReferences(newStartColumn, newNextColumn) {
          this.startColumnNode = newStartColumn;
          this.nextColumnNode = newNextColumn;
        }

        showStartScreen() {
          this.switchScreen('start');
          this.updateScoreLabel(this.currentScoreLabel, 0, "start screen");
        }

        showPlayScreen() {
          this.switchScreen('play');
          this.updateScoreLabel(this.currentScoreLabel, 0, "play screen");
        }

        showGameOverScreen(score) {
          this.switchScreen('gameOver');
          this.updateScoreLabel(this.scoreLabel, score, "game over screen", "Score: ");
        }

        switchScreen(screen) {
          this.startScreen.active = screen === 'start';
          this.playScreen.active = screen === 'play';
          this.gameOverScreen.active = screen === 'gameOver';
        }

        updateScoreLabel(label, score, context, prefix) {
          if (prefix === void 0) {
            prefix = "";
          }

          if (label) {
            label.string = "" + prefix + score.toString();
          } else {
            console.warn("GameView: " + context + " label is null");
          }
        }

        updateScoreDisplay(score) {
          this.updateScoreLabel(this.currentScoreLabel, score, "current score display");
        }

        getGrowthSpeed() {
          return this.growthSpeed;
        }

        getStartColumnNode() {
          return this.startColumnNode;
        }

        getNextColumnNode() {
          return this.nextColumnNode;
        }

        getPlayerNode() {
          return this.playerNode;
        }

        getCanvasWidth() {
          return this.canvasWidth;
        }

        getCanvas() {
          return director.getScene().getChildByName("Canvas");
        }

        getNodeWidth(node) {
          return node.getComponent(UITransform).width;
        }

        getNodeHeight(node) {
          return node.getComponent(UITransform).height;
        }

        createNode(prefab, parent, siblingIndex) {
          var node = instantiate(prefab);
          node.setParent(parent);
          node.setSiblingIndex(siblingIndex);
          return node;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startScreen", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playScreen", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameOverScreen", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playerPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "stickPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "columnPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "growthSpeed", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2.5;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "currentScoreLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=29e9b0cfc7f0ba3ca8a727388ace7aebfedc8cb1.js.map