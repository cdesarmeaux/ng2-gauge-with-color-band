import { GuageWithColorBandComponent } from './gauge';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
function ColorGuageModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ColorGuageModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ColorGuageModule.ctorParameters;
}
