import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Beat} from "@/src/units/beat";
import {ALL_SCALES} from "@/src/helpers/scales";
import {NumRange} from "@/src/helpers/types";

export default function ScalesButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => {
        const stave = new Stave(120);
        const measures = []
        for (const scale of ALL_SCALES) {
            measures.push(Measure.from(scale.noteValues.map((note: number, idx: number) => {
                return {
                    element: new Note(note + 48, new Beat("1/4")),
                    position: new Position(idx + 1 as NumRange<1, 64>, 4)
                }
            })))
        }

        Measure.joinMeasures(measures).forEach(el => stave.put(el))
        setStave(stave)
    }}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border-[1px]"}>
        Fill Scales
    </button>)
}