import {ToneOctave} from "./tone";
import {Beat} from "./beat";
import {IMeasureElement} from "./measure";

export class Note implements IMeasureElement {
    constructor(public note : ToneOctave, public duration : Beat) {}
}

export class Rest implements IMeasureElement {
    constructor(public duration : Beat) {}
}