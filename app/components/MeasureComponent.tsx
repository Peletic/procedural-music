import {ElementPosition, Measure} from "@/src/units/measure";
import NoteComponent from "@/app/components/NoteComponent";
import {Note} from "@/src/units/note";

export default function MeasureComponent({value, last} : {value : Measure, last?: boolean}) {
    // 310 x 48
    const width = 12 + (last ? 1.7 : 0)
    return (<div className={"bg-white h-[3em] border-l-[2px] border-black"} style={{width: `${width}em`}}>
        <img className={"absolute h-[3em] border-r-[2px] border-black"} style={{width: `${12}em`}} src={"staff.svg"}/>
        {last ? <img className={"absolute h-[3em] border-r-[2px] border-black ml-[6.7em]"} style={{width: `${6}em`}} src={"staff-end.svg"}/> : null}
        {Object.entries(value.collection).map(([pos, notes]) => notes.map((el)=> <NoteComponent note={el as Note} pos={pos as ElementPosition} key={`${(el as Note).note}::${pos}::${(el as Note).duration}`}/>))}
    </div>)
}