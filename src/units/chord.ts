import {NUMBER_TONE_LOOKUP, Octave, Tone, TONE_NUMBER_LOOKUP} from "@/src/units/tone";
import {Pitch} from "@/src/units/pitch";
import {NumRange} from "@/src/helpers/types";
import {Note} from "@/src/units/note";
import {Beat, NoteDuration} from "@/src/units/beat";

export abstract class Chord {
    public root: Tone
    public rootValue: number

    public notes: Tone[] = []
    public noteValues: number[] = []

    abstract get type(): string

    protected abstract get name(): string

    protected abstract get noteIntervals(): number[]

    protected constructor(root: Tone | number) {
        if (typeof root === "number") {
            this.root = NUMBER_TONE_LOOKUP[root % 12 as NumRange<0, 11>]
            this.rootValue = root
        } else {
            this.root = root
            this.rootValue = TONE_NUMBER_LOOKUP[root]
        }

        this.init()
    }

    protected init() {
        for (const interval of this.noteIntervals) {
            this.notes.push(Pitch.of(this.rootValue + interval).tone)
            this.noteValues.push(this.rootValue + interval)
        }
    }

    public toString(): string {
        return `${this.root} ${this.name}`
    }
}

export abstract class TriadChord extends Chord {
    get type() {
        return "Triad"
    }
}

export class MajorTriadChord extends TriadChord {
    get name() {
        return "Major"
    }

    get noteIntervals() {
        return [0, 4, 7]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class MinorTriadChord extends TriadChord {
    get name() {
        return "Minor"
    }

    get noteIntervals() {
        return [0, 3, 7]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class AugmentedTriadChord extends TriadChord {
    get name() {
        return "Augmented"
    }

    get noteIntervals() {
        return [0, 4, 8]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class DiminishedTriadChord extends TriadChord {
    get name() {
        return "Diminished"
    }

    get noteIntervals() {
        return [0, 3, 6]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export abstract class SuspendedChord extends TriadChord {
}

export class SecondSuspendedChord extends SuspendedChord {
    get name() {
        return "Suspended 2nd"
    }

    get noteIntervals() {
        return [0, 2, 7]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class FourthSuspendedChord extends SuspendedChord {
    get name() {
        return "Suspended 4th"
    }

    get noteIntervals() {
        return [0, 5, 7]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export abstract class TetradChord extends Chord {
    get type() {
        return "Tetrad"
    }
}

export abstract class SeventhChord extends TetradChord {
}

export class DominantSeventhChord extends SeventhChord {
    get name() {
        return "7th"
    }

    get noteIntervals() {
        return [0, 4, 7, 10]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class MajorSeventhChord extends SeventhChord {
    get name() {
        return "Major 7th"
    }

    get noteIntervals() {
        return [0, 4, 7, 11]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class MinorSeventhChord extends SeventhChord {
    get name() {
        return "Minor 7th"
    }

    get noteIntervals() {
        return [0, 3, 7, 10]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class DiminishedSeventhChord extends SeventhChord {
    get name() {
        return "Diminished 7th"
    }

    get noteIntervals() {
        return [0, 3, 6, 9]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class Voicing {
    public chord: Chord
    public inversion: number
    public octave: Octave

    public get notes(): Pitch[] {
        const offset = parseInt(this.octave) * 12 + 12
        const chordNotes = this.chord.noteValues
        if (this.inversion > 0) {
            return [...chordNotes.slice(this.inversion - 1), ...chordNotes.slice(0, this.inversion - 1).map((val) => val + 12)].map((noteValue) => new Pitch(noteValue + offset))
        } else {
            return chordNotes.map((noteValue) => new Pitch(noteValue + offset))
        }
    }

    constructor(chord: Chord, inversion: number = 0, octave: Octave | number = "4") {
        this.chord = chord
        this.inversion = inversion % chord.noteValues.length
        this.octave = octave.toString() as Octave
    }

    toNotes(duration: NoteDuration): Note[] {
        return this.notes.map((pitch) => new Note(pitch, new Beat(duration)))
    }
}

export const TRIAD_CHORDS = [MajorTriadChord, MinorTriadChord, AugmentedTriadChord, DiminishedTriadChord, SecondSuspendedChord, FourthSuspendedChord]
export const TETRAD_CHORDS = [DominantSeventhChord, MajorSeventhChord, MinorSeventhChord, DiminishedSeventhChord]
export const CHORDS = [...TRIAD_CHORDS, ...TETRAD_CHORDS]
export type Chords = typeof CHORDS[number]