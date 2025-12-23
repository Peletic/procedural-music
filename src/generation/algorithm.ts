import Stave from "../units/stave";
import {RandomNumberGenerator} from "@/src/helpers/random";

export class MusicGenerator {

    generate(length: number, bpm: number, seed?: string) {
        const stave = new Stave(bpm)
        const random = new RandomNumberGenerator(seed)


    }


}