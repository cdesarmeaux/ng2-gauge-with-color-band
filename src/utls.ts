export class Utils {
    public static percToDeg(perc: number): number {
        return perc * 360;
    };

    public static percToRad(perc: number): number {
        return this.degToRad(this.percToDeg(perc));
    };

    public static degToRad(deg: number): number {
        return deg * Math.PI / 180;
    };
}