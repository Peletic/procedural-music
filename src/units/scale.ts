import {NUMBER_TONE_LOOKUP, Tone, TONE_NUMBER_LOOKUP} from "@/src/units/tone";

export abstract class Scale {
    public root: Tone
    public rootValue: number

    public notes: Tone[] = []
    public noteValues: number[] = []

    abstract get intervals(): number[]
    abstract get scaleName(): string

    protected constructor(root: Tone | number) {
        if (typeof root === 'number') {
            this.root = NUMBER_TONE_LOOKUP[root]
            this.rootValue = root
        } else {
            this.root = root
            this.rootValue = TONE_NUMBER_LOOKUP[root]
        }

        let sum = 0
        for (const interval of this.intervals) {
            sum += interval
            this.notes.push(NUMBER_TONE_LOOKUP[(this.rootValue + sum) % 12])
            this.noteValues.push(this.rootValue + sum)
        }
    }

    toString() {
        return `${this.root} ${this.scaleName} Scale`
    }
}

export class MajorScale extends Scale {
    get intervals() {
        return [0, 2, 2, 1, 2, 2, 2, 1]
    }

    get scaleName() {
        return "Major"
    }

    constructor(root: Tone | number) {
        super(root);
    }

}

export class MinorScale extends Scale {
    get intervals() {
        return [0, 2, 1, 2, 2, 1, 2, 2]
    }

    get scaleName() {
        return "Minor"
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class MajorPentatonicScale extends Scale {
    get intervals() {
        return [0, 2, 2, 3, 2, 3]
    }

    get scaleName() {
        return "Major Pentatonic"
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export class MinorPentatonicScale extends Scale {
    get intervals() {
        return [0, 3, 2, 2, 3, 2]
    }

    get scaleName() {
        return "Minor Pentatonic"
    }

    constructor(root: Tone | number) {
        super(root);
    }
}

export const SCALES = [MajorScale, MinorScale, MajorPentatonicScale, MinorPentatonicScale]
export type Scales = typeof SCALES[number]