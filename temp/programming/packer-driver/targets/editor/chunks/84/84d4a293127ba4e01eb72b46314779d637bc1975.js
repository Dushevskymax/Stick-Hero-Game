System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, SceneUtils, ColumnManager, _crd;

  function _reportPossibleCrUseOfSceneUtils(extras) {
    _reporterNs.report("SceneUtils", "./SceneUtills", _context.meta, extras);
  }

  _export("ColumnManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      SceneUtils = _unresolved_2.SceneUtils;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2bce9cu52VGeZ47tQglibNt", "ColumnManager", undefined);

      _export("ColumnManager", ColumnManager = class ColumnManager {
        constructor(columnWidth, columnHeight) {
          this.canvasWidth = 0;
          this.canvasBottomY = 0;
          this.columnWidth = 0;
          this.columnHeight = 0;
          const canvasSize = (_crd && SceneUtils === void 0 ? (_reportPossibleCrUseOfSceneUtils({
            error: Error()
          }), SceneUtils) : SceneUtils).getCanvasSize();
          this.canvasWidth = canvasSize.width;
          this.canvasBottomY = canvasSize.bottomY;
          this.columnWidth = columnWidth;
          this.columnHeight = columnHeight;
        } // Сгенерировать данные для следующего столба


        generateNextColumn() {
          const minWidth = this.columnWidth / 3;
          const maxWidth = this.columnWidth * 2;
          const randomWidth = (_crd && SceneUtils === void 0 ? (_reportPossibleCrUseOfSceneUtils({
            error: Error()
          }), SceneUtils) : SceneUtils).randomRange(minWidth, maxWidth);
          const minPosition = this.canvasWidth / 2 + 1.5 * this.columnWidth;
          const maxPosition = 1.5 * this.canvasWidth - randomWidth / 2;
          const randomPosition = (_crd && SceneUtils === void 0 ? (_reportPossibleCrUseOfSceneUtils({
            error: Error()
          }), SceneUtils) : SceneUtils).randomRange(minPosition, maxPosition);
          return {
            x: randomPosition,
            y: this.canvasBottomY + this.columnHeight / 2,
            width: randomWidth
          };
        } // Рассчитать начальные позиции при старте игры


        calculateInitialPositions(startColumnWidth, playerWidth) {
          const startColumnX = -this.canvasWidth / 2 + startColumnWidth / 2;
          const playerX = startColumnX + playerWidth / 4;
          const nextColumnX = this.generateNextColumn().x - this.canvasWidth;
          return {
            startColumnX,
            playerX,
            nextColumnX
          };
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=84d4a293127ba4e01eb72b46314779d637bc1975.js.map