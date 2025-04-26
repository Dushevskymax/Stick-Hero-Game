System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, GameModel, _crd;

  _export("GameModel", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "19b20HtqkZGCrNz61M11HPM", "GameModel", undefined);

      _export("GameModel", GameModel = class GameModel {
        constructor() {
          this.playerX = 0;
          this.stickGrowing = false;
          this.stickAngle = 0;
          this.startColumnX = 0;
          this.nextColumnX = 0;
          this.score = 0;
        }

        getPlayerX() {
          return this.playerX;
        }

        setPlayerX(x) {
          this.playerX = x;
        }

        isStickGrowing() {
          return this.stickGrowing;
        }

        setStickGrowing(growing) {
          this.stickGrowing = growing;
        }

        getStickAngle() {
          return this.stickAngle;
        }

        setStickAngle(angle) {
          this.stickAngle = angle;
        }

        getStartColumnX() {
          return this.startColumnX;
        }

        setStartColumnX(x) {
          this.startColumnX = x;
        }

        getNextColumnX() {
          return this.nextColumnX;
        }

        setNextColumnX(x) {
          this.nextColumnX = x;
        }

        getScore() {
          return this.score;
        }

        incrementScore() {
          this.score += 1;
        }

        reset() {
          this.playerX = 0;
          this.stickGrowing = false;
          this.stickAngle = 0;
          this.startColumnX = 0;
          this.nextColumnX = 0;
          this.score = 0;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e11c446ea220df1a85d66ce6d59a116ceb15ced9.js.map