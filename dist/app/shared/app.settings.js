"use strict";
var AppSettings = (function () {
    function AppSettings() {
    }
    Object.defineProperty(AppSettings, "APP_NAME", {
        get: function () {
            return 'GO! Fetch';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSettings, "TASKCAT_API_BASE", {
        get: function () {
            return 'http://localhost:23873/api/';
        },
        enumerable: true,
        configurable: true
    });
    return AppSettings;
}());
exports.AppSettings = AppSettings;

//# sourceMappingURL=app.settings.js.map
