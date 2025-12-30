//@ts-nocheck
// 1 = up, 2 = down, 3 = up down, 4 = down up

import {Beat, BeatLevel} from "@/src/units/beat";
import {ElementPosition, IMeasureElement, Position} from "@/src/units/measure";
import {Pitch} from "@/src/units/pitch";
import {Note} from "@/src/units/note";

export function arpeggiate({chord, rhythm}: {
    chord: Pitch[],
    rhythm?: Beat[]
}, root: Pitch | number, pattern: 1 | 2, durationBase: BeatLevel, offset = 0): {
    element: IMeasureElement,
    position: Position
}[] {
    const res: IMeasureElement[] = []

    const up: { element: Note, position: Position }[] = []
    const down: { element: Note, position: Position }[] = []
    chord.sort((a, b) => (a.value - b.value))


    for (let n = 0; n < chord.length; n++) {
        const pitch = chord[n];

        up.push({
            element: new Note(Pitch.of(root + pitch.value - 1).tone_octave, new Beat(`1/${durationBase}`)),
            position: new Position(n + 1 + offset, durationBase)
        })
    }

    for (let n = 0; n < chord.length; n++) {
        const pitch = chord[chord.length - (n + 1)];

        down.push({
            element: new Note(Pitch.of(root + pitch.value - 1).tone_octave, new Beat(`1/${durationBase}`)),
            position: new Position(n + 1 + offset, durationBase)
        })
    }


    switch (pattern) {
        case 1: {
            res.push(...up)
            break
        }
        case 2: {
            res.push(...down)
            break
        }
    }


    return res
}
