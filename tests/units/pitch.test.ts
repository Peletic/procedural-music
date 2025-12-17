import {Pitch} from "../../src/units/pitch";

export default function pitchTest() {
    for (let i = 22; i < 120; i++) {
        const a = new Pitch(i)
        const b = Pitch.of(`${a.tone}${a.octave}`)
        const c = Pitch.of(b.value)
        console.log(`${i} |  ${a.tone}${a.octave} == ${b.tone}${b.octave} == ${c.tone}${c.octave}`)
        console.assert(a.value === b.value && b.value === c.value)
    }
}
