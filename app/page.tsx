'use client'
import WelcomeScreen from "@/app/screens/WelcomeScreen";
import {useState} from "react";
import PlaygroundScreen from "@/app/screens/PlaygroundScreen";

export default function Home() {
    const [pageState, setPageState] = useState(0)
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-blue-50 dark:bg-black text-black dark:text-purple-100">
            <main>
                {pageState === 0 ?
                    <WelcomeScreen setState={setPageState}/>
                    :
                    <PlaygroundScreen/>
                }
            </main>
        </div>
    );
}
