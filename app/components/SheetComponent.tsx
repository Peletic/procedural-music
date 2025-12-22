import Stave from "@/src/units/stave";
import MeasureComponent from "@/app/components/MeasureComponent";

export default function SheetComponent({stave} : {stave : Stave}) {
    return (<div className={"bg-white w-[40em] min-h-[50em] h-[50em] flex flex-row p-7 flex-wrap place-content-start gap-y-16"}>
        {
            stave.measures.map((measure, index) => <MeasureComponent value={measure} key={`${measure}:${index}`}/>)
        }
    </div>)
}