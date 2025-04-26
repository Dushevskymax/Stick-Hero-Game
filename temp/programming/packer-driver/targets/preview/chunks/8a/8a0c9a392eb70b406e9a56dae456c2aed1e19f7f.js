System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, tween, Vec3, AnimationHelper, _crd;

  _export("AnimationHelper", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7fd94QMbitFiKzuOwpapSA4", "AnimationHelper", undefined);

      __checkObsolete__(['Node', 'tween', 'Vec3']);

      _export("AnimationHelper", AnimationHelper = class AnimationHelper {
        static animateNodes(parent, movements, callback) {
          var validMovements = movements.filter(_ref => {
            var {
              node
            } = _ref;
            return node && node.isValid;
          });

          if (validMovements.length === 0) {
            callback == null || callback();
            return;
          }

          var tweens = validMovements.map(_ref2 => {
            var {
              node,
              x
            } = _ref2;
            return tween(node).to(0.3, {
              position: new Vec3(x, node.position.y, 0)
            });
          });
          tween(parent).parallel(...tweens).call(callback != null ? callback : () => {}).start();
        }

        static animateNodePosition(node, x, y, duration, callback) {
          if (!node || !node.isValid) {
            callback == null || callback();
            return;
          }

          var action = tween(node).to(duration, {
            position: new Vec3(x, y, 0)
          });

          if (callback) {
            action.call(callback);
          }

          action.start();
        }

        static animateStickDrop(stick, callback) {
          if (!stick || !stick.isValid) {
            callback(stick);
            return;
          }

          tween(stick).to(0.25, {
            angle: -90
          }).call(() => callback(stick)).start();
        }

        static animatePlayerFall(player, callback) {
          if (!player || !player.isValid) {
            callback();
            return;
          }

          tween(player).to(0.5, {
            position: new Vec3(player.position.x, player.position.y - 500, 0)
          }).call(callback).start();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8a0c9a392eb70b406e9a56dae456c2aed1e19f7f.js.map