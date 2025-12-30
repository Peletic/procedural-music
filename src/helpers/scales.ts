import {TONE_NUMBER_LOOKUP, ToneOctave, Tone, WHOLE_STEPS, HALF_STEPS} from "@/src/units/tone";
import {SCALES} from "@/src/units/scale";

const ALL_SCALES = genAllScales()

export function matchesScales(notes: ToneOctave[] | Tone[] | number[]) {
    if (typeof notes[0] !== "number") {
        notes = notes.map((pitch) => TONE_NUMBER_LOOKUP[pitch.toString().split("::")[0] as Tone])
    } else {
        notes = notes.map((noteValue) => noteValue % 12)
    }

    const matchingScales : Scale[] = []

    for (const scale of ALL_SCALES) {
        if (notes.every((value) => scale.noteValues.includes(value))) {
            matchingScales.push(scale)
        }
    }

    return matchingScales
}

function genAllScales() : Scale[] {
    const scales = []
    for (const ScaleType of SCALES) {
        for (const step of [...WHOLE_STEPS, ...HALF_STEPS]) {
            scales.push(new ScaleType(step as Tone))
        }
    }

    return scales
}