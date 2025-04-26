System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, input, Input, UITransform, GameModel, GameView, AnimationHelper, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameModel(extras) {
    _reporterNs.report("GameModel", "./GameModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameView(extras) {
    _reporterNs.report("GameView", "./GameView", _context.meta, extras);
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
      Prefab = _cc.Prefab;
      input = _cc.input;
      Input = _cc.Input;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      GameModel = _unresolved_2.GameModel;
    }, function (_unresolved_3) {
      GameView = _unresolved_3.GameView;
    }, function (_unresolved_4) {
      AnimationHelper = _unresolved_4.AnimationHelper;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c33d8lcuHFLs52KtUu2ySYT", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'input', 'Input', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Node), _dec6 = property(_crd && GameView === void 0 ? (_reportPossibleCrUseOfGameView({
        error: Error()
      }), GameView) : GameView), _dec7 = property({
        type: Boolean
      }), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "playerPrefab", _descriptor, this);

          _initializerDefineProperty(this, "stickPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "columnPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "startScreen", _descriptor4, this);

          _initializerDefineProperty(this, "gameView", _descriptor5, this);

          this.model = new (_crd && GameModel === void 0 ? (_reportPossibleCrUseOfGameModel({
            error: Error()
          }), GameModel) : GameModel)();
          this.view = null;
          this.isPlaying = false;
          this.currentScaleY = 0;

          _initializerDefineProperty(this, "isRetry", _descriptor6, this);

          this.isTransitioning = false;
        }

        start() {
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          this.isRetry = false;
          this.model.reset();
        }

        resetGame() {
          this.isPlaying = false;
          this.model.reset();
          this.view.resetScene();
          var {
            startColumnX,
            playerX
          } = this.calculateInitialPositions();
          this.model.setStartColumnX(startColumnX);
          this.model.setPlayerX(playerX);

          if (this.isRetry) {
            this.view.setupNextColumn(startColumnX);
            this.model.setNextColumnX(this.view.randomPosition);
            this.view.getStartColumnNode().setPosition(startColumnX, this.view.getStartColumnNode().position.y, 0);
            this.view.getNextColumnNode().setPosition(this.view.randomPosition, this.view.getNextColumnNode().position.y, 0);
            this.view.updatePlayer(playerX, true);
          }

          this.view.showStartScreen();
        }

        onStartButton() {
          if (!this.view) {
            if (!this.gameView) throw new Error("gameView is not assigned!");
            this.view = this.gameView;
          }

          this.isPlaying = true;
          this.view.showPlayScreen();
          var {
            startColumnX,
            playerX
          } = this.calculateInitialPositions();

          if (!this.isRetry) {
            this.view.setupNextColumn(startColumnX);
            var nextColumnX = this.view.randomPosition;
            this.model.setStartColumnX(startColumnX);
            this.model.setPlayerX(playerX);
            this.model.setNextColumnX(nextColumnX);

            if (this.view.getStartColumnNode() && this.view.getPlayerNode() && this.view.getNextColumnNode()) {
              this.view.animateInitialSetup(startColumnX, playerX, nextColumnX);
            } else {
              console.error("Cannot animate initial setup: one of the nodes is null");
            }
          }

          this.view.updateScoreDisplay(this.model.getScore());
        }

        onRetryButtonPressed() {
          this.isRetry = true;
          this.resetGame();
          this.onStartButton();
        }

        calculateInitialPositions() {
          var startColumnX = -this.view.getCanvasWidth() / 2 + this.getNodeWidth(this.view.getStartColumnNode()) / 2;
          var playerX = startColumnX + this.getNodeWidth(this.view.getPlayerNode()) / 4;
          return {
            startColumnX,
            playerX
          };
        }

        onTouchStart() {
          if (!this.isPlaying || this.model.isStickGrowing() || this.isTransitioning) return;
          var startColumn = this.view.getStartColumnNode();
          this.model.setStickGrowing(true);
          this.currentScaleY = 0.1;
          var startX = this.model.getStartColumnX() + this.getNodeWidth(startColumn) / 2;
          var startY = startColumn.position.y + this.getNodeHeight(startColumn) / 2;
          this.view.createStick(startX, startY);
        }

        onTouchEnd() {
          if (!this.isPlaying || !this.model.isStickGrowing()) return;
          this.model.setStickGrowing(false);
          this.view.dropStick(false, stick => this.checkResult(stick));
        }

        checkResult(stick) {
          try {
            var startColumn = this.view.getStartColumnNode();
            var nextColumn = this.view.getNextColumnNode();
            var player = this.view.getPlayerNode();
            var startRightX = startColumn.position.x + this.getNodeWidth(startColumn) / 2;
            var stickLength = this.getNodeHeight(stick) * stick.scale.y;
            var stickEndX = startRightX + stickLength;
            this.view.animatePlayerToStickEnd(stickEndX, () => {
              var landed = this.checkStickLanding(stickEndX, nextColumn);

              if (landed) {
                this.handleSuccess(player, nextColumn);
              } else {
                this.handleFailure(player);
              }
            });
          } catch (error) {
            console.error("Ошибка в checkResult:", error);
            this.isPlaying = false;
            this.view.showGameOverScreen(this.model.getScore());
          }
        }

        checkStickLanding(stickEndX, nextColumn) {
          var nextLeftX = nextColumn.position.x - this.getNodeWidth(nextColumn) / 2;
          var nextRightX = nextColumn.position.x + this.getNodeWidth(nextColumn) / 2;
          return stickEndX >= nextLeftX && stickEndX <= nextRightX;
        }

        handleSuccess(player, nextColumn) {
          var _stickNode;

          var playerX = nextColumn.position.x + this.getNodeWidth(player) / 4;
          this.view.updatePlayer(playerX, false);
          var newStartColumnX = -this.view.getCanvasWidth() / 2 + this.getNodeWidth(nextColumn) / 2;
          var offset = nextColumn.position.x - newStartColumnX;
          var newPlayerX = playerX - offset;
          this.isTransitioning = true;
          (_stickNode = this.view.stickNode) == null || _stickNode.destroy();
          this.view.stickNode = null;
          this.view.getStartColumnNode().removeFromParent();
          this.view.getStartColumnNode().destroy();
          this.view.updateColumnReferences(nextColumn, null);
          this.view.setupNextColumn(newStartColumnX);
          var newNextColumnX = this.view.randomPosition;
          this.model.setNextColumnX(newNextColumnX);
          this.view.animateSceneShift(0, newStartColumnX, newPlayerX, newNextColumnX, () => {
            this.model.setStartColumnX(newStartColumnX);
            this.model.setPlayerX(newPlayerX);
            this.model.incrementScore();
            this.view.updateScoreDisplay(this.model.getScore());
            this.isTransitioning = false;
          });
        }

        handleFailure(player) {
          (_crd && AnimationHelper === void 0 ? (_reportPossibleCrUseOfAnimationHelper({
            error: Error()
          }), AnimationHelper) : AnimationHelper).animatePlayerFall(player, () => {
            this.isPlaying = false;
            this.view.showGameOverScreen(this.model.getScore());
          });
        }

        update(deltaTime) {
          var _this$view;

          if (!this.isPlaying || !this.model.isStickGrowing() || !((_this$view = this.view) != null && _this$view.stickNode)) return;
          var stick = this.view.stickNode;
          var maxScaleY = 1000 / this.getNodeHeight(stick);
          var growthSpeed = this.view.getGrowthSpeed();
          this.currentScaleY += growthSpeed * deltaTime;

          if (this.currentScaleY >= maxScaleY) {
            this.currentScaleY = maxScaleY;
            this.model.setStickGrowing(false);
            this.view.dropStick(false, stick => this.checkResult(stick));
          }

          this.view.updateStick(this.currentScaleY, this.model.getStickAngle());
        }

        getNodeWidth(node) {
          return node.getComponent(UITransform).width;
        }

        getNodeHeight(node) {
          return node.getComponent(UITransform).height;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stickPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "columnPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startScreen", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "gameView", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isRetry", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b70608d80ea203d319807163be991f830fb697cc.js.map