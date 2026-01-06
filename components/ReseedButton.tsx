import {Button} from "@/components/ui/button";
import {DefaultMusicGeneratorArgs, MusicGenerator, MusicGeneratorArgs} from "@/src/generation/generator";
import {RandomNumberGenerator} from "@/src/helpers/random";
import {Dispatch, SetStateAction} from "react";

export default function ReseedButton({cfg, setCfg} : {cfg: MusicGeneratorArgs, setCfg: Dispatch<SetStateAction<typeof cfg>>}) {
    return (<Button onClick={() => {
        const newCfg = Object.assign({}, cfg)
        newCfg.seed.value = RandomNumberGenerator.createSeed()
        setCfg(newCfg)
    }}
                    className={"text-2xl p-4"}>
        Reseed Score
    </Button>)
}