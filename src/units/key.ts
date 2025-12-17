import {Pitch} from "./pitch";
import {ToneOctave} from "./tone";

for (let i = 0; i <= 112; i++) {
    const pitch = new Pitch(i);
    const pitchA = Pitch.of(pitch.value)
    const pitchB = Pitch.of((pitchA.tone + pitchA.octave) as ToneOctave)
    console.assert()
}