import {Note} from "@/src/units/note";
import {ElementPosition, Position} from "@/src/units/measure";
import {Pitch} from "@/src/units/pitch";
import {NUMBER_WHOLE_STEP, WholeStep} from "@/src/units/tone";

const F_BASE_VERTICAL_OFFSET_MAP : {[p : string]: number} = {
    "quarter_note": 1.4,
    "half_note": 1.2
}

const VERTICAL_OFFSET_INTERVAL : {[p : string]: number} = {
    "quarter_note": 0.36,
    "half_note": 0.36
}

const DOWNWARDS_OFFSET : {[p : string]: number} = {
    "quarter_note": 1.9,
    "half_note": 1.9
}

export default function NoteComponent({note, pos} : {note: Note, pos: ElementPosition}) {
    // 12 x 3

    const scale = Math.pow(2, Position.of(pos).level-1)
    const idx = Position.of(pos).nth
    const baseOffset = 0.75

    const offsetScalar = 12/scale;
    const offset = (idx-1) * offsetScalar + baseOffset


    const number = (NUMBER_WHOLE_STEP[Pitch.of(note.note).tone.toString().substring(0, 1) as WholeStep]) + (parseInt(Pitch.of(note.note).octave) * 7) - 28
    const svgName = `${number < 7 ? "upwards" : "downwards"}-${note.duration.name}.svg`
    console.log(number)
    const topMargin = F_BASE_VERTICAL_OFFSET_MAP[note.duration.name] - number*VERTICAL_OFFSET_INTERVAL[note.duration.name] + (number < 7 ? 0 : DOWNWARDS_OFFSET[note.duration.name])
    // @ts-ignore
    return (<>
        <img src={`/${svgName}`} height={"3em"} style={
            {
                marginLeft: `${offset}em`,
                marginTop: `${topMargin}em`,
                position: "absolute",
            }
        }/>
    </>)
}