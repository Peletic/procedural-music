import {CHORDS} from "@/src/units/chord";

export const ALL_APPLIED_CHORDS = CHORDS.flatMap((Chord) => new Array(12).fill(12).map((n, idx) => new Chord(idx)))
//console.log(ALL_APPLIED_CHORDS.map((chord) => chord.toString()))