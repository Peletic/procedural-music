export const LOGGER_TYPES = [
    "measure",
    "generator",
    "chords",
    "playback",
    "dissonance",
    "scales",
    "audio_lib"
]

export type LoggerTypes = typeof LOGGER_TYPES[number]

export const opts : {enabled: {[p in LoggerTypes]: boolean}} = {
    enabled: {
        measure: false,
        generator: false,
        chords: true,
        playback: true,
        dissonance: false,
        scales: true,
        audio_lib: true
    }
}

export class Logger {
    constructor(public type : LoggerTypes) {}

    public async log(message?: any) {
        if (opts.enabled[this.type]) {
            console.log(`[LOG] ${this.type} | ${message}`)
        }
    }

    public async warn(message?: any) {
        console.warn(`[WARN] ${this.type} | ${message}`)
    }

    public async error(message?: any) {
        console.error(`[ERROR] ${this.type} | ${message}`)
    }
}