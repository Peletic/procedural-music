export default function Clefs({}) {
    return (<div className={"h-[116.8px] flex flex-col justify-between border-l-2 border-black"}>
    <img className={"absolute h-[116.8px] left-3.5"} src={"/staff-start.svg"} height={"116.8px"} width={"30px"}/>
        <div className={"h-[48px] w-[49.6px]"}>
            <img className={"absolute border-black object-fill"} style={{width: `49.6px`, height: `48px`}}
                 src={"staff.svg"} width={"49.6px"} height={"48px"}/>
            <img className={"h-[80px] mt-[-0.95em] ml-[0.1em]"} src={"/treble_clef.svg"}/>
        </div>

        <div className={"h-[48px] w-[49.6px]"}>
            <img className={"absolute border-black object-fill"} style={{width: `49.6px`, height: `48px`}}
                 src={"staff.svg"} width={"49.6px"} height={"48px"}/>
            <img className={"h-[40px] ml-[0.1em]"} src={"/bass_clef.svg"}/>
        </div>
    </div>)
}