"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var user_base_1 = require('./user.base');
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    return User;
}(user_base_1.UserBase));
exports.User = User;

//# sourceMappingURL=user.js.map
