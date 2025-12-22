import {NumRange, Permutations} from "../helpers/types";

export type Octave = "1" | "2" | "3" | "4" | "5" | "6" | "7";

export type WholeStep = "C" | "D" | "E" | "F" | "G" | "A" | "B"
export type HalfStep = "C#" | "D#" | "F#" | "G#" | "A#"

export type RedundantHalfStep = "Db" | "Eb" | "Gb" | "Ab" | "Bb"

export type Semitone = WholeStep | HalfStep


export type Tone = Semitone | RedundantHalfStep
export type ToneOctave = "A0" | "A#0" | "Bb0" | "B0" | Permutations<Tone, Octave> | "C8"

export const NUMBER_WHOLE_STEP : {[p in WholeStep]: number} = {
    C: 0,
    D: 1,
    E: 2,
    F: 3,
    G: 4,
    A: 5,
    B: 6
}

export const NUMBER_TONE_LOOKUP: { [p in NumRange<0, 11>]: Semitone } = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B"
};

export const TONE_NUMBER_LOOKUP: { [p in Semitone]: NumRange<0, 11> } = Object.fromEntries(Object.entries(NUMBER_TONE_LOOKUP).map(([str, tone]) => [tone as Semitone, parseInt(str) as NumRange<0, 11>])) as { [p in Semitone]: NumRange<0, 11> };

export const REDUNDANT_TONE_LOOKUP: { [p in Tone]: Semitone } = {
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
    A: "A",
    B: "B",
    "C#": "C#",
    "D#": "D#",
    "F#": "F#",
    "G#": "G#",
    "A#": "A#",
    Db: "C#",
    Eb: "D#",
    Gb: "F#",
    Ab: "G#",
    Bb: "A#"
}