import Stave from "../units/stave";
import {RandomNumberGenerator} from "@/src/helpers/random";
import {DIATONIC, Voicing} from "@/src/units/chord";
import {Measure, Position} from "@/src/units/measure";
import {matchingScales} from "@/src/helpers/scales";
import {Scale, SCALES} from "@/src/units/scale";
import {ALL_APPLIED_CHORDS} from "@/src/helpers/chords";
import {netDissonance} from "@/src/generation/dissonance";

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
        console.log(DIATONIC[0].prototype)
        const MAJOR_DIATONIC = DIATONIC.filter(Diatonic => Diatonic.prototype.name.toUpperCase() == Diatonic.prototype.name)
        const MINOR_DIATONIC = DIATONIC.filter(Diatonic => Diatonic.prototype.name.toLowerCase() == Diatonic.prototype.name)

        const USABLE_DIATONIC = [...MAJOR_DIATONIC]
        const loopTil = (args.loop ? chordsInProgression - 1 : chordsInProgression)

        const toUse = []
        for (let i = 0; i < loopTil; i++) {
            const rand = random.randomInRange(0, USABLE_DIATONIC.length - 1)
            toUse.push(new (USABLE_DIATONIC[rand])(scale.root))
        }

        if (args.loop) toUse.push(toUse[0])

        const voicings: Voicing[] = []
        const names: string[] = []
        for (const chord of toUse) {
            if (names.length > 0 && names.includes(chord.name)) {
                const occurrences = names.filter((name) => name === chord.name).length
                voicings.push(new Voicing(chord, occurrences, occurrences > 2 ? 3 : 2))
            } else {
                voicings.push(new Voicing(chord, 0, 2))
            }
            names.push(chord.name)
        }

        return voicings
    }

    avantGardePickProgression(random: RandomNumberGenerator, args: MusicGeneratorArgs, scale: Scale, chordsInProgression: number) {
        const progression = []
        const possibleChords = this.appliedChordsInScale(scale)

        console.log(`${scale.toString()} has ${possibleChords.length} chords`)

        if (possibleChords.length == 0) return []

        let used: number[] = []

        const loopTil = (args.loop ? chordsInProgression - 1 : chordsInProgression)
        for (let i = 0; i < loopTil; i++) {
            let appliedChord
            if (i === loopTil - 1 || i === 0) {
                let found = false
                let rand = random.randomInRange(0, possibleChords.length - used.length - 1)
                let k = 0
                while (!found && k < args.progressionTimeout) {
                    const possibleChordDissonance = netDissonance(...new Voicing(possibleChords[rand]).notes)
                    if (possibleChordDissonance <= (i === 0 ? args.maxStartingDissonance : args.maxEndingDissonance)) {
                        found = true
                        break
                    }
                    rand = random.randomInRange(0, possibleChords.length - used.length - 1)
                    k++
                }

                used.push(rand)
                appliedChord = possibleChords[rand]
            } else {
                const rand = random.randomInRange(0, possibleChords.length - used.length - 1)
                const add = used.filter((val) => rand >= val).length
                appliedChord = possibleChords[rand + add]
                used.push(rand + add)
            }

            console.log(new Voicing(appliedChord).notes)
            progression.push(new Voicing(appliedChord, random.randomInRange(1, 3)))
        }

        if (args.loop) {
            progression.push(progression[0])
        }

        return progression
    }

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
    progressionTimeout: number,
    maxEndingDissonance: number,
    maxStartingDissonance: number,
    useMinorDiatonics: boolean
}

export class DefaultMusicGeneratorArgs implements MusicGeneratorArgs {
    minChordsInProgression: number = 4
    maxChordsInProgression: number = 4
    minRoot: number = 60
    maxRoot: number = 60
    minProgressionRootDelta: number = 0
    maxProgressionRootDelta: number = 0
    loop = true
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
    maxEndingDissonance = 0
    maxStartingDissonance = 0
    useMinorDiatonics = false
}

const gen = new MusicGenerator()
gen.generate(6, 120, new DefaultMusicGeneratorArgs())