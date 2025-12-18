// length out of 2^n-1
// allowed for dotted notes by 1.5
import {JoinedNumberCombinations, NumRange} from "../helpers/types";

export class Beat {
    public denominator : number
    public dotted : boolean
    public name : string

    constructor(duration : NoteDuration) {
        let drSplit = duration.toString().split("/")
        this.denominator = parseInt(drSplit[1])
        this.dotted = duration[0].endsWith(".5")
        this.name = BEAT_NAMES[duration]
    }
}

export type BeatLevel = NumRange<1, 6>
export type BeatLength = 1 | 1.5
export type NoteDuration = JoinedNumberCombinations<"/", BeatLength, BeatLevel>

export const FULL_BEAT_NAMES : {[p in JoinedNumberCombinations<"/", 1, BeatLevel>]: string}= {
    "1/1": "whole_note",
    "1/2": "half_note",
    "1/3": "quarter_note",
    "1/4": "eighth_note",
    "1/5": "sixteenth_note",
    "1/6": "thirty_second_note"
}
export const DOTTED_BEAT_NAMES : {[p in JoinedNumberCombinations<"/", 1.5, BeatLevel>]: string} = Object.fromEntries(Object.entries(FULL_BEAT_NAMES).map(([key, val]) => [key.replace("1/", "1.5/"), `dotted_${val}`])) as unknown as {[p in JoinedNumberCombinations<"/", 1.5, BeatLevel>]: string}
export const BEAT_NAMES : {[p in NoteDuration]: string} = {...FULL_BEAT_NAMES, ...DOTTED_BEAT_NAMES}
