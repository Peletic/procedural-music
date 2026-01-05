import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";

import {arpeggiate} from "@/src/generation/rhythm";
import {Measure} from "@/src/units/measure";
import {Chord, CHORDS, Voicing} from "@/src/units/chord";

export default function ArpeggiateButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => {
        const stave = new Stave(120)
        const chord: Chord = new CHORDS[Math.floor(Math.random() * CHORDS.length)](Math.floor(Math.random() * 11))
        const measures = []
        for (let i = 0; i < 5; i++) {
            measures.push(...Measure.join(Measure.from(arpeggiate({chord: new Voicing(chord).notes}, i, 1, 4)), Measure.from(arpeggiate({chord: new Voicing(chord, 0).notes.slice(0, 3)}, i, 2, 4)), "4::4"))
        }

        Measure.joinMeasures(measures).forEach((m) => stave.put(m))
        setStave(stave)
    }}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border-[1px]"}>
        Generate Arpeggio
    </button>)
}