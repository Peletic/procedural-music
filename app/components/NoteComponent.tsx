import {Note} from "@/src/units/note";
import {ElementPosition, Position} from "@/src/units/measure";
import {NUMBER_WHOLE_STEP, WholeStep} from "@/src/units/tone";

const F_BASE_VERTICAL_OFFSET_MAP: { [p: string]: number } = {
    "quarter_note": 1.4,
    "half_note": 1.4,
    "eighth_note": 1.4,
    "sixteenth_note": 1.2,
    "thirty_second_note": 1.4,
    "whole_note": 3.35,
    "sharp": 2.85,
    "flat": 2.7
}

const VERTICAL_OFFSET_INTERVAL: { [p: string]: number } = {
    "quarter_note": 0.36,
    "half_note": 0.36,
    "whole_note": 0.36,
    "eighth_note": 0.36,
    "sixteenth_note": 0.345,
    "thirty_second_note": 0.36,
    "sharp": 0.36,
    "flat": 0.36
}

const DOWNWARDS_OFFSET: { [p: string]: number } = {
    "quarter_note": 1.9,
    "half_note": 1.9,
    "eighth_note": 1.9,
    "sixteenth_note": 1.95,
    "twenty_second_note": 1.9,
    "whole_note": 0
}

const SHARP_OFFSET: number = -0.75
const FLAT_OFFSET: number = -0.75


export default function NoteComponent({note, pos}: { note: Note, pos: ElementPosition }) {
    // 12 x 3

    const scale = Math.pow(2, Position.of(pos).level - 1)
    const idx = Position.of(pos).nth
    const baseOffset = 0.75

    const offsetScalar = 12 / scale;
    const offset = (idx - 1) * offsetScalar + baseOffset


    const number = (NUMBER_WHOLE_STEP[note.note.toString().substring(0, 1) as WholeStep]) + (parseInt(note.note.toString().substring(note.note.toString().length - 1)) * 7) - 28
    const svgName = `${number < 7 ? "upwards" : "downwards"}-${note.duration.name}.svg`
    const topMargin = F_BASE_VERTICAL_OFFSET_MAP[note.duration.name] - number * VERTICAL_OFFSET_INTERVAL[note.duration.name] + (number < 7 ? 0 : DOWNWARDS_OFFSET[note.duration.name])

    const addt: { [p: string]: any } = {}
    if (note.duration.denominator == 1) {
        addt.height = "0.65em"
    }

    let flat = "none"
    let sharp = "none"
    if (note.note.includes("#")) {
        sharp = "block"
    } else if (note.note.includes("b")) {
        flat = "block"
    }

    const sharpOffset = offset + SHARP_OFFSET
    const flatOffset = offset
        + FLAT_OFFSET

    const sharpVerticalOffset = F_BASE_VERTICAL_OFFSET_MAP.sharp - number * VERTICAL_OFFSET_INTERVAL.sharp
    const flatVerticalOffset = F_BASE_VERTICAL_OFFSET_MAP.flat - number * VERTICAL_OFFSET_INTERVAL.flat

    // @ts-ignore
    return (<>
        <img src={"/flat.svg"} style={
            {
                position: "absolute",
                height: "1.35em",
                width: "0.7em",
                display: `${flat}`,
                marginLeft: `${flatOffset}em`,
                marginTop: `${flatVerticalOffset}em`
            }
        }/>
        <img src={"/sharp.svg"} style={
            {
                position: "absolute",
                height: "1.65em",
                width: "0.8em",
                display: `${sharp}`,
                marginLeft: `${sharpOffset}em`,
                marginTop: `${sharpVerticalOffset}em`
            }
        }/>
        <img src={`/${svgName}`} style={
            {
                marginLeft: `${offset}em`,
                marginTop: `${topMargin}em`,
                position: "absolute",
                ...addt
            }
        }/>
    </>)
}