System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, PositionCalculator, _crd;

  _export("PositionCalculator", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "236ce2K/ERLEp/BkAeZXUNb", "PositionCalculator", undefined);

      _export("PositionCalculator", PositionCalculator = class PositionCalculator {
        static generateRandomWidth(prefabColumnWidth) {
          var minWidth = prefabColumnWidth / 3;
          var maxWidth = prefabColumnWidth * 2;
          return Math.random() * (maxWidth - minWidth) + minWidth;
        }

        static calculateNextColumnPosition(startColumnRightEdge, minGap, columnWidth, canvasWidth) {
          var minPosition = startColumnRightEdge + minGap + columnWidth / 2;
          var maxPosition = canvasWidth / 2 - columnWidth / 2;
          return Math.max(minPosition, Math.random() * (maxPosition - minPosition) + minPosition);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7d453d33a9ce2eecd5f337c99b0cfb2bfdc02f2b.js.map