System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, director, UITransform, SceneUtils, _crd;

  _export("SceneUtils", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      director = _cc.director;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91719p/BAxMo7CdyVAixjMC", "SceneUtills", undefined);

      __checkObsolete__(['director', 'UITransform']);

      _export("SceneUtils", SceneUtils = class SceneUtils {
        static getCanvasSize() {
          var canvas = director.getScene().getChildByName("Canvas");
          var transform = canvas.getComponent(UITransform);
          return {
            width: transform.width,
            height: transform.height,
            bottomY: -transform.height / 2
          };
        }

        static randomRange(min, max) {
          return Math.random() * (max - min) + min;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=448a57fe9b5fa4467cf82fe655575e90f844d44b.js.map