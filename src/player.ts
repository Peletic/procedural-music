import {ElementPosition, Measure, Position} from "./units/measure";
import {NumRange} from "./helpers/types";
import {Note} from "./units/note";
import {Beat} from "./units/beat";

const bpm = 120;

async function play(measure : Measure) {
    const tr = (60/bpm * 1000) / 16;
    console.log(`Tr: ${tr}`)
    const log = async (array : any) => {
        console.log(...array)
    }
    let i = 1
    setInterval(() => {
        if (i == 65) i = 1;
        const res = []
        if (i % 16 == 0) res.push(...measure.at(Position.of(`${i/16}::3` as ElementPosition)))
        // measure.at(new Position(i as NumRange<1, 64>, 6))
        if (res.length >= 1 ) log(res)
        i++
    }, tr)
}
async function sleep(ms : number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const measure = new Measure();
for (let i = 1; i <= 4; i++) {
    measure.put(new Note("C4", new Beat("1/4")), Position.of(`${i}::3` as ElementPosition))
}

play(measure)