System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, UITransform, PositionHelper, _crd;

  _export("PositionHelper", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0794epgxwZPC7J1WktwQmtJ", "PositionHelper", undefined);

      __checkObsolete__(['Node', 'UITransform']);

      _export("PositionHelper", PositionHelper = class PositionHelper {
        static calculateCanvasDimensions(canvas) {
          var transform = canvas.getComponent(UITransform);
          return {
            width: transform.width,
            height: transform.height,
            bottomY: -transform.height / 2
          };
        }

        static calculateStartColumnX(canvasWidth, columnWidth) {
          return -canvasWidth / 2 + columnWidth / 2;
        }

        static calculatePlayerX(startColumnX, playerWidth) {
          return startColumnX + playerWidth / 4;
        }

        static calculateNextColumnX(randomPosition, canvasWidth) {
          return randomPosition - canvasWidth;
        }

        static calculateStickStartPosition(startColumn) {
          var transform = startColumn.getComponent(UITransform);
          var startColumnX = startColumn.position.x;
          return {
            x: startColumnX + transform.width / 2,
            y: startColumn.position.y + transform.height / 2
          };
        }

        static calculateStickEndX(startRightX, stickLength) {
          return startRightX + stickLength;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=046a3d2592171a57be54c2dbce6e374dbecb6d36.js.map