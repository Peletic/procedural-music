import {ElementPosition, Measure} from "@/src/units/measure";
import NoteComponent from "@/app/components/NoteComponent";
import {Note} from "@/src/units/note";

export default function MeasureComponent({value} : {value : Measure}) {
    // 310 x 48
    return (<div className={"bg-white w-[12em] h-[3em] border-r-[2px] border-black"}>
        <img className={"absolute w-[12em] h-[3em]"} src={"staff.svg"}/>
        {Object.entries(value.collection).map(([pos, notes]) => notes.map((el)=> <NoteComponent note={el as Note} pos={pos as ElementPosition} key={`${(el as Note).note}::${pos}`}/>))}
    </div>)
}