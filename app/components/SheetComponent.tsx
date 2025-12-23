import Stave from "@/src/units/stave";
import MeasureComponent from "@/app/components/MeasureComponent";

export default function SheetComponent({stave} : {stave : Stave}) {
    return (<div className={"bg-white min-h-[50em] h-[50em] flex flex-row p-7 flex-wrap place-content-start gap-y-16 w-[32em] md:w-[40em] shadow-md shadow-foreground/50 dark:shadow-none"}>
        {
            stave.measures.map((measure, index) => <MeasureComponent value={measure} key={`${measure}:${index}`} last={index === stave.measures.length - 1}/>)
        }
    </div>)
}