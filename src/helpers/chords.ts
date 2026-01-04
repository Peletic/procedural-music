import {Chord, CHORDS, Voicing} from "@/src/units/chord";

export const ALL_APPLIED_CHORDS = CHORDS.flatMap((Chord) => new Array(12).fill(12).map((n, idx) => new Chord(idx)))
export function notesHarmonicWith(chord : Voicing) {
    const notes = chord.notes.map((note) => note.valueOf() )
    const thirds = notes.flatMap((note) => [note - 4, note + 4, note])
    console.log([...new Set(thirds)])
    return [...new Set(thirds)]
}