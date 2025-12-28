import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {C_TETRADS} from "@/src/units/chord";
import {arpeggiate} from "@/src/generation/rhythm";
import {Pitch} from "@/src/units/pitch";
import {Measure} from "@/src/units/measure";

export default function ArpeggiateButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => {
        const stave = new Stave(120)
        const chord = Object.values(C_TETRADS)[Math.floor(Math.random() * Object.entries(C_TETRADS).length)]
        const measures = []
        for (let i = 0; i < 5; i++) {
            const transformed = chord.map((val) => Pitch.of(val))
            measures.push(...Measure.join(Measure.from(arpeggiate({chord: transformed}, 60 + i, 1, 4)), Measure.from(arpeggiate({chord: transformed.slice(0, 3)}, 60 + i, 2, 4)), "4::4"))
        }

        let joined = [measures[0]]

        for (let i = 1; i < measures.length; i++) {

            const recent = joined[joined.length - 1]
            const together = Measure.join(recent, measures[i], Measure.lastOccupiedPosition(recent).position)

            joined.pop()
            joined.push(...together)
        }

        joined.forEach((m) => stave.put(m))

        setStave(stave)
    }}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border-[1px]"}>
        Generate Arpeggio
    </button>)
}