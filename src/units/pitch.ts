import {NUMBER_TONE_LOOKUP, Octave, Semitone, Tone, TONE_NUMBER_LOOKUP, ToneOctave} from "./tone";
import {NumRange} from "../helpers/types";

export class Pitch  {
    public tone : Tone
    public octave : Octave
    public tone_octave : ToneOctave
    constructor(public value: number) {
        this.tone = NUMBER_TONE_LOOKUP[((this.value) % 12) as NumRange<0, 11>]
        this.octave = Math.trunc(((value)/12)) - 1 as unknown as Octave
        this.tone_octave = `${this.tone}${this.octave}`
    }

    public static of(val : number | Tone | ToneOctave) {
        if (typeof val == "number") {
            return new Pitch(val)
        } else {
            return new Pitch(
                TONE_NUMBER_LOOKUP[val.toString().replace(/(0|[1-9]|1[01])/g, "") as Semitone]
                + (parseInt(val.toString().replace(/\D/g, "")) * 12 + 12))
        }
    }
}