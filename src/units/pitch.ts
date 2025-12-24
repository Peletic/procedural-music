import {NUMBER_TONE_LOOKUP, Octave, Semitone, Tone, TONE_NUMBER_LOOKUP, ToneOctave} from "./tone";
import {NumRange} from "../helpers/types";


export class Pitch {
    public tone: Tone
    public octave: Octave
    public tone_octave: ToneOctave

    constructor(public value: number) {
        this.tone = NUMBER_TONE_LOOKUP[((this.value) % 12) as NumRange<0, 11>]
        this.octave = Math.trunc(((value) / 12)) - 1 as unknown as Octave
        this.tone_octave = `${this.tone}${this.octave}`
    }

    public static of(val: number | Tone | ToneOctave | Pitch) {
        if (typeof val == "number") {
            return new Pitch(val)
        } else {
            let value = val
            if (val instanceof Pitch) {
                value = val.tone_octave
            }
            return new Pitch(
                TONE_NUMBER_LOOKUP[value.toString().replace(/(0|[1-9]|1[01])/g, "") as Semitone]
                + (parseInt(value.toString().replace(/\D/g, "")) * 12 + 12))
        }
    }

    public toString() {
        return this.tone_octave
    }

    [Symbol.toPrimitive](hint: string) {
        if (hint === "default") {
            return this.tone_octave
        } else if (hint === "number") {
            return this.value
        } else if (hint === "string") {
            return this.tone_octave
        }
    }
}