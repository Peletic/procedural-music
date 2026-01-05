import Stave from "@/src/units/stave";
import MeasureComponent from "@/components/MeasureComponent";
import Clefs from "@/components/Clefs";

export default function SheetComponent({stave}: { stave: Stave }) {
    return (<div
        className={"bg-white relative min-h-200 grid grid-cols-[3em_12em_12em_12em] p-7 flex-wrap place-content-start gap-y-16 mx-auto md:mx-0 w-[90vw] md:w-[43em] shadow-md shadow-foreground/50 dark:shadow-none overflow-visible"}>
        {
            (stave.measures.map((measure, index) => <MeasureComponent idxN={index} value={measure}
                                                                      key={`${measure}:${index}`}
                                                                      last={index === stave.measures.length - 1}/>)).flatMap((el, idx) => {
                if ((idx % 3 == 0)) {
                    return [<Clefs key={`clef::${idx}`}/>, el]
                } else {
                    return el
                }
            })
        }
    </div>)
}