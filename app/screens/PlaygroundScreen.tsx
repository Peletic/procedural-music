import TestPlayAudio from "@/components/TestPlayAudio";
import SheetComponent from "@/components/SheetComponent";
import {useEffect, useState} from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import {DefaultMusicGeneratorArgs, MusicGenerator, MusicGeneratorArgs} from "@/src/generation/generator";
import Stave from "@/src/units/stave";
import ConfigSection from "@/components/config/ConfigSection";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RegenerateButton from "@/components/RegenerateButton";
import {opts} from "@/src/helpers/log";
import ReseedButton from "@/components/ReseedButton";

export default function PlaygroundScreen() {
    const [stave, setStave] = useState<Stave>(new Stave(120))

    useEffect(() => {
        setStave(new MusicGenerator(new DefaultMusicGeneratorArgs()).generate(120))
    }, [])

    const [generatorSettings, setGeneratorSettings] = useState<MusicGeneratorArgs>(new DefaultMusicGeneratorArgs())
    const [opt, setOpts] = useState({opts})

    return (<>
        <div
            className={"text-black w-auto min-h-[100vh] flex flex-col-reverse md:flex-row content-center justify-between align-middle pt-7 mt-4 gap-12 md:text-normal"}>
            <div className={"flex mp-2 md:p-0 flex-col justify-between w-auto relative md:max-w-[30em] text-lg"}>
                <div
                    className={"p-2 md:p-0 flex flex-col-reverse w-auto min-w-[30em] md:max-w-[50em] align-middle gap-4"}>
                    <div className={"h-fit w-auto"}>
                        <Tabs defaultValue={"generator"} className={"flex items-center w-auto justify-center"}>
                            <TabsList className={"min-h-fit raleway-text-light"}>
                                <TabsTrigger value={"generator"}>Generator</TabsTrigger>
                                <TabsTrigger value={"debug"}>Debug</TabsTrigger>
                            </TabsList>
                            <TabsContent value={"generator"}>
                                <ConfigSection config={generatorSettings} setConfig={setGeneratorSettings}>Generator Settings</ConfigSection>
                            </TabsContent>
                            <TabsContent value={"debug"}>
                                <ConfigSection config={opt} setConfig={(res) => setOpts({...res})}>Debug</ConfigSection>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className={"flex flex-row justify-center gap-12 w-auto pb-4"}>
                        <TestPlayAudio stave={stave}/>
                        <RegenerateButton setStave={setStave} opts={generatorSettings}/>
                        <ReseedButton cfg={generatorSettings} setCfg={setGeneratorSettings}/>
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