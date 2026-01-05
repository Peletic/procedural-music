import {NumRange} from "@/src/helpers/types";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";
import {Tone} from "@/src/units/tone";
import {Logger} from "@/src/helpers/log";

// Arbitrary scale of dissonance
export type Dissonance = NumRange<0, 10>

export const DISSONANT_ZONE_RANGE = 0.137
export const DISSONANT_ZONE_D_START = 0.04
export const UPPER_DISSONANT_ZONE = [(1 + DISSONANT_ZONE_D_START), (1 + DISSONANT_ZONE_D_START + DISSONANT_ZONE_RANGE)]

const LoggerInstance = new Logger("dissonance")

export function measureDissonance(noteA: Note | Pitch, noteB: Note | Pitch): Dissonance {
    // https://protonsforbreakfast.wordpress.com/2025/08/05/musical-dissonance-and-harmony/

    const frequencyA = pitchToFrequency(Pitch.of(noteA))
    const frequencyB = pitchToFrequency(Pitch.of(noteB))
    let ratio = frequencyA / frequencyB
    if (ratio < 1) ratio = Math.pow(ratio, -1)
    LoggerInstance.log(`Ratio: ${ratio} for ${frequencyA} / ${frequencyB} of ${Pitch.of(noteA).tone_octave}/${Pitch.of(noteB).tone_octave}`)


    let val = 0

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

export function netDissonance(...pitches: Pitch[] | Tone[]) {
    if (typeof pitches[0] === "string") pitches = pitches.map((tone) => Pitch.of(tone))

    const num = pitches.length
    let sum = 0

    for (let x = 0; x < num; x++) {
        for (let y = x + 1; y < num; y++) {
            let pair

            pair = pitches[y]

            LoggerInstance.log(`Pair: ${pitches[x]}x${pair} = ${measureDissonance(pitches[x] as Pitch, pair as Pitch)}`)
            sum += measureDissonance(pitches[x] as Pitch, pair as Pitch)
        }
    }

    return sum / num
}