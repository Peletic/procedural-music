export default function Clefs({}) {
    return (<div className={"h-[116.8px] flex flex-col justify-between border-l-2 border-black"}>
        <div className={"w-[30px] h-[116.8px] absolute left-3.5"}>
            <img className={"absolute h-[116.8px] "} src={"/staff-start.svg"} height={"116.8px"} width={"30px"}/>
        </div>
        <div className={"h-[48px] w-[49.6px]"}>
            <img className={"absolute border-black object-fill"} style={{width: `49.6px`, height: `48px`}}
                 src={"staff.svg"} width={"49.6px"} height={"48px"}/>
            <div className={"h-[40px] w-[35px] absolute"}>
                <img className={"h-[80px] mt-[-0.95em] ml-[2.6px]"} src={"/treble_clef.svg"}/>
            </div>
        </div>

        <div className={"h-[48px] w-[49.6px]"}>
            <img className={"absolute border-black object-fill"} style={{width: `49.6px`, height: `48px`}}
                 src={"staff.svg"} width={"49.6px"} height={"48px"}/>
            <div className={"h-[40px] w-[40px] ml-[0.1em]"}>
                <img className={"h-[40px]"} src={"/bass_clef.svg"}/>
            </div>
        </div>
    </div>)
}