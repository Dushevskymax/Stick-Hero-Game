System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Logger, ScreenManager, _crd;

  function _reportPossibleCrUseOfLogger(extras) {
    _reporterNs.report("Logger", "./Logger", _context.meta, extras);
  }

  _export("ScreenManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      Logger = _unresolved_2.Logger;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "11d1bN9dd9Ggodzh/EZGj0j", "ScreenManager", undefined);

      __checkObsolete__(['Node', 'Label']);

      _export("ScreenManager", ScreenManager = class ScreenManager {
        constructor(startScreen, playScreen, gameOverScreen, currentScoreLabel, scoreLabel) {
          this.startScreen = void 0;
          this.playScreen = void 0;
          this.gameOverScreen = void 0;
          this.currentScoreLabel = void 0;
          this.scoreLabel = void 0;
          this.startScreen = startScreen;
          this.playScreen = playScreen;
          this.gameOverScreen = gameOverScreen;
          this.currentScoreLabel = currentScoreLabel;
          this.scoreLabel = scoreLabel;
        }

        showStartScreen() {
          this.setScreenState(true, false, false);
          this.updateCurrentScore(0, "showStartScreen");
        }

        showPlayScreen() {
          this.setScreenState(false, true, false);
          this.updateCurrentScore(0, "showPlayScreen");
        }

        showGameOverScreen(score) {
          this.setScreenState(false, false, true);

          if (this.scoreLabel) {
            this.scoreLabel.string = `Score: ${score}`;
            console.log(`ScreenManager: Game over screen showing score: ${score}`);
          } else {
            (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
              error: Error()
            }), Logger) : Logger).warnNull("ScreenManager", "scoreLabel", "showGameOverScreen");
          }
        }

        updateScoreDisplay(score) {
          this.updateCurrentScore(score, "updateScoreDisplay");
        }

        setScreenState(start, play, gameOver) {
          this.startScreen.active = start;
          this.playScreen.active = play;
          this.gameOverScreen.active = gameOver;

          if (this.gameOverScreen.active) {
            console.log(`ScreenManager: Activating gameOverScreen, active state: ${this.gameOverScreen.active}`);
          }
        }

        updateCurrentScore(score, method) {
          if (this.currentScoreLabel) {
            this.currentScoreLabel.string = `${score}`;
            console.log(`ScreenManager: Current score display ${method === "updateScoreDisplay" ? "updated" : "reset"} to: ${score}`);
          } else {
            (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
              error: Error()
            }), Logger) : Logger).warnNull("ScreenManager", "currentScoreLabel", method);
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d07d4383c13becdf522eab53a46b97507abdd210.js.map