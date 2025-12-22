import {Note} from "@/src/units/note";
import {ElementPosition, Position} from "@/src/units/measure";
import {BEAT_NAMES} from "@/src/units/beat";
import {Pitch} from "@/src/units/pitch";
import {NUMBER_WHOLE_STEP, Semitone, TONE_NUMBER_LOOKUP, WholeStep} from "@/src/units/tone";

const F_BASE_VERTICAL_OFFSET_MAP : {[p : string]: number} = {
    "quarter_note": 1.4
}

const VERTICAL_OFFSET_INTERVAL : {[p : string]: number} = {
    "quarter_note": 0.36
}

const DOWNWARDS_OFFSET : {[p : string]: number} = {
    "quarter_note": 1.9
}

export default function NoteComponent({note, pos} : {note: Note, pos: ElementPosition}) {
    // 12 x 3

    const scale = Math.pow(2, note.duration.denominator-1)
    const idx = Position.of(pos).nth

    const offsetScalar = 12/scale;
    const offset = (idx-1) * offsetScalar


    const number = (NUMBER_WHOLE_STEP[Pitch.of(note.note).tone.toString().substring(0, 1) as WholeStep]) + (parseInt(Pitch.of(note.note).octave) * 7) - 28
    const svgName = `${number < 8 ? "upwards" : "downwards"}-${note.duration.name}.svg`
    console.log(number)
    const topMargin = F_BASE_VERTICAL_OFFSET_MAP[note.duration.name] - number*VERTICAL_OFFSET_INTERVAL[note.duration.name] + (number < 8 ? 0 : DOWNWARDS_OFFSET[note.duration.name])
    // @ts-ignore
    return (<>
        <img src={`/${svgName}`} height={"3em"} style={
            {
                marginLeft: `${offset}em`,
                marginTop: `${topMargin}em`,
                position: "absolute"
            }
        }/>
    </>)
}