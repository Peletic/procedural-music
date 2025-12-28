import {Tone, ToneOctave} from "./tone";
import {Beat} from "./beat";
import {IMeasureElement} from "./measure";

export class Note implements IMeasureElement {
    duration : Beat
    note : ToneOctave
    constructor(note : ToneOctave,  duration : Beat) {
        this.duration = duration
        this.note = note
    }
}

export class Rest implements IMeasureElement {
    constructor(public duration : Beat) {}
}