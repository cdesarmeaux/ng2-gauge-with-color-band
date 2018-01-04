import { Utils } from './utls';
import * as d3 from 'd3';
var Needle = /** @class */ (function () {
    /**
     * @param {?} len
     * @param {?} radius
     */
    function Needle(len, radius) {
        this.length = len;
        this.radius = radius;
        // this.lastValue = 0;
    }
    /**
     * @param {?} el
     * @param {?} perc
     * @return {?}
     */
    Needle.prototype.DrawOn = function (el, perc) {
        el.append('circle')
            .attr('class', 'needle-center')
            .attr('cx', 0).attr('cy', 0)
            .attr('r', this.radius);
        return el.append('path').attr('class', 'needle').attr('d', this.mkCmd(perc));
    };
    /**
     * @param {?} el
     * @param {?} lastValue
     * @param {?} currValue
     * @param {?} sectionCount
     * @return {?}
     */
    Needle.prototype.AnimatedOn = function (el, lastValue, currValue, sectionCount) {
        var _this = this;
        var /** @type {?} */ self;
        var /** @type {?} */ valueChange = 0;
        if (lastValue !== currValue) {
            valueChange = currValue - lastValue;
        }
        if (valueChange === 0) {
            return;
        }
        self = this;
        var /** @type {?} */ needleEle = el._groups[0][0].children[sectionCount + 1];
        return el.transition()
            .delay(500)
            .ease(d3.easeExpOut)
            .duration(2000)
            .selectAll('.needle')
            .tween('progress', function () {
            return function (percentOfPercent) {
                var /** @type {?} */ currFrameValue = lastValue + percentOfPercent * valueChange;
                return d3.select(needleEle).attr('d', _this.mkCmd(currFrameValue));
            };
        });
    };
    ;
    /**
     * @param {?} perc
     * @return {?}
     */
    Needle.prototype.mkCmd = function (perc) {
        var /** @type {?} */ centerX, /** @type {?} */ centerY, /** @type {?} */ leftX, /** @type {?} */ leftY, /** @type {?} */ rightX, /** @type {?} */ rightY, /** @type {?} */ thetaRad, /** @type {?} */ topX, /** @type {?} */ topY;
        thetaRad = Utils.percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - this.length * Math.cos(thetaRad);
        topY = centerY - this.length * Math.sin(thetaRad);
        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
        return "M" + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };
    ;
    return Needle;
}());
export { Needle };
function Needle_tsickle_Closure_declarations() {
    /** @type {?} */
    Needle.prototype.length;
    /** @type {?} */
    Needle.prototype.radius;
}
