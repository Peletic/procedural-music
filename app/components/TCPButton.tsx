import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {
    Chord,
    DIATONIC,
    DiatonicChord,
    FifthDiatonic,
    FirstDiatonic,
    FourthDiatonic, MajorTriadChord,
    ThirdDiatonic,
    Voicing
} from "@/src/units/chord";
import {Measure} from "@/src/units/measure";

export default function TCPButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    const transformer = (Chord: typeof FirstDiatonic, voicing = 0, octave = 4, base = 2) => {
        return Measure.from(
            (new Voicing(new Chord(2), voicing, octave).toNotes(`1/${base}`).map((note) => ({
                element: note,
                position: `1::2`
            }))))
    }
    return (<button onClick={(e) => {
        const stave = new Stave(120);
        const measures = [transformer(FirstDiatonic), transformer(FourthDiatonic, 1, 3), transformer(FifthDiatonic, 1, 3), transformer(FifthDiatonic, 2, 3), transformer(FifthDiatonic), transformer(FourthDiatonic), transformer(FirstDiatonic, 1, 4, 1)]

        Measure.joinMeasures(measures).forEach(el => stave.put(el))
        setStave(stave)
    }}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border-[1px]"}>
        Fill custom
    </button>)
}