System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, PlayerState;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6ff1dTEZhlOHa5btWWXDGst", "PlayerState", undefined);

      _export("PlayerState", PlayerState = /*#__PURE__*/function (PlayerState) {
        PlayerState["WAITING"] = "waiting";
        PlayerState["MOVING"] = "moving";
        PlayerState["FALLING"] = "falling";
        return PlayerState;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e41d45d740d6d6dcc80a3c7f9719daaa8746a5d3.js.map