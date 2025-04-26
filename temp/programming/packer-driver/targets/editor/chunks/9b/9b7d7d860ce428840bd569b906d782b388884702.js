System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, StickController, _crd;

  function _reportPossibleCrUseOfIGameModel(extras) {
    _reporterNs.report("IGameModel", "./Interfaces", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIGameView(extras) {
    _reporterNs.report("IGameView", "./Interfaces", _context.meta, extras);
  }

  _export("StickController", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2f722E1p4hPLophkq4E2xuW", "StickController", undefined);

      _export("StickController", StickController = class StickController {
        constructor(model, view) {
          this.model = void 0;
          this.view = void 0;
          this.currentScaleY = 0;
          this.model = model;
          this.view = view;
        } // Начать рост палки


        startGrowing() {
          this.model.setStickGrowing(true);
          this.currentScaleY = 0;
          const startColumnInfo = this.view.getStartColumnInfo();
          const startX = startColumnInfo.x + startColumnInfo.width / 2;
          const startY = startColumnInfo.height / 2;
          this.view.createStick(startX, startY);
          this.view.updateStick(this.currentScaleY, this.model.getStickAngle());
        } // Остановить рост палки


        stopGrowing() {
          this.model.setStickGrowing(false);
          this.view.dropStick(() => this.checkResult());
        } // Обновить рост палки


        update(deltaTime) {
          if (!this.model.isStickGrowing()) return;
          const stickInfo = this.view.getStickInfo();
          const maxScaleY = this.view.getMaxHeight() / stickInfo.height;
          this.currentScaleY += this.view.getGrowthSpeed() * deltaTime;

          if (this.currentScaleY >= maxScaleY) {
            this.currentScaleY = maxScaleY;
            this.model.setStickGrowing(false);
            this.view.dropStick(() => this.checkResult());
          }

          this.view.updateStick(this.currentScaleY, this.model.getStickAngle());
        } // Проверить результат


        checkResult() {
          try {
            const startColumnInfo = this.view.getStartColumnInfo();
            const nextColumnInfo = this.view.getNextColumnInfo();
            const stickInfo = this.view.getStickInfo();
            const startRightX = startColumnInfo.x + startColumnInfo.width / 2;
            const stickLength = stickInfo.height * stickInfo.scaleY;
            const stickEndX = startRightX + stickLength;
            const nextLeftX = nextColumnInfo.x - nextColumnInfo.width / 2;
            const nextRightX = nextColumnInfo.x + nextColumnInfo.width / 2;
            console.log(`Checking result: startRightX=${startRightX}, stickLength=${stickLength}, stickEndX=${stickEndX}, nextLeftX=${nextLeftX}, nextRightX=${nextRightX}`);

            if (stickEndX >= nextLeftX && stickEndX <= nextRightX) {
              const playerWidth = this.view.getPlayerWidth();
              const playerX = nextColumnInfo.x + playerWidth / 4;
              this.model.setPlayerX(playerX);
              this.view.movePlayer(playerX);
            } else {
              this.view.playerFall(() => {
                this.view.showGameOverScreen();
              });
            }
          } catch (error) {
            console.error("Error in checkResult", error);
            this.view.showGameOverScreen();
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9b7d7d860ce428840bd569b906d782b388884702.js.map