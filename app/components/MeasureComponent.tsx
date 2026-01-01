import {ElementPosition, Measure} from "@/src/units/measure";
import NoteComponent from "@/app/components/NoteComponent";
import {Note} from "@/src/units/note";

export default function MeasureComponent({value, idxN, last}: { value: Measure, idxN: number, last?: boolean }) {
    // 310 x 48
    const width = 12.5 + (last ? 1.7 : 0)
    return (<div className={"bg-white h-[7.3em] border-black flex flex-col-reverse justify-between"}
                 style={{width: `${width}em`, borderRight: `${(idxN + 1) % 3 == 0 ? "2px" : "0px"} solid black`}}>
        <div className={"h-[3em]"}>
            <img className={"absolute h-[3em] border-r-[2px] border-black"} style={{width: `${12.5}em`}}
                 src={"staff.svg"}/>
            {last ? <img className={"absolute h-[3em] border-r-[2px] border-black ml-[6.7em]"} style={{width: `${6}em`}}
                         src={"staff-end.svg"}/> : null}
        </div>
        <div className={"h-[3em]"}>
            <img className={"absolute h-[3em] border-r-[2px] border-black"} style={{width: `${12.5}em`}}
                 src={"staff.svg"}/>
            {last ? <img className={"absolute h-[3em] border-r-[2px] border-black ml-[6.7em]"} style={{width: `${6}em`}}
                         src={"staff-end.svg"}/> : null}
            {Object.entries(value.collection).map(([pos, notes]) => notes.map((el) => <NoteComponent note={el as Note}
                                                                                                     pos={pos as ElementPosition}
                                                                                                     key={`${(el as Note).note}::${pos}::${(el as Note).duration}`}/>))}
        </div>

    </div>)
}