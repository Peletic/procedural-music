import {NUMBER_TONE_LOOKUP, Tone, TONE_NUMBER_LOOKUP} from "@/src/units/tone";

export abstract class Scale {
    public root: Tone
    public rootValue: number

    public notes: Tone[7] = []
    public noteValues: number[7] = []

    abstract get intervals(): number[7]

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
}

export class MajorScale extends Scale {
    get intervals() {
        return [0, 2, 2, 1, 2, 2, 2, 1]
    }

    constructor(root: Tone | number) {
        super(root);
    }

}

export class MinorScale extends Scale {
    get intervals() {
        return [0, 2, 1, 2, 2, 1, 2, 2]
    }

    constructor(root: Tone | number) {
        super(root);
    }
}