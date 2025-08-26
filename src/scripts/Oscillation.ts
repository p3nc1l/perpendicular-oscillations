export class Oscillation {
    public amplitude: number;
    public frequency: number;
    public initialPhase: number;

    public constructor(amplitude: number, frequency: number, initialPhase: number) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.initialPhase = initialPhase;
    }

    public value(timestamp: number) {
        return this.amplitude * Math.sin(2 * Math.PI * this.frequency * timestamp + this.initialPhase * Math.PI);
    }
}