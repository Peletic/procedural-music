import Stave from "../units/stave";
import {RandomNumberGenerator} from "@/src/helpers/random";
import {C_TETRADS, C_TRIADS, Chord} from "@/src/units/chord";
import {IMeasureElement, Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";
import {Beat} from "@/src/units/beat";

export class MusicGenerator {

    generate(length: number, bpm: number, args: MusicGeneratorArgs, seed?: string) {
        const stave = new Stave(bpm)
        const random = new RandomNumberGenerator(seed)

        const chordsInProgression = random.randomInRange(args.minChordsInProgression, args.maxChordsInProgression)
        const baseRoot = random.randomInRange(args.minRoot, args.maxRoot)
        const startingRoot = random.randomInRange(args.minProgressionRootDelta, args.maxProgressionRootDelta) * (random.randomInRange(1, 2) === 1 ? 1 : -1) + baseRoot
        const progression = []

        const numChords = Object.entries(C_TETRADS).length + Object.entries(C_TRIADS).length
        const getChord = (idx: number) => {
            const numTetrad = Object.entries(C_TETRADS).length

            if (idx < numTetrad) {
                return Object.entries(C_TETRADS)[idx]
            } else {
                let newNum = idx - numTetrad
                console.log(Object.entries(C_TRIADS) + " at idx " + newNum)
                return Object.entries(C_TRIADS)[newNum]
            }
        }

        if (true) {
            const chordIdx = random.randomInRange(1, numChords)
            const chord = getChord(chordIdx - 1)

            console.log(chord)
            console.log(chordIdx)
            console.log(chord[1])

            const rawChord = chord[1]

            progression.push({
                applied: Chord.apply(startingRoot, rawChord),
                root: startingRoot,
                baseChordName: chord[0]
            })
        }

        for (let i = 0; i < chordsInProgression - (args.loop ? 2 : 1); i++) {
            const chordIdx = random.randomInRange(1, numChords)
            const chord = getChord(chordIdx - 1)

            console.log(chord)
            console.log(chordIdx)
            console.log(chord[1])

            const rawChord = chord[1]

            const rootDelta = random.randomInRange(args.minProgressionRootDelta, args.maxProgressionRootDelta) * (random.randomInRange(1, 2) === 1 ? 1 : -1)
            progression.push({
                applied: Chord.apply(baseRoot + rootDelta, rawChord),
                root: baseRoot + rootDelta,
                baseChordName: chord[0]
            })
        }

        if (args.loop) {
            const chordIdx = random.randomInRange(1, numChords)
            const chord = getChord(chordIdx - 1)

            console.log(chord)
            console.log(chordIdx)
            console.log(chord[1])

            const rawChord = chord[1]

            progression.push({
                applied: Chord.apply(startingRoot, rawChord),
                root: startingRoot,
                baseChordName: chord[0]
            })
        }

        const measures = progression.map((value) => Measure.from((
            value.applied.map((val) => {
                    return {
                        element: ((new Note((new Pitch(val)).tone_octave, new Beat("1/1"))) as IMeasureElement),
                        position: Position.of("1::1")
                    }
                }
            ))))

        measures.forEach((measure) => stave.put(measure))

        return stave
    }


}

export interface MusicGeneratorArgs {
    minChordsInProgression: number,
    maxChordsInProgression: number,
    minRoot: number,
    maxRoot: number,
    minProgressionRootDelta: number,
    maxProgressionRootDelta: number,
    loop: boolean
}

export class DefaultMusicGeneratorArgs implements MusicGeneratorArgs {
    minChordsInProgression: number = 3
    maxChordsInProgression: number = 3
    minRoot: number = 50
    maxRoot: number = 70
    minProgressionRootDelta: number = 1
    maxProgressionRootDelta: number = 1
    loop = true


}

const gen = new MusicGenerator()
gen.generate(6, 120, new DefaultMusicGeneratorArgs())