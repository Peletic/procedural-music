import * as Soundfont from "soundfont-player";
import {ElementPosition, Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";
import {Beat} from "@/src/units/beat";

export default function TestButton() {
    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (piano) {

                    const bpm = 120;

                    async function play(measure: Measure) {
                        const tr = (60 / bpm * 1000) / 16;
                        console.log(`Tr: ${tr}`)
                        const log = async (array: any) => {
                            //console.log(...array)
                            for (let el of array as Note[]) {
                                piano.play(el.note, 0, {duration: tr * 16})
                            }

                        }
                        let i = 1
                        setInterval(() => {
                            if (i == 65) return;
                            const res = []
                            if (i % 16 == 0) res.push(...measure.at(Position.of(`${i / 16}::3` as ElementPosition)))
                            // measure.at(new Position(i as NumRange<1, 64>, 6))
                            if (res.length >= 1) log(res)
                            i++
                        }, tr)
                    }

                    async function sleep(ms: number) {
                        return new Promise((resolve) => setTimeout(resolve, ms));
                    }

                    const measure = new Measure();
                    const putChord = (function (base: number, i: number, a: number, b: number,  c: number) {
                        measure.put(new Note(Pitch.of(base + a).tone_octave, new Beat("1/4")), Position.of(`${i}::3` as ElementPosition));
                        measure.put(new Note(Pitch.of(base + 4 + b).tone_octave, new Beat("1/4")), Position.of(`${i}::3` as ElementPosition));
                        measure.put(new Note(Pitch.of(base + 7 + c).tone_octave, new Beat("1/4")), Position.of(`${i}::3` as ElementPosition));
                    })
                    putChord(60, 1, 0, 0, 0)
                    putChord(60, 2, 0, 0, 2)
                    putChord(60, 3, 0, 2, 2)
                    putChord(60, 4, 2, 2, 2)

                    play(measure)
                })
            }}> test button
            </button>
        </>
    )
}