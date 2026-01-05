import {useState} from "react";

export default function DarkModeToggle() {

    const checkTheme = () => {
        return !document.documentElement.classList.contains("dark");

    };
    const [isLight, setIsLight] = useState(checkTheme);
    return (<button onClick={() => {
        document.documentElement.classList.toggle(
            "dark"
        );
        setIsLight(checkTheme)
    }} className={"w-10 h-10 rounded-full align-middle justify-center flex bg-purple-300 dark:bg-yellow-200"}>
        {isLight ? <img src={"/moon.svg"} width={26} height={26}/> : <img src={"/sun.svg"} width={26} height={26}/>}
    </button>)
}