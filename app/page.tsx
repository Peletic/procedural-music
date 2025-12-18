'use client'
import * as Soundfont from "soundfont-player"
import {ElementPosition, Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Beat} from "@/src/units/beat";

export default function Home() {

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main>
                <button onClick={(e) => {
                    e.preventDefault();
                    Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (piano) {

                        const bpm = 120;

                        async function play(measure : Measure) {
                            const tr = (60/bpm * 1000) / 16;
                            console.log(`Tr: ${tr}`)
                            const log = async (array : any) => {
                                //console.log(...array)
                                piano.play((array[0] as Note).note, 0, {duration: tr*16})
                            }
                            let i = 1
                            setInterval(() => {
                                if (i == 65) i = 1;
                                const res = []
                                if (i % 16 == 0) res.push(...measure.at(Position.of(`${i/16}::3` as ElementPosition)))
                                // measure.at(new Position(i as NumRange<1, 64>, 6))
                                if (res.length >= 1 ) log(res)
                                i++
                            }, tr)
                        }
                        async function sleep(ms : number) {
                            return new Promise((resolve) => setTimeout(resolve, ms));
                        }
                        const measure = new Measure();
                        for (let i = 1; i <= 4; i++) {
                            measure.put(new Note("C4", new Beat("1/4")), Position.of(`${i}::3` as ElementPosition))
                        }

                        play(measure)
                    })
                }}> test button
                </button>
            </main>
        </div>
    );
}
