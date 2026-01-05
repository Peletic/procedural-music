import {Tone, TONE_NUMBER_LOOKUP, ToneOctave} from "@/src/units/tone";
import {Scale, SCALES} from "@/src/units/scale";
import {Logger} from "@/src/helpers/log";

const LoggerInstance = new Logger("scales")

export const ALL_SCALES = genAllScales()

export function matchingScales(notes: ToneOctave[] | Tone[] | number[]) {
    if (typeof notes[0] !== "number") {
        notes = notes.map((pitch) => TONE_NUMBER_LOOKUP[pitch.toString().split("::")[0] as Tone])
        LoggerInstance.log(notes)
    } else {
        notes = notes.map((noteValue) => (noteValue as number) % 12)
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
        LoggerInstance.log(ScaleType.name)
        for (let i = 0; i < 12; i++) {
            scales.push(new ScaleType(i))
        }
    }

    return scales
}
