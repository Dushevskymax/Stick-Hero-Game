System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, PlayerState, GameManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, PlayerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerState(extras) {
    _reporterNs.report("PlayerState", "./PlayerState", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Game/GameManager", _context.meta, extras);
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
    }, function (_unresolved_2) {
      PlayerState = _unresolved_2.PlayerState;
    }, function (_unresolved_3) {
      GameManager = _unresolved_3.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1734fJ9qrZIbauPQjjHhldd", "PlayerController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerController", PlayerController = (_dec = ccclass('PlayerController'), _dec2 = property(Node), _dec3 = property(_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
        error: Error()
      }), GameManager) : GameManager), _dec(_class = (_class2 = class PlayerController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "player", _descriptor, this);

          _initializerDefineProperty(this, "gameLogic", _descriptor2, this);

          this.currentState = (_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
            error: Error()
          }), PlayerState) : PlayerState).WAITING;
        }

        setState(state) {
          this.currentState = state;

          switch (state) {
            case (_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
              error: Error()
            }), PlayerState) : PlayerState).WAITING:
              this.handleWaiting();
              break;

            case (_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
              error: Error()
            }), PlayerState) : PlayerState).MOVING:
              this.handleSuccessfulMove();
              break;

            case (_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
              error: Error()
            }), PlayerState) : PlayerState).FALLING:
              this.handleFalling();
              break;
          }
        }

        startWalking() {
          this.setState((_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
            error: Error()
          }), PlayerState) : PlayerState).MOVING);
        }

        startFalling() {
          this.setState((_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
            error: Error()
          }), PlayerState) : PlayerState).FALLING);
        }

        handleWaiting() {}

        handleSuccessfulMove() {}

        handleFalling() {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameLogic", [_dec3], {
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
//# sourceMappingURL=d3b477654b6bee9ae24d3c56d143971911cb7c3e.js.map