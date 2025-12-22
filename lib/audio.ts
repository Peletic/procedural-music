import * as Soundfont from "soundfont-player";
import {InstrumentName, Player} from "soundfont-player";

export let audioContext: any | null = null

export function establishAudioContext() {
    audioContext = new window.AudioContext()
}

export const instruments: Player[] = []

export async function instantiateInstrument(name : InstrumentName) {
    instruments.push(await Soundfont.instrument(new AudioContext(), name))
    return
}