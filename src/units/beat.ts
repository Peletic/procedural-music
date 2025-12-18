// length out of 2^n-1
// allowed for dotted notes by 1.5
import {JoinedNumberCombinations, NumRange} from "../helpers/types";

export class Beat {
    constructor(length : BeatLength , level : BeatLevel) {
        const duration = length === 1 ? 1 : 3
        const denominator = length === 1 ? Math.pow(2, level-1) : Math.pow(2, level)
    }
}

export type BeatLevel = NumRange<1, 6>
export type BeatLength = 1 | 1.5
export type NoteDuration = JoinedNumberCombinations<"/", BeatLength, BeatLevel>

const test : {[p in NoteDuration]: number}= {

}
console.log(test)