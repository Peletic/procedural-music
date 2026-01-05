import {DefaultMusicGeneratorArgs, MusicGenerator} from "@/src/generation/generator";
import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";

export default function RegenerateButton({setStave}: { setStave: Dispatch<SetStateAction<Stave>> }) {
    return (<button onClick={(e) => setStave(new MusicGenerator(new DefaultMusicGeneratorArgs()).generate(120))}
                    className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border"}>
        Regenerate Score
    </button>)
}