import { IGaugeOptions } from './gaugeOptions';
import { AfterViewInit, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class GuageWithColorBandComponent implements AfterViewInit, OnInit, OnChanges, DoCheck {
    private svgHeight;
    private margin;
    private needle;
    private valueLabel;
    private numSections;
    private chart;
    private barWidth;
    private gaugeInitDone;
    private needleLength;
    private needleCircleSize;
    private oldGaugeValue;
    container: ElementRef;
    options: IGaugeOptions;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    private checkInput();
    private animateLabel(prevValue, targetValue);
    private initNeedle();
    private resetNeedle();
    private drawNeedle(lastPercent, currPercent);
    private initGauge();
}
