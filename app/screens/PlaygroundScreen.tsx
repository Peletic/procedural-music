import TestPlayAudio from "@/components/TestPlayAudio";
import SheetComponent from "@/components/SheetComponent";
import BPMInputField from "@/components/BPMInputField";
import {useEffect, useState} from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import {DefaultMusicGeneratorArgs, MusicGenerator} from "@/src/generation/generator";
import RegenerateButton from "@/components/RegenerateButton";
import FillChordsButton from "@/components/FillChordsButton";
import ArpeggiateButton from "@/components/ArpeggiateButton";
import ScalesButton from "@/components/ScalesButton";
import ProgressionButton from "@/components/ProgressionButton";
import TCPButton from "@/trashcan/TCPButton";
import Stave from "@/src/units/stave";
import ConfigSection from "@/components/config/ConfigSection";

export default function PlaygroundScreen() {
    const [stave, setStave] = useState<Stave>(new Stave(120))

    useEffect(() => {
        setStave(new MusicGenerator(new DefaultMusicGeneratorArgs()).generate(120))
    }, [])

    const [opt, setOpts] = useState({var: {value: false, title: "booleans"}})

    return (<>
        <div
            className={"text-black w-full min-h-full flex flex-col-reverse md:flex-row content-center justify-between align-middle pt-7 mt-4 gap-12 md:text-normal"}>
            <div className={"flex mp-2 md:p-0 flex-col justify-between w-full relative md:max-w-[30em] text-lg"}>
                <div
                    className={"p-2 md:p-0 flex flex-col w-full md:max-w-[30em] align-middle gap-4"}>
                    <TestPlayAudio stave={stave}/>
                    <div className={"flex flex-col"}>
                    <ConfigSection config={opt} setConfig={setOpts}>Test</ConfigSection>
                    </div>
                    {/*<BPMInputField stave={stave} setStave={setStave}/>
                    <RegenerateButton setStave={setStave}/>
                    <FillChordsButton setStave={setStave}/>
                    <ArpeggiateButton setStave={setStave}/>
                    <ScalesButton setStave={setStave}/>
                    <ProgressionButton setStave={setStave}/>
                    <TCPButton setStave={setStave}/>*/}
                </div>
                <div>
                    <DarkModeToggle/>
                </div>
            </div>
            <br/>
            <SheetComponent stave={stave}/>
        </div>
    </>)
}