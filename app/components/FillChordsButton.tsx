import {DefaultMusicGeneratorArgs, MusicGenerator} from "@/src/generation/algorithm";
import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {C_TETRADS, Chord} from "@/src/units/chord";
import {IMeasureElement, Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Pitch} from "@/src/units/pitch";
import {Beat} from "@/src/units/beat";

export default function FillChordsButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => {
        const stave = new Stave(120);
        const measures = []
        for (const tetrad of Object.values(C_TETRADS)) {
            measures.push(Measure.from((
                Chord.apply(60, tetrad).map((val) => {
                        return {
                            element: ((new Note((new Pitch(val)).tone_octave, new Beat("1/1"))) as IMeasureElement),
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