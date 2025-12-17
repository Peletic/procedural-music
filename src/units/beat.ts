// our level 0 is /4 which means that 1, 0 is a quarter note, 1 -2 is a whole note

import {NumRange} from "../helpers/types";

export class Beat {
    constructor(length, level) {

    }
}

export type BeatLevel = NumRange<-2, 4>