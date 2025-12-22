'use client'
import * as Soundfont from "soundfont-player"
import {ElementPosition, Measure, Position} from "@/src/units/measure";
import {Note} from "@/src/units/note";
import {Beat} from "@/src/units/beat";
import {Pitch} from "@/src/units/pitch";
import Heading from "./components/Heading";
import WelcomeScreen from "@/app/components/WelcomeScreen";

export default function Home() {

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50 dark:bg-black text-black dark:text-purple-100">
            <main>
                <div>
                    <WelcomeScreen></WelcomeScreen>
                </div>
            </main>
        </div>
    );
}
