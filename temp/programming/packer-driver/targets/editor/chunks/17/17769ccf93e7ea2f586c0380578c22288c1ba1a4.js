System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Vec3, Input, input, UITransform, tween, Entities, GameLogic, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, StickController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEntities(extras) {
    _reporterNs.report("Entities", "../Game/Entities", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameLogic(extras) {
    _reporterNs.report("GameLogic", "../Game/GameLogic", _context.meta, extras);
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
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      Input = _cc.Input;
      input = _cc.input;
      UITransform = _cc.UITransform;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      Entities = _unresolved_2.Entities;
    }, function (_unresolved_3) {
      GameLogic = _unresolved_3.GameLogic;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2c8e2Ok2ARJvIFJkFiNI5CF", "StickController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'Vec3', 'Input', 'input', 'UITransform', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("StickController", StickController = (_dec = ccclass('StickController'), _dec2 = property(_crd && Entities === void 0 ? (_reportPossibleCrUseOfEntities({
        error: Error()
      }), Entities) : Entities), _dec3 = property(_crd && GameLogic === void 0 ? (_reportPossibleCrUseOfGameLogic({
        error: Error()
      }), GameLogic) : GameLogic), _dec(_class = (_class2 = class StickController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "entities", _descriptor, this);

          _initializerDefineProperty(this, "gameLogic", _descriptor2, this);

          _initializerDefineProperty(this, "growthSpeed", _descriptor3, this);

          _initializerDefineProperty(this, "maxHeight", _descriptor4, this);

          this.currentStick = null;
          this.isGrowing = false;
        }

        start() {
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onTouchStart() {
          if (this.currentStick) return;
          this.isGrowing = true;
          this.createStick();
        }

        onTouchEnd() {
          if (!this.currentStick) return;
          this.isGrowing = false;
          this.dropStick();
        }

        createStick() {
          this.currentStick = instantiate(this.entities.stickPrefab);
          const allEntities = this.entities.getEntities();
          const startColumn = allEntities['startColumn'];
          const columnWidth = startColumn.getComponent(UITransform).width;
          const columnHeight = startColumn.getComponent(UITransform).height;
          const columnRightX = startColumn.position.x + columnWidth / 2;
          const columnTopY = startColumn.position.y + columnHeight / 2;
          this.currentStick.setPosition(columnRightX, columnTopY, 0);
          const canvas = startColumn.parent;
          this.currentStick.setParent(canvas);
          this.currentStick.getComponent(UITransform).anchorY = 0;
          this.currentStick.setScale(new Vec3(1, 0, 1));
          this.currentStick.setSiblingIndex(10);
        }

        dropStick() {
          if (!this.currentStick) return;
          console.log("Палка начала падать");
          const stick = this.currentStick;
          this.currentStick = null;
          tween(stick).to(0.3, {
            angle: -90
          }).call(() => {
            console.log("Палка упала");
            this.gameLogic.onStickDropComplete(stick);
          }).start();
        }

        growStick(deltaTime) {
          if (this.isGrowing && this.currentStick) {
            const currentScale = this.currentStick.getScale();
            const stickTransform = this.currentStick.getComponent(UITransform);
            let newY = currentScale.y + this.growthSpeed * deltaTime;
            const maxScaleY = this.maxHeight / stickTransform.height;

            if (newY >= maxScaleY) {
              newY = maxScaleY;
              this.isGrowing = false;

              if (this.currentStick) {
                this.dropStick();
              }
            }

            if (this.currentStick) {
              this.currentStick.setScale(new Vec3(1, newY, 1));
            }
          }
        }

        update(deltaTime) {
          this.growStick(deltaTime);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "entities", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameLogic", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "growthSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maxHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1000;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=17769ccf93e7ea2f586c0380578c22288c1ba1a4.js.map