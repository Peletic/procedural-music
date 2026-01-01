import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {TETRAD_CHORDS, Voicing} from "@/src/units/chord";
import {IMeasureElement, Measure, Position} from "@/src/units/measure";

export default function FillChordsButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => {
        const stave = new Stave(120);
        const measures = []
        for (const tetrad of new Array(TETRAD_CHORDS.length).map((n, idx) => new TETRAD_CHORDS[idx](0))) {
            measures.push(Measure.from((
                new Voicing(tetrad).toNotes("1/1").map((val) => {
                        return {
                            element: (val as IMeasureElement),
                            position: Position.of("1::1")
                        }
                    }
                )
            )))
        }
        console.log(measures)
        measures.forEach(el => stave.put(el))
        setStave(stave)
    }}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border-[1px]"}>
        Fill Chords
    </button>)
}