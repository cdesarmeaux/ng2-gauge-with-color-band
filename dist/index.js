import { arc, easeExpOut, interpolate, select } from 'd3';
import { Component, Input, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    
    /**
     * @param {?} perc
     * @return {?}
     */
    Utils.percToRad = function (perc) {
        return this.degToRad(this.percToDeg(perc));
    };
    
    /**
     * @param {?} deg
     * @return {?}
     */
    Utils.degToRad = function (deg) {
        return deg * Math.PI / 180;
    };
    
    return Utils;
}());

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
        var /** @type {?} */ valueChange = 0;
        if (lastValue !== currValue) {
            valueChange = currValue - lastValue;
        }
        if (valueChange === 0) {
            return;
        }
        var /** @type {?} */ needleEle = el._groups[0][0].children[sectionCount + 1];
        return el.transition()
            .delay(500)
            .ease(easeExpOut)
            .duration(2000)
            .selectAll('.needle')
            .tween('progress', function () {
            return function (percentOfPercent) {
                var /** @type {?} */ currFrameValue = lastValue + percentOfPercent * valueChange;
                return select(needleEle).attr('d', _this.mkCmd(currFrameValue));
            };
        });
    };
    
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
    
    return Needle;
}());

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
                .ease(easeExpOut)
                .duration(2000)
                .tween('text', function () {
                var /** @type {?} */ i = interpolate(prevValue, targetValue);
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
        var /** @type {?} */ arc$$1, /** @type {?} */ arcEndRad, /** @type {?} */ arcStartRad, /** @type {?} */ chartInset, /** @type {?} */ el, /** @type {?} */ endPadRad, /** @type {?} */ height;
        var /** @type {?} */ i, /** @type {?} */ padRad, /** @type {?} */ radius, /** @type {?} */ ref, /** @type {?} */ sectionIndx;
        var /** @type {?} */ sectionPerc, /** @type {?} */ startPadRad, /** @type {?} */ svg, /** @type {?} */ totalPercent, /** @type {?} */ width;
        this.numSections = this.options.bandPercent.length;
        padRad = 0;
        chartInset = 10;
        totalPercent = .75;
        el = select(this.container.nativeElement);
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
            arcEndRad = arcStartRad + Utils.percToRad(0.5 * this.options.bandPercent[sectionIndx - 1]);
            totalPercent += 0.5 * this.options.bandPercent[sectionIndx - 1];
            startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
            endPadRad = sectionIndx === this.numSections ? 0 : padRad / 2;
            arc$$1 = arc()
                .outerRadius(radius - chartInset)
                .innerRadius(radius - chartInset - this.barWidth)
                .startAngle(arcStartRad + startPadRad)
                .endAngle(arcEndRad - endPadRad);
            var /** @type {?} */ color = this.options.bandColor[sectionIndx - 1];
            this.chart.append('path').style('fill', color).attr('d', arc$$1);
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

var ColorGuageModule = /** @class */ (function () {
    function ColorGuageModule() {
    }
    /**
     * @return {?}
     */
    ColorGuageModule.forRoot = function () {
        return {
            ngModule: ColorGuageModule
        };
    };
    ColorGuageModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        GuageWithColorBandComponent
                    ],
                    exports: [
                        GuageWithColorBandComponent
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    ColorGuageModule.ctorParameters = function () { return []; };
    return ColorGuageModule;
}());

export { ColorGuageModule };
