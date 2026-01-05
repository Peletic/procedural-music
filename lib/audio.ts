import * as Soundfont from "soundfont-player";
import {InstrumentName, Player} from "soundfont-player";
import {Logger} from "@/src/helpers/log";

export let audioContext: any | null = null

export function establishAudioContext() {
    audioContext = new window.AudioContext()
}

export const instruments: Player[] = []
export const LoggerInstance = new Logger("audio_lib")

export async function instantiateInstrument(name: InstrumentName) {
    instruments.push(await Soundfont.instrument(audioContext, name))
    LoggerInstance.log("Created " + name)
    return
}