import Stave from "../units/stave";
import {RandomNumberGenerator} from "@/src/helpers/random";
import {
    DiminishedSecondMinorDiatonic,
    FifthMajorDiatonic,
    FifthMinorDiatonic,
    FirstMajorDiatonic,
    FirstMinorDiatonic,
    FourthMajorDiatonic,
    FourthMinorDiatonic,
    SecondMinorDiatonic,
    SeventhMajorDiatonic,
    SixthMajorDiatonic,
    SixthMinorDiatonic,
    ThirdMajorDiatonic,
    ThirdMinorDiatonic,
    Voicing
} from "@/src/units/chord";
import {ElementPosition, Measure} from "@/src/units/measure";
import {matchingScales} from "@/src/helpers/scales";
import {Scale, SCALES} from "@/src/units/scale";
import {ALL_APPLIED_CHORDS, includesAllNotes} from "@/src/helpers/chords";
import {Note} from "@/src/units/note";
import {NoteDuration} from "@/src/units/beat";
import {chunkArray, mergeConcurrent} from "@/src/helpers/array";
import {NUMBER_TONE_LOOKUP} from "@/src/units/tone";
import {NumRange} from "@/src/helpers/types";

import {Logger} from "@/src/helpers/log";

const LoggerInstance = new Logger("generator")

export class MusicGenerator {
    random: RandomNumberGenerator

    constructor(public args: MusicGeneratorArgs, public seed?: string) {
        this.random = new RandomNumberGenerator(this.seed)
    }

    generate(bpm: number) {
        const stave = new Stave(bpm)

        const scale = new SCALES[this.random.randomInRange(0, SCALES.length - 1)](this.random.randomInRange(0, 11))
        LoggerInstance.log(`${scale} with notes ${scale.notes}`)


        const melody = this.pickMelody(scale)
        const groups = chunkArray(melody, 4).map((chunk) => mergeConcurrent(chunk))
        LoggerInstance.log(groups)

        const measures = groups.flatMap((group) =>
            Measure.joinMeasures(group.map((el, idx) => {
                const measure = new Measure()
                measure.put(
                    new Note(el.el, el.count == 3 ? "1.5/2" : `1/${el.count === 4 ? 1 : el.count == 2 ? 2 : 3}` as NoteDuration),
                    `1::4` as ElementPosition
                )

                return measure
            }))
        )

        const progression = this.pickProgression(scale, chunkArray(melody, 4)).map((chunk) => Measure.from(chunk.map((note) => {
            return ({
                element: note,
                position: `1::${note.duration.denominator}` as ElementPosition
            })
        })))

        Measure.joinMeasures(measures).map((measure, idx) => Measure.mergeMeasures(measure, Measure.joinMeasures(progression)[idx])).forEach((measure) => stave.put(measure))
        return stave
    }

    pickProgression(scale: Scale, numberGroups: number[][]) {

        const chordPool = (scale.toString().toLowerCase().includes("major") ? [FirstMajorDiatonic, SecondMinorDiatonic, ThirdMinorDiatonic, FourthMajorDiatonic, FifthMajorDiatonic, SixthMinorDiatonic, DiminishedSecondMinorDiatonic] : [FirstMinorDiatonic, DiminishedSecondMinorDiatonic, ThirdMajorDiatonic, FourthMinorDiatonic, FifthMinorDiatonic, SixthMajorDiatonic, SeventhMajorDiatonic]).map((Diatonic) => new Diatonic(scale.root))

        const groups = numberGroups.map(group => group.map((note) => NUMBER_TONE_LOOKUP[note % 12 as NumRange<0, 11>]))

        LoggerInstance.log(`${scale.toString()} diatonics are ${chordPool}`)

        const toUse = []
        for (let group of groups) {
            const matchingChords = chordPool.filter((chord) => includesAllNotes(chord, group))

            if (matchingChords.length > 0) {
                const rand = this.random.randomInRange(0, matchingChords.length - 1)
                toUse.push({chord: (matchingChords[rand]), duration: group.length})
            } else {
                if (mergeConcurrent(group).length <= 1) {
                    LoggerInstance.error(mergeConcurrent(group) + " and " + group)

                }
                let subgroups = [mergeConcurrent(group).slice(0, mergeConcurrent(group).length - 1), mergeConcurrent(group).slice(mergeConcurrent(group).length - 1)]
                let k = 0
                while (k <= this.args.progressionTimeout.value) {
                    const subgroupMatchingChords = chordPool.filter((chord) => includesAllNotes(chord, subgroups[0].map((a) => a.el)))
                    if (subgroupMatchingChords.length > 0) {
                        for (const subgroup of subgroups) {
                            const matching = chordPool.filter((chord) => includesAllNotes(chord, subgroup.map((a) => a.el)))
                            const rand = this.random.randomInRange(0, matching.length - 1)
                            toUse.push({
                                chord: (matching[rand]),
                                duration: subgroup.map((val) => val.count).reduce((prev, curr) => prev + curr)
                            })
                        }
                        break
                    } else {
                        subgroups = [subgroups[0].slice(0, subgroups[0].length - 1), subgroups[0].slice(subgroups[0].length - 1), ...subgroups.slice(1)]
                    }
                    k++
                }
                if (k >= this.args.progressionTimeout.value) {
                    LoggerInstance.error(`Reached progression timeout`)
                }
            }
        }

        const voicings: Note[][] = []

        for (const chord of toUse) {
            if (chord.chord == undefined) {
                console.error(`Undefined chord`)
                continue
            }

            voicings.push(new Voicing(chord.chord, this.random.randomInRange(0, chord.chord.notes.length - 1), 2).toNotes(chord.duration === 3 ? "1.5/2" : `1/${chord.duration === 4 ? 1 : chord.duration == 2 ? 2 : 3}` as NoteDuration))
        }

        if (toUse.map((chord) => chord.duration).reduce((prev, curr) => prev + curr) !== numberGroups.flat().length) {
            LoggerInstance.log(toUse)
            console.error(`Unequal ${toUse.map((chord) => chord.duration).reduce((prev, curr) => prev + curr)} to ${numberGroups.map((ar) => ar.length).reduce((prev, curr) => prev + curr)}`)
        }

        return voicings
    }

