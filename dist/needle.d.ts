export declare class Needle {
    private length;
    private radius;
    constructor(len: number, radius: number);
    DrawOn(el: any, perc: any): void;
    AnimatedOn(el: any, lastValue: any, currValue: any, sectionCount: any): void;
    private mkCmd(perc);
}
