import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function DarkModeToggle() {
    const {theme, setTheme} = useTheme()

    const [mounted, setMounted] = useState(false);
    // https://medium.com/@annasaaddev/creating-a-sleek-dark-mode-toggle-in-next-js-with-tailwind-css-edb314b6bf05
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (<button onClick={(e) => {
        console.log(theme)
        setTheme(theme === "light" ? "dark" : "light")
    }} className={"bg-foreground/20 w-10 h-10 rounded-full align-middle justify-center flex transition-all"}>
        {theme === "light" ? <img src={"/moon.svg"} width={26} height={26}/> : <img src={"/sun.svg"} width={26} height={26}/>}
    </button>)
}