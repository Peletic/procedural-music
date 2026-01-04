import {ToneOctave} from "./tone";
import {Beat, NoteDuration} from "./beat";
import {MeasureElement} from "./measure";
import {Pitch} from "@/src/units/pitch";

export class Note implements MeasureElement {
    duration: Beat
    note: ToneOctave

    constructor(note: ToneOctave | Pitch | number, duration: Beat | NoteDuration) {
        if (typeof duration === "string") {
            this.duration = new Beat(duration)
        } else {
            this.duration = duration
        }
        if (typeof note === "number") {
            this.note = Pitch.of(note).tone_octave
        } else if (note instanceof Pitch) {
            this.note = note.tone_octave
        } else {
            this.note = note
        }

    }
}

export class Rest implements MeasureElement {
    constructor(public duration: Beat) {
    }
}