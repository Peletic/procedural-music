import {Measure} from "@/src/units/measure";

export default class Stave {
    public measures : Measure[] = []

    constructor(public bpm : number) {}

    public put(measure : Measure) {
        this.measures.push(measure)
    }

    public static from(measures : Measure[], bpm?: number) : Stave {
        const stave = new Stave(bpm ? bpm : 120);
        stave.measures = measures;
        return stave;
    }
}