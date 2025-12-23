import NumInputField from "@/app/components/NumInputField";
import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction, useState} from "react";

export default function BPMInputField({stave, setStave}: {
    stave: Stave, setStave: Dispatch<SetStateAction<Stave>>
}) {
    const [bpm, setBpm] = useState(stave.bpm)
    return (<>
        <NumInputField name={"BPM"} baseValue={bpm} onInput={(e) => {
            const val = e.currentTarget.valueAsNumber
            let newStave = {} as Stave
            Object.assign(newStave, stave)
            newStave.bpm = val
            setBpm(val)
            setStave(newStave)
        }}/>
    </>)
}