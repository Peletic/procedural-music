import {ToneOctave} from "./tone";
import {Beat} from "./beat";
import {IMeasureElement} from "./measure";
import {Pitch} from "@/src/units/pitch";

export class Note implements IMeasureElement {
    duration: Beat
    note: ToneOctave

    constructor(note: ToneOctave | Pitch | number, duration: Beat) {
        this.duration = duration
        if (typeof note === "number") {
            this.note = Pitch.of(note).tone_octave
        } else if (note instanceof Pitch) {
            this.note = note.tone_octave
        } else {
            this.note = note
        }

    }
}

export class Rest implements IMeasureElement {
    constructor(public duration: Beat) {
    }
}