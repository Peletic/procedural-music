import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {CHORDS, Voicing} from "@/src/units/chord";
import {Measure, Position} from "@/src/units/measure";

export default function FillChordsButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => {
        const stave = new Stave(120);
        const measures = []
        for (const tetrad of CHORDS.map((Chord, idx) => new Chord(0))) {
            measures.push(Measure.from((
                new Voicing(tetrad).toNotes("1/1").map((val) => {
                        return {
                            element: (val),
                            position: Position.of("1::1")
                        }
                    }
                )
            )))
        }

        measures.forEach(el => stave.put(el))
        setStave(stave)
    }}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border-[1px]"}>
        Fill Chords
    </button>)
}