import {Note} from "@/src/units/note";
import {ElementPosition, Position} from "@/src/units/measure";
import {instruments} from "@/lib/audio";
import Stave from "@/src/units/stave";
import {SetStateAction, useEffect, useState} from "react";
import {Player} from "soundfont-player";

export default function TestPlayAudio({stave}: { stave: Stave }) {
    const [interrupted, setInterrupted] = useState(0)
    const [interval, setSaveInterval] = useState<NodeJS.Timeout>()
    const tr = (60 * 1000) / stave.bpm ;

    const play = async (array: any, instruments: Player[]) => {
        for (let el of array as Note[]) {
            instruments[0].play(el.note, 0, {duration: (((tr*4) / Math.pow(2, el.duration.denominator-1)) / 1000), release: (((tr*4) / Math.pow(2, el.duration.denominator-1)) / 1000)})
            console.log(`duration: ${((tr / el.duration.denominator) / 1000)}`)
            console.log(tr)
            console.log(el.duration.denominator)
        }

    }

    let i = 1
    let n = 0;
    const begin = (instruments: Player[], interrupted: number, setInterrupted: {
        (value: SetStateAction<number>): void;
        (arg0: number): void;
    }, interval: string | number | NodeJS.Timeout | undefined) => setInterval(function () {
        let measures = [...stave.measures]

        if (i === 65) {
            if (n == measures.length - 1) {
                clearTimeout(interval)
                n = 0
                setInterrupted(1)
                return
            }
            n++
            i = 1
        }

        const res = []
        if (i % 64 == 0) res.push(...measures[n].at(Position.of(`${i / 64}::1` as ElementPosition)))
        if (i % 32 == 0) res.push(...measures[n].at(Position.of(`${i / 32}::2` as ElementPosition)))
        if (i % 16 == 0) res.push(...measures[n].at(Position.of(`${i / 16}::3` as ElementPosition)))
        if (i % 8 == 0) res.push(...measures[n].at(Position.of(`${i / 8}::4` as ElementPosition)))
        if (i % 4 == 0) res.push(...measures[n].at(Position.of(`${i / 4}::5` as ElementPosition)))
        if (i % 2 == 0) res.push(...measures[n].at(Position.of(`${i / 2}::6` as ElementPosition)))

        if (res.length >= 1) play(res, instruments)

        i++
    }, tr/16)

    useEffect(() => {
        if (interrupted === 1) {

            clearTimeout(interval)
        }
    }, [interrupted])
    return (<>
            <button onClick={(e) => {
                e.preventDefault();
                if (interrupted == 0 || interrupted == 1) {
                    setInterrupted(2)

                    const a = begin(instruments, interrupted, setInterrupted, interval)
                    setSaveInterval(a)
                } else if (interrupted == 2) {
                    clearTimeout(interval)
                    setInterrupted(1)
                }
            }} className={"bg-blue-400 text-sm w-8 h-8 flex justify-center middle"}>{interrupted == 2 ? <img className={"object-fill h-6 my-auto"} src={"/pause.svg"}/> : <img src={"/play.svg"} className={"object-fill h-6 my-auto"} /> }</button>
        </>
    )
}