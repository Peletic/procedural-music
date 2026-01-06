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

export const opts : {value: {[p in LoggerTypes]: {value: boolean, title: string}}, title: string} = {
    value: {
        measure: { value: false, title: "Enable logging from measure module" },
        generator: { value: false, title: "Enable logging from generator module" },
        chords: { value: false, title: "Enable logging from chord module" },
        playback: { value: false, title: "Enable logging from playback module" },
        dissonance: { value: false, title: "Enable logging from dissonance module" },
        scales: { value: false, title: "Enable logging from scale module" },
        audio_lib: { value: false, title: "Enable logging from audio library module" }
    },
    title: "Logging Settings"
}

export class Logger {
    constructor(public type : LoggerTypes) {}

    public async log(message?: any) {
        if (opts.value[this.type].value) {
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