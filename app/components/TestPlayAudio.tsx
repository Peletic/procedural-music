import {Note} from "@/src/units/note";
import {ElementPosition, Position} from "@/src/units/measure";
import {instruments} from "@/lib/audio";
import Stave from "@/src/units/stave";
import {SetStateAction, useEffect, useState} from "react";
import {Player} from "soundfont-player";
import {clearInterval} from "node:timers";

export default function TestPlayAudio({stave}: { stave: Stave }) {
    const [interrupted, setInterrupted] = useState(0)
    const [interval, setSaveInterval] = useState<NodeJS.Timeout>()
    const tr = (60 / stave.bpm * 1000) / 16;
    console.log(`Tr: ${tr}`)
    const play = async (array: any, instruments: Player[]) => {
        //console.log(...array)
        for (let el of array as Note[]) {
            instruments[0].play(el.note, 0, {duration: tr * 16})
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
        if (i % 64 == 0) res.push(...measures[n].at(Position.of(`${i / 32}::1` as ElementPosition)))
        if (i % 32 == 0) res.push(...measures[n].at(Position.of(`${i / 32}::2` as ElementPosition)))
        if (i % 16 == 0) res.push(...measures[n].at(Position.of(`${i / 16}::3` as ElementPosition)))
        if (i % 8 == 0) res.push(...measures[n].at(Position.of(`${i / 8}::4` as ElementPosition)))
        if (i % 4 == 0) res.push(...measures[n].at(Position.of(`${i / 4}::5` as ElementPosition)))
        if (i % 2 == 0) res.push(...measures[n].at(Position.of(`${i / 2}::6` as ElementPosition)))

        if (res.length >= 1) play(res, instruments)

        i++
    }, tr)

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