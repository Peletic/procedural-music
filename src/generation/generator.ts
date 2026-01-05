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
import {netDissonance} from "@/src/generation/dissonance";
import {Note} from "@/src/units/note";
import {NoteDuration} from "@/src/units/beat";
import {chunkArray, mergeConcurrent} from "@/src/helpers/array";
import {NUMBER_TONE_LOOKUP} from "@/src/units/tone";
import {NumRange} from "@/src/helpers/types";

export class MusicGenerator {
    random: RandomNumberGenerator

    constructor(public args: MusicGeneratorArgs, public seed?: string) {
        this.random = new RandomNumberGenerator(this.seed)
    }

    generate(bpm: number) {
        const stave = new Stave(bpm)

        //const chordsInProgression = this.random.randomInRange(this.args.minChordsInProgression, this.args.maxChordsInProgression)

        const scale = new SCALES[this.random.randomInRange(0, SCALES.length - 1)](this.random.randomInRange(0, 11))
        console.log(`${scale} with notes ${scale.notes}`)


        const melody = this.pickMelody(scale)
        const groups = chunkArray(melody, 4).map((chunk) => mergeConcurrent(chunk))
        // console.log(groups)

        // if 1 then (4) 3, if 2 then (2) 2, if 3 then (2) 2, if 4 then (1) 1

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
            // console.log(note.duration.denominator)
            return ({
                element: note,
                position: `1::${note.duration.denominator}` as ElementPosition
            })
        })))

        // console.log(melody.length + " or " + Measure.joinMeasures(measures).length + ":" + Measure.joinMeasures(progression).length + " or " +  progression.length)

        /*const measures = progression.map((value, idx) => Measure.from([...(
            value.toNotes("1/1").map((val) => {
                    return {
                        element: val,
                        position: Position.of("1::1")
                    }
                }
            ))]))*/

        Measure.joinMeasures(measures).map((measure, idx) => Measure.mergeMeasures(measure, Measure.joinMeasures(progression)[idx])).forEach((measure) => stave.put(measure))


        return stave
    }

    pickProgression(scale: Scale, numberGroups: number[][]) {

        const chordPool = (scale.toString().toLowerCase().includes("major") ? [FirstMajorDiatonic, SecondMinorDiatonic, ThirdMinorDiatonic, FourthMajorDiatonic, FifthMajorDiatonic, SixthMinorDiatonic, DiminishedSecondMinorDiatonic] : [FirstMinorDiatonic, DiminishedSecondMinorDiatonic, ThirdMajorDiatonic, FourthMinorDiatonic, FifthMinorDiatonic, SixthMajorDiatonic, SeventhMajorDiatonic]).map((Diatonic) => new Diatonic(scale.root))

        const groups = numberGroups.map(group => group.map((note) => NUMBER_TONE_LOOKUP[note % 12 as NumRange<0, 11>]))

        // console.log(`${scale.toString()} diatonics are ${chordPool}`)
        // console.log(groups)
        // console.log(numberGroups)

        const toUse = []
        let total = 0
        for (let group of groups) {
            // console.log(group)
            const matchingChords = chordPool.filter((chord) => includesAllNotes(chord, group))
            let dur = 0

            if (matchingChords.length > 0) {
                const rand = this.random.randomInRange(0, matchingChords.length - 1)
                // console.log(`Duration = ${group.length} for ${group}`)
                toUse.push({chord: (matchingChords[rand]), duration: group.length})
                dur += group.length
                // console.log("Duration " + dur)
            } else {
                if (mergeConcurrent(group).length <= 1) {
                    console.error(mergeConcurrent(group) + " and " + group)
                    // console.log(scale)
                    // chordPool.forEach((chord) => // console.log(chord.notes))
                }
                let subgroups = [mergeConcurrent(group).slice(0, mergeConcurrent(group).length - 1), mergeConcurrent(group).slice(mergeConcurrent(group).length - 1)]
                let k = 0
                while (k <= this.args.progressionTimeout) {
                    const subgroupMatchingChords = chordPool.filter((chord) => includesAllNotes(chord, subgroups[0].map((a) => a.el)))
                    if (subgroupMatchingChords.length > 0) {
                        for (const subgroup of subgroups) {
                            const matching = chordPool.filter((chord) => includesAllNotes(chord, subgroup.map((a) => a.el)))
                            const rand = this.random.randomInRange(0, matching.length - 1)
                            // console.log(`Duration = ${subgroup.map((val) => val.count).reduce((prev, curr) => prev + curr)} for subgroup ${JSON.stringify(subgroup)}`)
                            dur += subgroup.map((val) => val.count).reduce((prev, curr) => prev + curr)
                            toUse.push({
                                chord: (matching[rand]),
                                duration: subgroup.map((val) => val.count).reduce((prev, curr) => prev + curr)
                            })
                            // console.log("Duration " + dur)
                        }
                        break
                    } else {
                        // console.log("Looping")
                        subgroups = [subgroups[0].slice(0, subgroups[0].length - 1), subgroups[0].slice(subgroups[0].length - 1), ...subgroups.slice(1)]
                    }
                    k++
                }
                if (k >= this.args.progressionTimeout) {
                    console.error(`Reached progression timeout`)
                }
            }
            // console.log(dur)
            total += dur
            // console.log(total)

        }

        const voicings: Note[][] = []
        const names: string[] = []

        for (const chord of toUse) {
            if (chord.chord == undefined) {
                console.error(`Undefined chord`)
                continue
            }

            if (names.length > 0 && names.includes(chord.chord.name)) {
                const occurrences = names.filter((name) => name === chord.chord.name).length
                voicings.push(new Voicing(chord.chord, occurrences, occurrences > 2 ? 3 : 2).toNotes(chord.duration === 3 ? "1.5/2" : `1/${chord.duration === 4 ? 1 : chord.duration == 2 ? 2 : 3}` as NoteDuration))
            } else {
                voicings.push(new Voicing(chord.chord, 0, 2).toNotes(chord.duration === 3 ? `1.5/2` : `1/${chord.duration === 4 ? 1 : chord.duration == 2 ? 2 : 3}` as NoteDuration))
            }
            names.push(chord.chord.name)
        }

        if (toUse.map((chord) => chord.duration).reduce((prev, curr) => prev + curr) !== numberGroups.flat().length) {
            // console.log(toUse)
            console.error(`Unequal ${toUse.map((chord) => chord.duration).reduce((prev, curr) => prev + curr)} to ${numberGroups.map((ar) => ar.length).reduce((prev, curr) => prev + curr)}`)
        }

        //// console.log(toUse.map((chord) => chord.duration).reduce((prev, curr) => prev + curr) + " and " + toUse.length)

        return voicings
    }

    pickMelody(scale: Scale) {

        // welcome to my personal hell

        // first musical phrase
        const homeNote = this.random.randomInRange(0, scale.noteValues.length - 1)

        // 0 = down 1 = up
        const phraseDirection = this.random.randomInRange(0, 1) === 1 ? 1 : -1

        const steps: number[] = new Array(this.random.randomInRange(this.args.minPhraseNotes - 1, this.args.maxPhraseNotes - 1))
        const stepWeightingSum = Object.values(this.args.weightedIntervals).reduce((prev, curr) => prev + curr)
        const mappedStepWeights = Object.entries(this.args.weightedIntervals).flatMap(([str, num]) => new Array(num).fill(parseInt(str)))

        for (let i = 0; i < steps.length; i++) {
            steps[i] = mappedStepWeights[this.random.randomInRange(0, stepWeightingSum - 1)] * phraseDirection * (this.random.random() <= this.args.phraseDirectionSwapChance ? -1 : 1)
        }

        const notes = [homeNote, ...steps.map((val, idx, arr) => {
            const sum = (arr.slice(0, idx + 1).reduce((prev, curr) => prev + curr)) + homeNote
            // console.log(sum)
            return sum
        })]

        const repeatedNotes: number[] = []

        for (const note of notes) {
            for (let i = 0; i < this.random.randomInRange(this.args.minPhraseNoteLengthBase, this.args.maxPhraseNoteLengthBase); i++) {
                const remainder = note % scale.noteValues.length
                // console.log(`${scale.noteValues.map((val) => val % 12)} and ${(scale.noteValues[remainder >= 0 ? remainder : scale.noteValues.length + remainder] + 60 + Math.floor(note / scale.noteValues.length) % 2 * 12) % 12}`)
                repeatedNotes.push(scale.noteValues[remainder >= 0 ? remainder : scale.noteValues.length + remainder] + 60 + Math.floor(note / scale.noteValues.length) % 2 * 12)
            }
        }
        // console.log(repeatedNotes)
        return repeatedNotes
    }

    transformAccompaniment() {

    }

    avantGardePickProgression(scale: Scale, chordsInProgression: number) {
        const progression = []
        const possibleChords = this.appliedChordsInScale(scale)

        // console.log(`${scale.toString()} has ${possibleChords.length} chords`)

        if (possibleChords.length == 0) return []

        let used: number[] = []

        const loopTil = (this.args.loop ? chordsInProgression - 1 : chordsInProgression)
        for (let i = 0; i < loopTil; i++) {
            let appliedChord
            if (i === loopTil - 1 || i === 0) {
                let found = false
                let rand = this.random.randomInRange(0, possibleChords.length - used.length - 1)
                let k = 0
                while (!found && k < this.args.progressionTimeout) {
                    const possibleChordDissonance = netDissonance(...new Voicing(possibleChords[rand]).notes)
                    if (possibleChordDissonance <= (i === 0 ? this.args.maxStartingDissonance : this.args.maxEndingDissonance)) {
                        found = true
                        break
                    }
                    rand = this.random.randomInRange(0, possibleChords.length - used.length - 1)
                    k++
                }

                used.push(rand)
                appliedChord = possibleChords[rand]
            } else {
                const rand = this.random.randomInRange(0, possibleChords.length - used.length - 1)
                const add = used.filter((val) => rand >= val).length
                appliedChord = possibleChords[rand + add]
                used.push(rand + add)
            }

            // console.log(new Voicing(appliedChord).notes)
            progression.push(new Voicing(appliedChord, this.random.randomInRange(1, 3)))
        }

        if (this.args.loop) {
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
    useMinorDiatonics: boolean,
    maxIndividualMelodyDissonance: number,
    minPhraseNotes: number,
    maxPhraseNotes: number,
    weightedIntervals: { [interval: number]: number },
    phraseDirectionSwapChance: number,
    minPhraseNoteLengthBase: number,
    maxPhraseNoteLengthBase: number
}

export class DefaultMusicGeneratorArgs implements MusicGeneratorArgs {
    minChordsInProgression: number = 12
    maxChordsInProgression: number = 12
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
    useMinorDiatonics = true
    maxIndividualMelodyDissonance = 5
    minPhraseNotes = 20
    maxPhraseNotes = 20
    weightedIntervals = {0: 2, 1: 50, 2: 25, 3: 20, 4: 10, 5: 3, 6: 5}
    phraseDirectionSwapChance = 0.4

    minPhraseNoteLengthBase = 1
    maxPhraseNoteLengthBase = 2
}

const gen = new MusicGenerator(new DefaultMusicGeneratorArgs())
gen.generate(120)