import {ElementPosition, Measure} from "@/src/units/measure";
import NoteComponent from "@/components/NoteComponent";
import {Note} from "@/src/units/note";

export default function MeasureComponent({value, idxN, last}: { value: Measure, idxN: number, last?: boolean }) {
    // 310 x 48
    const width = 192 + (last ? 0 : 0)
    return (<div className={"h-[116.8px] border-black border-r-2 bg-none flex flex-col-reverse justify-between"}
                 style={{width: `${width}px`}}>
        <div className={"h-[48px] border-r-2 "}>
            <img className={"absolute h-[48px] border-r-2 object-fill border-black"} width={"192px"}
                 src={"staff.svg"} height={"48px"}/>
            {last &&
                <img className={"absolute h-[48px] object-fill ml-[107.2px]"} width={"96px"}
                     src={"staff-end.svg"} height={"48px"}/>}
        </div>
        <div className={"h-[48px]"}>
            <img className={"absolute h-[48px] border-r-2 border-black object-fill"} width={"192px"}
                 src={"staff.svg"} height={"48px"}/>
            {last &&
                <img className={"absolute h-[48px] object-fill ml-[107.2px]"} style={{
                    width: `96px`
                }} width={"96px"} src={"staff-end.svg"} height={"48px"}/>}
            {Object.entries(value.collection).map(([pos, notes]) => [...new Set(notes)].map((el) => <NoteComponent
                note={el as Note}
                pos={pos as ElementPosition}
                key={`${JSON.stringify(el)}::${pos}::${(el as Note).duration}::${idxN}::${Math.random() * 10}`}/>))}
        </div>

    </div>)
}