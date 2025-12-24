// huge thanks to https://docs.google.com/document/d/12UO2Vizm4o3paJ08Hgs541Wl6exMUg5Kfa-8G2B3oPQ/edit?tab=t.0

import {Beat, NoteDuration} from "@/src/units/beat";
import {Note} from "@/src/units/note";
import {Pitch} from "./pitch";

export type triad = [number, number, number]
export const C_TRIADS: { [name: string]: triad } = {
    "Cmaj": [1, 5, 8],
    "Cmin": [1, 4, 8],
    "Cdim": [1, 4, 7],
    "Csus4": [1, 6, 8],
    "Csus#4": [1, 7, 8],
    "Cmaj7no5": [1, 5, 12],
    "C7no5": [1, 5, 11],
    "C(#11)no5": [1, 5, 7],
    "Cadd2no5": [1, 3, 5],
    "Cminmaj7no5": [1, 4, 12],
    "Cminadd4no5": [1, 4, 6]
}

export type tetrad = [number, number, number, number]
export const C_TETRADS: { [name: string]: tetrad } = {
    "Cmaj7": [1, 5, 8, 12],
    "C7": [1, 5, 8, 11],
    "C6": [1, 5, 8, 10],
    "Cadd#4": [1, 5, 7, 8],
    "Cadd4": [1, 5, 6, 8],
    "C(#9/b10)": [1, 4, 5, 8],
    "Cadd2": [1, 3, 5, 8],
    "C(b9)": [1, 2, 5, 8],
    "Cminmaj7": [1, 4, 8, 12],
    "Cmin7": [1, 4, 8, 11],
    "Cmin6": [1, 4, 8, 10],
    "Cminadd#4": [1, 4, 7, 8],
    "Cminadd4": [1, 4, 6, 8],
    "Cminadd2": [1, 3, 4, 8],
    "Cminadd(b9)": [1, 2, 4, 8],
    "Cdim7b5": [1, 4, 7, 12],
    "Cdim7": [1, 4, 7, 10],
    "Cdimadd4": [1, 4, 6, 7],
    "Caugmaj7": [1, 5, 9, 12],
    "Caug7": [1, 5, 9, 11],
    "Cmaj7sus4": [1, 6, 8, 12],
    "C7sus4": [1, 6, 8, 11],
    "Csus4(#11/b12)": [1, 6, 7, 8],
    "Cmaj7sus#4": [1, 7, 8, 12],
    "C7sus#4": [1, 7, 8, 11],
    "C6sus#4": [1, 7, 8, 10],
    "Cmaj7(#11)no5": [1, 5, 7, 12],
    "C7b5": [1, 5, 7, 11],
    "Cmaj7(#9)no5": [1, 4, 5, 12],
    "Cmaj7(9)no5": [1, 3, 5, 12],
    "C7(9)no5": [1, 3, 5, 11],
    "Cminmaj7(9)no5": [1, 3, 4, 12],
    "Cmin7(9)no5": [1, 3, 4, 11],
    "Cmin7(b9)no5": [1, 2, 4, 11]
}

export class Chord {
    public static apply(root: number, chord: triad | tetrad) {
        return chord.map((el) => el + root - 1)
    }

    public static toNotes(root: number, chord: triad | tetrad, duration: NoteDuration) {
        const applied = Chord.apply(root, chord)
        return applied.map((val) => new Note(Pitch.of(val).tone_octave, new Beat(duration)))
    }
}