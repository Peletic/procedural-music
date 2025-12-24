import {NumRange} from "@/src/helpers/types";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";

// Arbitrary scale of dissonance
export type Dissonance = NumRange<0, 10>

export const DISSONANT_ZONE_RANGE = 0.167
export const DISSONANT_ZONE_D_START = 0.04
export const LOWER_DISSONANT_ZONE = [(1 - DISSONANT_ZONE_RANGE - DISSONANT_ZONE_D_START), (1 - DISSONANT_ZONE_D_START)]
export const UPPER_DISSONANT_ZONE = [(1 + DISSONANT_ZONE_D_START), (1 + DISSONANT_ZONE_D_START + DISSONANT_ZONE_RANGE)]

export const DISSONANCE_FALLOUT_ZONE = 0.5

export function measureDissonance(noteA: Note | Pitch, noteB: Note | Pitch): Dissonance {
    // whew .........
    // this is going to be HEAVILY based on my own ears

    // starting off of
    // https://protonsforbreakfast.wordpress.com/2025/08/05/musical-dissonance-and-harmony/

    const frequencyA = pitchToFrequency(Pitch.of(noteA))
    const frequencyB = pitchToFrequency(Pitch.of(noteB))
    const ratio = frequencyA / frequencyB
    console.log(`Ratio: ${ratio}`)
    const lower = ratio < 1

    let val = 0

    if (lower) {
        const isInLowerBounds = LOWER_DISSONANT_ZONE[0] <= ratio && ratio <= LOWER_DISSONANT_ZONE[1]
        const isInFallout = (1 - DISSONANCE_FALLOUT_ZONE) < ratio && ratio < LOWER_DISSONANT_ZONE[1]

        if (isInLowerBounds) {
            val += 5

            // might work on making it weightier depending on how close it is to the peak perceived
            /*
            const peakDissonance = 1 - DISSONANT_ZONE_D_START * 2

            val += (ratio / peakDissonance*/
        } /*else if (isInFallout && !isInLowerBounds) {
            val += 1

            const d = (1 - DISSONANCE_FALLOUT_ZONE) - ratio

        }*/
    } else if (!lower) {
        const isInUpperBounds = UPPER_DISSONANT_ZONE[0] <= ratio && ratio <= UPPER_DISSONANT_ZONE[1]
        const isInFallout = (1 + DISSONANCE_FALLOUT_ZONE) > ratio && ratio > UPPER_DISSONANT_ZONE

        if (isInUpperBounds) {
            val += 5

        } /*else if (isInFallout && !isInUpperBounds) {
            val += 1

            const falloutScale = LOWER_DISSONANT_ZONE[0] - (1 - DISSONANCE_FALLOUT_ZONE)

            val += Math.floor(3 * ((falloutScale / (ratio - (1 + DISSONANCE_FALLOUT_ZONE))) - 1))
        }*/
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

export function netDissonance(...pitches : Pitch[]) {
    const num = pitches.length
    let sum = 0

    for (let x = 0; x < num; x++) {
        for (let y = x + 1; y <= num; y++) {
            let pair
            if (y === num) {
                pair = pitches[0]
            } else {
                pair = pitches[y]
            }

            sum += measureDissonance(pitches[x], pair)
        }
    }

    return sum/num
}
