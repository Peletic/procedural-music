import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {DIATONIC, FirstMajorDiatonic, Voicing} from "@/src/units/chord";
import {Measure} from "@/src/units/measure";

export default function ProgressionButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => {
        const stave = new Stave(120);
        let measures = Measure.joinMeasures(DIATONIC.map((Diatonic) => new Voicing(new Diatonic(0))).map((voicing) => Measure.from(voicing.toNotes("1/2").map((note) => ({
            element: note,
            position: "1::2"
        })))))

        measures.push(Measure.from(
            (new Voicing(new FirstMajorDiatonic(0), 0, 5).toNotes("1/2").map((note) => ({
                element: note,
                position: "1::2"
            }))))
        )

        Measure.joinMeasures(measures).forEach(el => stave.put(el))
        setStave(stave)
    }}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border"}>
        Fill I...vii chords
    </button>)
}