export class Rezges {
    public amplitudo: number;
    public frekvencia: number;
    public kezdoFazis: number;

    public constructor(amplitudo: number, frekvencia: number, kezdoFazis: number) {
        this.amplitudo = amplitudo;
        this.frekvencia = frekvencia;
        this.kezdoFazis = kezdoFazis;
    }

    public ertek(pillanat: number) {
        return this.amplitudo * Math.sin(2 * Math.PI * this.frekvencia * pillanat + this.kezdoFazis * Math.PI);
    }
}