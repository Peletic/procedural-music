import Stave from "../units/stave";
import {RandomNumberGenerator} from "@/src/helpers/random";
import {Chord, Voicing} from "@/src/units/chord";
import {IMeasureElement, Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";
import {Beat} from "@/src/units/beat";
import {matchingScales} from "@/src/helpers/scales";
import {MajorScale, Scale, SCALES} from "@/src/units/scale";
import {ALL_APPLIED_CHORDS} from "@/src/helpers/chords";
import {pitch} from "next/dist/build/webpack/loaders/next-swc-loader";
import {unwatchFile} from "node:fs";

export class MusicGenerator {

    generate(length: number, bpm: number, args: MusicGeneratorArgs, seed?: string) {
        const stave = new Stave(bpm)
        const random = new RandomNumberGenerator(seed)

        const chordsInProgression = random.randomInRange(args.minChordsInProgression, args.maxChordsInProgression)

        const scale = new SCALES[random.randomInRange(0, SCALES.length - 1)](random.randomInRange(0, 11))
        console.log(`${scale} with notes ${scale.notes}`)

        const progression = this.pickProgression(random, args, scale, chordsInProgression)

        console.log(progression)

        const measures = progression.map((value) => Measure.from((
            value.toNotes("1/1").map((val) => {
                    return {
                        element: val,
                        position: Position.of("1::1")
                    }
                }
            ))))

        measures.forEach((measure) => stave.put(measure))


        return stave
    }

    pickProgression(random: RandomNumberGenerator, args: MusicGeneratorArgs, scale: Scale, chordsInProgression: number) {
        const progression = []
        const possibleChords = this.appliedChordsInScale(scale)

        console.log(`${scale.toString()} has ${possibleChords.length} chords`)

        if (possibleChords.length == 0) return []

        let used: number[] = []
        for (let i = 0; i < (args.loop ? chordsInProgression - 1 : chordsInProgression); i++) {
            const rand = random.randomInRange(0, possibleChords.length - used.length - 1)
            const add = used.filter((val) => rand >= val).length ? used.filter((val) => rand >= val).length : 0
            const appliedChord = possibleChords[rand + add]


            console.log(new Voicing(appliedChord).notes)
            progression.push(new Voicing(appliedChord))
        }

        if (args.loop) {
            progression.push(progression[0])
        }

        return progression
    }

    /*pickRandomChord(random: RandomNumberGenerator) {
        const numTetrads = Object.entries(C_TETRADS).length
        const numChords = numTetrads + Object.entries(C_TRIADS).length

        const num = random.randomInRange(0, numChords - 1)

        if (num < numTetrads) {
            return Object.entries(C_TETRADS)[num]
        } else {
            return Object.entries(C_TRIADS)[num - numTetrads]
        }
    }

    pickRandomTriad(random: RandomNumberGenerator) {
        const numTriads = Object.entries(C_TRIADS).length
        const num = random.randomInRange(0, numTriads - 1)

        return Object.entries(C_TRIADS)[num]

    }

    pickRandomTetrad(random: RandomNumberGenerator) {
        const numTetrads = Object.entries(C_TETRADS).length
        const num = random.randomInRange(0, numTetrads - 1)

        return Object.entries(C_TETRADS)[num]
    }*/

    appliedChordsInScale(scale: Scale) {
        return ALL_APPLIED_CHORDS.filter((chord) => matchingScales(chord.notes).map((scale) => scale.toString()).includes(scale.toString()))
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
    persistentKey: boolean,
    progressionTimeout: number
}

export class DefaultMusicGeneratorArgs implements MusicGeneratorArgs {
    minChordsInProgression: number = 2
    maxChordsInProgression: number = 6
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
    excludeMinors = false
    excludeDiminished = false
    excludeAugmented = false
    persistentKey = true
    progressionTimeout = 100000
}

const gen = new MusicGenerator()
gen.generate(6, 120, new DefaultMusicGeneratorArgs())