"use strict";
var geocoding_defaultAddress_1 = require('../../shared/geocoding.defaultAddress');
var UserRegistration = (function () {
    function UserRegistration() {
        this.Address = new geocoding_defaultAddress_1.DefaultAddress();
        this.InterestedLocalities = new Array();
    }
    return UserRegistration;
}());
exports.UserRegistration = UserRegistration;

//# sourceMappingURL=user.registration.js.map
