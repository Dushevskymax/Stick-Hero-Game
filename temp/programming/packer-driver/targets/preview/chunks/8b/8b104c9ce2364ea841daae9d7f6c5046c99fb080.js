System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, GameState;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "692a4I18bJC+7GA91tl2jVV", "GameState", undefined);

      _export("GameState", GameState = /*#__PURE__*/function (GameState) {
        GameState["STARTSCREEN"] = "startscreen";
        GameState["PLAYSCREEN"] = "playscreen";
        GameState["GAMEOVERSCREEN"] = "gameoverscreen";
        return GameState;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8b104c9ce2364ea841daae9d7f6c5046c99fb080.js.map