    pickMelody(scale: Scale) {
        const homeNote = this.random.randomInRange(0, scale.noteValues.length - 1)

        // 0 = down 1 = up
        const phraseDirection = this.random.randomInRange(0, 1) === 1 ? 1 : -1
        const steps: number[] = new Array(this.random.randomInRange(this.args.minPhraseNotes.value, this.args.maxPhraseNotes.value))
        const stepWeightingSum = Object.values(this.args.weightedIntervals.value).reduce((prev, curr) => prev + curr)
        const mappedStepWeights = Object.entries(this.args.weightedIntervals.value).flatMap(([str, num]) => new Array(num).fill(parseInt(str)))

        for (let i = 0; i < steps.length; i++) {
            steps[i] = mappedStepWeights[this.random.randomInRange(0, stepWeightingSum - 1)] * phraseDirection * (this.random.random() <= this.args.phraseDirectionSwapChance.value ? -1 : 1)
        }

        const notes = [homeNote, ...steps.map((val, idx, arr) => {
            return (arr.slice(0, idx + 1).reduce((prev, curr) => prev + curr)) + homeNote
        })]

        const repeatedNotes: number[] = []

        for (const note of notes) {
            for (let i = 0; i < this.random.randomInRange(this.args.minPhraseNoteLengthBase.value, this.args.maxPhraseNoteLengthBase.value); i++) {
                const remainder = note % scale.noteValues.length
                repeatedNotes.push(scale.noteValues[remainder >= 0 ? remainder : scale.noteValues.length + remainder] + 60 + Math.floor(note / scale.noteValues.length) % 2 * 12)
            }
        }

        LoggerInstance.log(repeatedNotes)
        return repeatedNotes
    }

    appliedChordsInScale(scale: Scale) {
        return ALL_APPLIED_CHORDS.filter((chord) => matchingScales(chord.notes).map((scale) => scale.toString()).includes(scale.toString()))
    }
}

export interface MusicGeneratorArgs {
    progressionTimeout: { value: number, title: string },
    minPhraseNotes: { value: number, title: string },
    maxPhraseNotes: { value: number, title: string },
    weightedIntervals: { value: { [interval: number]: number }, title: string },
    phraseDirectionSwapChance: { value: number, title: string },
    minPhraseNoteLengthBase: { value: number, title: string },
    maxPhraseNoteLengthBase: { value: number, title: string }
}

export class DefaultMusicGeneratorArgs implements MusicGeneratorArgs {
    progressionTimeout = {value: 1000, title: "Maximum Operations"}
    minPhraseNotes = {value: 40, title: "Minimum Melody Length"}
    maxPhraseNotes = {value: 40, title: "Maximum Melody Length"}
    phraseDirectionSwapChance = {value: 0.4, title: "Chance to Swap to/from Ascending/Descending"}
    minPhraseNoteLengthBase = {value: 1, title: "Minimum Melody Note Length"}
    maxPhraseNoteLengthBase = {value: 2, title: "Maximum Melody Note Length"}
    weightedIntervals = {value: {0: 20, 1: 25, 2: 35, 3: 20, 4: 10, 5: 12, 6: 5, 7: 3}, title: "Weighted Melody Steps (in semitones)"}
}

const gen = new MusicGenerator(new DefaultMusicGeneratorArgs())
gen.generate(120)
