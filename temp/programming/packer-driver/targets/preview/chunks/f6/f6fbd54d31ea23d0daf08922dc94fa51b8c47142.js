System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, UITransform, Vec3, director, tween, Entities, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, SceneMaker;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEntities(extras) {
    _reporterNs.report("Entities", "../Game/Entities", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      director = _cc.director;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      Entities = _unresolved_2.Entities;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8e36d9GKzBDSpiZSoiROXJC", "SceneMaker", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Vec3', 'director', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SceneMaker", SceneMaker = (_dec = ccclass('SceneMaker'), _dec2 = property(_crd && Entities === void 0 ? (_reportPossibleCrUseOfEntities({
        error: Error()
      }), Entities) : Entities), _dec(_class = (_class2 = class SceneMaker extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "entities", _descriptor, this);
        }

        initialSceneCreate() {
          this.entities.createAllEntities();
          var allEntities = this.entities.getEntities();
          var startColumn = allEntities['startColumn'];
          var player = allEntities['player'];
          startColumn.setParent(this.node);
          player.setParent(this.node);
          var canvas = director.getScene().getChildByName("Canvas");
          var canvasHeight = canvas.getComponent(UITransform).height;
          var columnHeight = startColumn.getComponent(UITransform).height;
          var playerHeight = player.getComponent(UITransform).height;
          var canvasBottomY = -canvasHeight / 2;
          startColumn.setPosition(0, canvasBottomY + columnHeight / 2, 0);
          player.setPosition(0, canvasBottomY + columnHeight / 2 + playerHeight, 0);
        }

        initialSceneMove() {
          var allEntities = this.entities.getEntities();
          var player = allEntities['player'];
          var startColumn = allEntities['startColumn'];
          var nextColumn = allEntities['nextColumn'];
          var canvas = director.getScene().getChildByName("Canvas");
          var canvasWidth = canvas.getComponent(UITransform).width;
          var canvasRightX = canvasWidth / 2;
          var canvasLeftX = -canvasWidth / 2;
          var startColumnWidth = startColumn.getComponent(UITransform).width;
          var startColumnX = canvasLeftX + startColumnWidth / 2;
          this.animateNodeToPosition(startColumn, startColumnX);
          var playerWidth = player.getComponent(UITransform).width;
          var playerOffset = playerWidth * 0.75;
          var playerX = startColumnX + startColumnWidth / 2 - playerOffset;
          this.animateNodeToPosition(player, playerX);
          var nextColumnTransform = nextColumn.getComponent(UITransform);
          var minWidth = nextColumnTransform.width / 3;
          var maxWidth = nextColumnTransform.width * 2;
          var randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;
          nextColumnTransform.width = randomWidth;
          var minTargetX = startColumnX + startColumnWidth / 2 + randomWidth / 2;
          var maxTargetX = canvasRightX - randomWidth / 2;
          var targetX = Math.random() * (maxTargetX - minTargetX) + minTargetX;
          var y = startColumn.position.y;
          var offscreenX = canvasRightX + randomWidth;
          nextColumn.setPosition(offscreenX, y, 0);
          if (!nextColumn.parent) nextColumn.setParent(this.node);
          this.animateNodeToPosition(nextColumn, targetX);
        }

        animateNodeToPosition(node, targetX) {
          var currentPos = node.position;
          tween(node).to(0.3, {
            position: new Vec3(targetX, currentPos.y, 0)
          }).start();
        }

        start() {}

        update(deltaTime) {}

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
//# sourceMappingURL=f6fbd54d31ea23d0daf08922dc94fa51b8c47142.js.map