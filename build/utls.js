var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * @param {?} perc
     * @return {?}
     */
    Utils.percToDeg = function (perc) {
        return perc * 360;
    };
    ;
    /**
     * @param {?} perc
     * @return {?}
     */
    Utils.percToRad = function (perc) {
        return this.degToRad(this.percToDeg(perc));
    };
    ;
    /**
     * @param {?} deg
     * @return {?}
     */
    Utils.degToRad = function (deg) {
        return deg * Math.PI / 180;
    };
    ;
    return Utils;
}());
export { Utils };
