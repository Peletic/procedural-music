import {Chord, CHORDS} from "@/src/units/chord";
import {Tone} from "@/src/units/tone";
import {Logger} from "@/src/helpers/log";

export const ALL_APPLIED_CHORDS = CHORDS.flatMap((Chord) => new Array(12).fill(12).map((n, idx) => new Chord(idx)))

const LoggerInstance = new Logger("chords")

export function includesAllNotes(chord : Chord, notes : Tone[]) : boolean {
    const chordNotes = chord.notes
    for (const note of notes) {
        if (!chordNotes.includes(note)) {
            //console.log(`Chord: ${chord.toString()} ${chordNotes} : ${note}`)
            return false
        }
    }

    LoggerInstance.log(`Chord: ${chord.toString()} chord notes: ${chordNotes}, notes: ${notes}`)
    return true
}