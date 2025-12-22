import {LargeHeading} from "@/app/components/Heading";
import {establishAudioContext, instantiateInstrument} from "@/lib/audio";
import {Dispatch, SetStateAction} from "react";

export default function WelcomeScreen({setState} : {setState :  Dispatch<SetStateAction<number>>}) {
    const onBeginClick = () => {
        establishAudioContext()
        instantiateInstrument("acoustic_grand_piano")
        setState(1)
    }
    return (<div className={"flex flex-col gap-20"}>
        <LargeHeading/>
        <button onClick={onBeginClick} className={"text-center justify-center content-center flex flex-col hover:border-1 rounded-sm border-foreground/70 bg-foreground/10 gap-2 mx-20"}>
            <img src={"perspective-piano.png"} alt={"pixel art of a piano"} className={"mx-2"}/>
            <p className={"raleway-text-regular w-full bg-foreground/30 text-sm p-0.5"}>Begin</p>
        </button >
    </div>)
}