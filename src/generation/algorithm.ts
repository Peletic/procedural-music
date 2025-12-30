import Stave from "../units/stave";
import {RandomNumberGenerator} from "@/src/helpers/random";
import {C_TETRADS, C_TRIADS, Chord} from "@/src/units/chord";
import {IMeasureElement, Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";
import {Beat} from "@/src/units/beat";
import {netDissonance} from "@/src/generation/dissonance";

export class MusicGenerator {

    generate(length: number, bpm: number, args: MusicGeneratorArgs, seed?: string) {
        const stave = new Stave(bpm)
        const random = new RandomNumberGenerator(seed)

        const chordsInProgression = random.randomInRange(args.minChordsInProgression, args.maxChordsInProgression)
        const baseRoot = random.randomInRange(args.minRoot, args.maxRoot)
        const startingRoot = random.randomInRange(args.minProgressionRootDelta, args.maxProgressionRootDelta) * (random.randomInRange(1, 2) === 1 ? 1 : -1) + baseRoot
        const chordsUsed = []

        for (let i = 0; i < chordsInProgression - (args.loop ? 1 : 0); i++) {
            chordsUsed.push(this.pickChord(random, args))
        }

        const progression = chordsUsed.map((chord, idx) => Chord.apply(startingRoot + (idx > 0 ? random.randomInRange(args.minProgressionRootDelta, args.maxProgressionRootDelta) : 0), chord))

        if (args.loop) {
            progression.push(progression[0])
        }

        console.log(progression)
        const measures = progression.map((value) => Measure.from((
            value.map((val) => {
                    return {
                        element: ((new Note((new Pitch(val)).tone_octave, new Beat("1/1"))) as IMeasureElement),
                        position: Position.of("1::1")
                    }
                }
            ))))

        measures.forEach((measure) => stave.put(measure))

        return stave
    }

    pickChord(random: RandomNumberGenerator, args: MusicGeneratorArgs) {
        console.log(args)
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

        const numTriads = Object.entries(C_TRIADS).length
        const getTriad = (idx: number) => {
            return Object.entries(C_TRIADS)[idx]
        }
        const temp = getTriad(random.randomInRange(1, numTriads) - 1)
        let chord = temp[1]
        let name = temp[0]


        while (netDissonance(...Chord.apply(60, chord).map((val) => Pitch.of(val))) >= args.maxIndividualDissonance || (args.excludeMinors && name.includes("min")) || (args.excludeDiminished && name.includes("dim")) || (args.excludeAugmented && name.includes("aug"))) {
            const temp = getTriad(random.randomInRange(1, numTriads) - 1)
            chord = temp[1]
            name = temp[0]
        }

        console.log(name)

        return chord
    }

}

export interface MusicGeneratorArgs {
    minChordsInProgression: number,
    maxChordsInProgression: number,
    minRoot: number,
    maxRoot: number,
    minProgressionRootDelta: number,
    maxProgressionRootDelta: number,
    loop: boolean,
    maxTotalDissonance: number,
    maxIndividualDissonance: number,
    minRhythmicDivisions: number,
    maxRhythmicDivisions: number,
    minRhythmicDivisionProportion: number,
    maxRhythmicDivisionProportion: number,
    excludeMinors: boolean,
    excludeDiminished: boolean,
    excludeAugmented: boolean,
    persistentKey: boolean
}

export class DefaultMusicGeneratorArgs implements MusicGeneratorArgs {
    minChordsInProgression: number = 2
    maxChordsInProgression: number = 4
    minRoot: number = 60
    maxRoot: number = 60
    minProgressionRootDelta: number = 0
    maxProgressionRootDelta: number = 0
    loop = false
    maxTotalDissonance = 5
    maxIndividualDissonance = 1.5
    minRhythmicDivisions = 1
    maxRhythmicDivisions = 10
    minRhythmicDivisionProportion = 0.1
    maxRhythmicDivisionProportion = 0.5
    excludeMinors = true
    excludeDiminished = true
    excludeAugmented = true
    persistentKey = true
}

const gen = new MusicGenerator()
gen.generate(6, 120, new DefaultMusicGeneratorArgs())