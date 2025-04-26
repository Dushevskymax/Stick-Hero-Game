System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, input, PlayerState, GameLogic, GameState, SceneMaker, ScreenManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerState(extras) {
    _reporterNs.report("PlayerState", "../Player/PlayerState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameLogic(extras) {
    _reporterNs.report("GameLogic", "./GameLogic", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameState(extras) {
    _reporterNs.report("GameState", "./GameState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneMaker(extras) {
    _reporterNs.report("SceneMaker", "../UI/SceneMaker", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScreenManager(extras) {
    _reporterNs.report("ScreenManager", "../UI/ScreenManager", _context.meta, extras);
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
      Input = _cc.Input;
      input = _cc.input;
    }, function (_unresolved_2) {
      PlayerState = _unresolved_2.PlayerState;
    }, function (_unresolved_3) {
      GameLogic = _unresolved_3.GameLogic;
    }, function (_unresolved_4) {
      GameState = _unresolved_4.GameState;
    }, function (_unresolved_5) {
      SceneMaker = _unresolved_5.SceneMaker;
    }, function (_unresolved_6) {
      ScreenManager = _unresolved_6.ScreenManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "feef5yJGkpOn6Y1nqcINut8", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'Vec2', 'Vec3', 'UITransform', 'RigidBody2D', 'RigidBodyComponent', 'director', 'instantiate', 'Prefab', 'Input', 'input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(_crd && ScreenManager === void 0 ? (_reportPossibleCrUseOfScreenManager({
        error: Error()
      }), ScreenManager) : ScreenManager), _dec3 = property(_crd && SceneMaker === void 0 ? (_reportPossibleCrUseOfSceneMaker({
        error: Error()
      }), SceneMaker) : SceneMaker), _dec4 = property(_crd && GameLogic === void 0 ? (_reportPossibleCrUseOfGameLogic({
        error: Error()
      }), GameLogic) : GameLogic), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "screenManager", _descriptor, this);

          _initializerDefineProperty(this, "sceneMaker", _descriptor2, this);

          _initializerDefineProperty(this, "gameLogic", _descriptor3, this);

          this.playerState = (_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
            error: Error()
          }), PlayerState) : PlayerState).WAITING;
          this.currentState = (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).STARTSCREEN;
        }

        setGameState(state) {
          var _stateActions$state;

          this.currentState = state;
          var stateActions = {
            [(_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
              error: Error()
            }), GameState) : GameState).STARTSCREEN]: () => this.resetGame(),
            [(_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
              error: Error()
            }), GameState) : GameState).PLAYSCREEN]: () => this.startGame(),
            [(_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
              error: Error()
            }), GameState) : GameState).GAMEOVERSCREEN]: () => {}
          };
          (_stateActions$state = stateActions[state]) == null || _stateActions$state.call(stateActions);
          this.screenManager.onGameStateChanged(state);
        }

        getCurrentState() {
          return this.currentState;
        }

        onStartButtonPressed() {
          this.setGameState((_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).PLAYSCREEN);
        }

        onRetryButtonPressed() {
          this.setGameState((_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).PLAYSCREEN);
        }

        onGameOver() {
          this.setGameState((_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).GAMEOVERSCREEN);
        }

        start() {
          this.resetGame();
          this.sceneMaker.initialSceneCreate();
          this.setGameState((_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).STARTSCREEN);
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }

        startGame() {
          this.sceneMaker.initialSceneMove();
        }

        resetGame() {
          this.playerState = (_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
            error: Error()
          }), PlayerState) : PlayerState).WAITING;
        }

        onTouchStart() {
          if (this.currentState !== (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).PLAYSCREEN) return;
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "screenManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sceneMaker", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameLogic", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=610cdab711793857072328934006f0143061ffc3.js.map