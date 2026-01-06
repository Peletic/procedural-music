export default function Clefs({}) {
    return (<div className={"h-[7.3em] flex flex-col justify-between border-l-2 border-black"}>
    <img className={"absolute h-[7.3em] left-3.5"} src={"/staff-start.svg"} height={"116.8px"} width={"30px"}/>
        <div className={"h-[3em] w-[3.1em]"}>
            <img className={"absolute border-black object-fill"} style={{width: `${3.1}em`, height: `${3}em`}}
                 src={"staff.svg"} width={"49.6px"} height={"48px"}/>
            <img className={"h-[5em] mt-[-0.95em] ml-[0.1em]"} src={"/treble_clef.svg"}/>
        </div>

        <div className={"h-[3em] w-[3.1em]"}>
            <img className={"absolute border-black object-fill"} style={{width: `${3.1}em`, height: `${3}em`}}
                 src={"staff.svg"} width={"49.6px"} height={"48px"}/>
            <img className={"h-[2.5em] ml-[0.1em]"} src={"/bass_clef.svg"}/>
        </div>
    </div>)
}