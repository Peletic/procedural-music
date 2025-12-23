import {useEffect, useState} from "react";

export default function DarkModeToggle() {

    const checkTheme = () => {
        if (document.documentElement.classList.contains("dark")) {
            return false;
        }
        return true;
    };
    const [isLight, setIsLight] = useState(checkTheme);
    return (<button onClick={(e) => {
        document.documentElement.classList.toggle(
            "dark"
        );
        setIsLight(checkTheme)
    }} className={"w-10 h-10 rounded-full align-middle justify-center flex bg-purple-300"}>
        {isLight ? <img src={"/moon.svg"} width={26} height={26}/> : <img src={"/sun.svg"} width={26} height={26}/>}
    </button>)
}