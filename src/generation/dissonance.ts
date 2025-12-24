import {NumRange} from "@/src/helpers/types";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";

// Arbitrary scale of dissonance
export type Dissonance = NumRange<0, 10>

export const DISSONANT_ZONE_RANGE = 0.137
export const DISSONANT_ZONE_D_START = 0.04
export const UPPER_DISSONANT_ZONE = [(1 + DISSONANT_ZONE_D_START), (1 + DISSONANT_ZONE_D_START + DISSONANT_ZONE_RANGE)]

console.log(`${UPPER_DISSONANT_ZONE}`)

export const DISSONANCE_FALLOUT_ZONE = 0.5

export function measureDissonance(noteA: Note | Pitch, noteB: Note | Pitch): Dissonance {
    // whew .........
    // this is going to be HEAVILY based on my own ears

    // starting off of
    // https://protonsforbreakfast.wordpress.com/2025/08/05/musical-dissonance-and-harmony/

    const frequencyA = pitchToFrequency(Pitch.of(noteA))
    const frequencyB = pitchToFrequency(Pitch.of(noteB))
    let ratio = frequencyA / frequencyB
    if (ratio < 1) ratio = Math.pow(ratio, -1)
    //console.log(`Ratio: ${ratio} for ${frequencyA} / ${frequencyB} of ${Pitch.of(noteA).tone_octave}/${Pitch.of(noteB).tone_octave}`)


    let val = 0


    //console.log(`${UPPER_DISSONANT_ZONE[0] <= ratio} lower ${ratio <= UPPER_DISSONANT_ZONE[1]} upper`)
    const isInUpperBounds = UPPER_DISSONANT_ZONE[0] <= ratio && ratio <= UPPER_DISSONANT_ZONE[1]

    if (isInUpperBounds) {
        val += 5
    }


    return val as Dissonance
}

export function pitchToFrequency(pitch: Pitch): number {
    // n = pitch - a4
    // f = 2^(n/12)*440
    const referencePitch = Pitch.of("A4").value
    const relativePitch = pitch.value - referencePitch
    return Math.pow(2, relativePitch / 12) * 440;

}

export function netDissonance(...pitches: Pitch[]) {
    const num = pitches.length
    let sum = 0

    for (let x = 0; x < num; x++) {
        for (let y = x + 1; y < num; y++) {
            let pair

                pair = pitches[y]

            console.log(`Pair: ${pitches[x]}x${pair} = ${measureDissonance(pitches[x], pair)}`)
            sum += measureDissonance(pitches[x], pair)
        }
    }

    return sum / num
}
/*
const cd = measureDissonance("C4", "D4")
const cs = measureDissonance("C4", "D#4")
const ce = measureDissonance("E4", "G4")

console.log(`${cd} ${cs} ${ce}`)*/
