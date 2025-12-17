import {Pitch} from "../../src/units/pitch";

export default function pitchTest() {
    const a = new Pitch(44)
    const b = Pitch.of(`${a.tone}${a.octave}`)
    const c = Pitch.of(b.value)
    console.log(`${a.value}; ${b.value}; ${c.value}`)
    console.log(`${a.tone}${a.octave}`)
    console.log(`${b.tone}${b.octave}`)
    console.assert(a.value === b.value && b.value === c.value)
}
