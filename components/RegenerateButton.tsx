import {DefaultMusicGeneratorArgs, MusicGenerator, MusicGeneratorArgs} from "@/src/generation/generator";
import Stave from "@/src/units/stave";
import {Dispatch, SetStateAction} from "react";
import {Button} from "@/components/ui/button";

export default function RegenerateButton({setStave, opts}: { setStave: Dispatch<SetStateAction<Stave>>, opts : MusicGeneratorArgs }) {
    return (<Button onClick={() => setStave(new MusicGenerator(opts).generate(120))}
                    className={"text-2xl p-4"}>
        Regenerate Score
    </Button>)
}