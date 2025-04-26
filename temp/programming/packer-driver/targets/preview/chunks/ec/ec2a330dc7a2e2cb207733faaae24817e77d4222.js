System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, UITransform, Entities, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, GameLogic;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEntities(extras) {
    _reporterNs.report("Entities", "./Entities", _context.meta, extras);
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
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      Entities = _unresolved_2.Entities;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fdba5M4PdJCqLjed9YgiaGc", "GameLogic", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'Vec2', 'Vec3', 'UITransform', 'RigidBody2D', 'RigidBodyComponent', 'director', 'instantiate', 'Prefab', 'Input', 'input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameLogic", GameLogic = (_dec = ccclass('GameLogic'), _dec2 = property(_crd && Entities === void 0 ? (_reportPossibleCrUseOfEntities({
        error: Error()
      }), Entities) : Entities), _dec(_class = (_class2 = class GameLogic extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "entities", _descriptor, this);
        }

        start() {}

        update(deltaTime) {}

        isStickOnNextColumn(startColumn, nextColumn, stick) {
          var startTransform = startColumn.getComponent(UITransform);
          var nextTransform = nextColumn.getComponent(UITransform);
          var stickTransform = stick.getComponent(UITransform);

          if (!startTransform || !nextTransform || !stickTransform) {
            console.log("Не хватает UITransform у одного из объектов!");
            return false;
          }

          var startPos = startColumn.position;
          var nextPos = nextColumn.position;
          var startRightX = startPos.x + startTransform.width / 2;
          var stickLength = stickTransform.height * stick.scale.y;
          var stickEndX = startRightX + stickLength;
          var nextLeftX = nextPos.x - nextTransform.width / 2;
          var nextRightX = nextPos.x + nextTransform.width / 2;
          return stickEndX >= nextLeftX && stickEndX <= nextRightX;
        }

        onStickDropComplete(stick) {
          var allEntities = this.entities.getEntities();
          var startColumn = allEntities['startColumn'];
          var nextColumn = allEntities['nextColumn'];
          var isSuccess = this.isStickOnNextColumn(startColumn, nextColumn, stick);
          this.handleDropResult(isSuccess);
        }

        handleDropResult(isSuccess) {
          if (isSuccess) {
            console.log('Успешное приземление палки');
          } else {
            console.log('Неуспешное приземление палки');
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "entities", [_dec2], {
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
//# sourceMappingURL=ec2a330dc7a2e2cb207733faaae24817e77d4222.js.map