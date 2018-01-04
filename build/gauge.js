import { Utils } from './utls';
import { Needle } from './needle';
import { Component, Input, ViewChild, } from '@angular/core';
import * as d3 from 'd3';
var GuageWithColorBandComponent = /** @class */ (function () {
    function GuageWithColorBandComponent() {
        this.margin = {
            top: 20,
            right: 20,
            bottom: 40,
            left: 20
        };
        this.gaugeInitDone = false;
        this.oldGaugeValue = 0;
    }
    /**
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.ngAfterViewInit = function () {
        this.initGauge();
    };
    /**
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.ngOnInit = function () {
        this.checkInput();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.ngOnChanges = function (changes) {
        // if (this.gaugeInitDone) {
        //     if (changes['options'].currentValue) {
        //         this.drawNeedle(this.options.valuePercent);
        //     }
        // }
    };
    /**
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.ngDoCheck = function () {
        if (this.gaugeInitDone) {
            if (this.oldGaugeValue !== this.options.valuePercent) {
                this.drawNeedle(this.oldGaugeValue, this.options.valuePercent);
                this.oldGaugeValue = this.options.valuePercent;
            }
        }
    };
    /**
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.checkInput = function () {
        if (!this.options) {
            throw 'You must provide gauge options';
        }
        if (this.options.bandColor && this.options.bandPercent) {
            if (this.options.bandColor.length !== this.options.bandPercent.length) {
                throw 'The number of elements in band colors must match the number of elements in band values';
            }
        }
        if (!this.options.bandPercent || this.options.bandPercent.length == 0) {
            throw 'You must provide an array of percentage values';
        }
    };
    /**
     * @param {?} prevValue
     * @param {?} targetValue
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.animateLabel = function (prevValue, targetValue) {
        var _this = this;
        if (this.valueLabel) {
            this.valueLabel.transition()
                .delay(500)
                .ease(d3.easeExpOut)
                .duration(2000)
                .tween('text', function () {
                var /** @type {?} */ i = d3.interpolate(prevValue, targetValue);
                return (function (t) {
                    _this.valueLabel.text(i(t).toFixed(0));
                });
            });
        }
    };
    /**
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.initNeedle = function () {
        this.needleLength = (this.svgHeight - this.margin.left - this.margin.right - this.barWidth) - 55;
        this.needleCircleSize = this.svgHeight * 0.07;
        if (!this.needle) {
            this.needle = new Needle(this.needleLength, this.needleCircleSize);
        }
    };
    /**
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.resetNeedle = function () {
        this.needle.DrawOn(this.chart, 0);
    };
    /**
     * @param {?} lastPercent
     * @param {?} currPercent
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.drawNeedle = function (lastPercent, currPercent) {
        if (this.valueLabel) {
            var /** @type {?} */ currValue = currPercent * this.options.maxValue;
            var /** @type {?} */ lastValue = lastPercent * this.options.maxValue;
            this.animateLabel(lastValue, currValue);
        }
        this.needle.AnimatedOn(this.chart, lastPercent, currPercent, this.numSections);
    };
    /**
     * @return {?}
     */
    GuageWithColorBandComponent.prototype.initGauge = function () {
        var /** @type {?} */ arc, /** @type {?} */ arcEndRad, /** @type {?} */ arcStartRad, /** @type {?} */ chartInset, /** @type {?} */ el, /** @type {?} */ endPadRad, /** @type {?} */ height;
        var /** @type {?} */ i, /** @type {?} */ padRad, /** @type {?} */ radius, /** @type {?} */ ref, /** @type {?} */ sectionIndx;
        var /** @type {?} */ sectionPerc, /** @type {?} */ startPadRad, /** @type {?} */ svg, /** @type {?} */ totalPercent, /** @type {?} */ width;
        this.numSections = this.options.bandPercent.length;
        sectionPerc = 1 / this.numSections / 2;
        padRad = 0;
        chartInset = 10;
        totalPercent = .75;
        el = d3.select(this.container.nativeElement);
        width = this.container.nativeElement.offsetWidth - this.margin.left - this.margin.right;
        height = width;
        radius = Math.min(width, height) / 2;
        this.svgHeight = height / 2 + this.margin.top + this.margin.bottom;
        svg = el.append('svg').attr('width', width + this.margin.left + this.margin.right).attr('height', this.svgHeight);
        this.chart = svg.append('g')
            .attr('transform', 'translate(' + ((width + this.margin.left) / 2) + ', ' + ((height + this.margin.top) / 2) + ')');
        this.barWidth = (this.svgHeight - this.margin.top - this.margin.bottom) * .3; // 40;
        for (sectionIndx = i = 1, ref = this.numSections; 1 <= ref ? i <= ref : i >= ref; sectionIndx = 1 <= ref ? ++i : --i) {
            arcStartRad = Utils.percToRad(totalPercent);
            arcEndRad = arcStartRad + Utils.percToRad(0.5 * this.options.bandPercent[sectionIndx]);
            totalPercent += sectionPerc;
            startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
            endPadRad = sectionIndx === this.numSections ? 0 : padRad / 2;
            arc = d3.arc()
                .outerRadius(radius - chartInset)
                .innerRadius(radius - chartInset - this.barWidth)
                .startAngle(arcStartRad + startPadRad)
                .endAngle(arcEndRad - endPadRad);
            var /** @type {?} */ color = this.options.bandColor[sectionIndx - 1];
            this.chart.append('path').style('fill', color).attr('d', arc);
        }
        this.initNeedle();
        this.gaugeInitDone = true;
        this.resetNeedle();
        this.drawNeedle(0, this.options.valuePercent);
        var /** @type {?} */ labelY = this.svgHeight - this.margin.top;
        if (this.options.minValue != null && this.options.minValue !== undefined) {
            svg.append('text')
                .attr('x', this.margin.left)
                .attr('y', labelY)
                .text(this.options.minValue);
        }
        if (this.options.maxValue != null && this.options.maxValue !== undefined) {
            svg.append('text')
                .attr('x', width - this.margin.right - this.margin.left)
                .attr('y', labelY)
                .text(this.options.maxValue);
        }
        if (this.options.unit != null && this.options.unit !== undefined) {
            this.valueLabel = svg.append('text')
                .attr('x', width / 2)
                .attr('y', labelY)
                .text(this.options.maxValue * this.options.valuePercent);
        }
    };
    GuageWithColorBandComponent.decorators = [
        { type: Component, args: [{
                    selector: 'color-band-gauge',
                    template: "<div style=\"height:100%;width:100%;\" #container></div>"
                },] },
    ];
    /**
     * @nocollapse
     */
    GuageWithColorBandComponent.ctorParameters = function () { return []; };
    GuageWithColorBandComponent.propDecorators = {
        'container': [{ type: ViewChild, args: ['container',] },],
        'options': [{ type: Input },],
    };
    return GuageWithColorBandComponent;
}());
export { GuageWithColorBandComponent };
function GuageWithColorBandComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GuageWithColorBandComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GuageWithColorBandComponent.ctorParameters;
    /** @type {?} */
    GuageWithColorBandComponent.propDecorators;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.svgHeight;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.margin;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.needle;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.valueLabel;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.numSections;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.chart;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.barWidth;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.gaugeInitDone;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.needleLength;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.needleCircleSize;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.oldGaugeValue;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.container;
    /** @type {?} */
    GuageWithColorBandComponent.prototype.options;
}
