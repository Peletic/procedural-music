import {HALF_STEPS, Tone, TONE_NUMBER_LOOKUP, ToneOctave, WHOLE_STEPS} from "@/src/units/tone";
import {MinorPentatonicScale, Scale, SCALES} from "@/src/units/scale";
import {MinorTriadChord} from "@/src/units/chord";

export const ALL_SCALES = genAllScales()

export function matchingScales(notes: ToneOctave[] | Tone[] | number[]) {
    if (typeof notes[0] !== "number") {
        notes = notes.map((pitch) => TONE_NUMBER_LOOKUP[pitch.toString().split("::")[0] as Tone])
        console.log(notes)
    } else {
        notes = notes.map((noteValue) => noteValue % 12)
    }
    const matchingScales: Scale[] = []

    for (const scale of ALL_SCALES) {
        if (notes.every((value) => scale.noteValues.some((predicate) => predicate % 12 == value % 12))) {
            matchingScales.push(scale)
        }
    }

    return matchingScales
}

function genAllScales(): Scale[] {
    const scales = []
    for (const ScaleType of SCALES) {
        console.log(ScaleType.name)
        for (let i = 0; i < 12; i++) {
            scales.push(new ScaleType(i))
        }
    }

    return scales
}
