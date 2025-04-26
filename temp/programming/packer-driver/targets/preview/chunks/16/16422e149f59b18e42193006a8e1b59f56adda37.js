System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Logger, _crd;

  _export("Logger", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "735e6u9IdtGMYQ/5IsWMDS4", "Logger", undefined);

      _export("Logger", Logger = class Logger {
        static warnNull(component, property, method) {
          console.warn(component + ": " + property + " is null in " + method);
        }

        static errorNull(component, property, method) {
          console.error(component + ": " + property + " is not assigned in the editor! Please assign a " + property + " component in Cocos Creator.");
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=16422e149f59b18e42193006a8e1b59f56adda37.js.map