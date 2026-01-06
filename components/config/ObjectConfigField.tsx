import {Dispatch, useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import ConfigField from "@/components/config/ConfigField";


export default function ObjectConfigField({value, setValue, title} : {value: { [p : string | number | symbol] : any }, setValue: Dispatch<any>, title?: string}) {
    return (<div className={"flex flex-col gap-2 items-center align-middle p-2 w-fit border rounded justify-between"}>
        <Label className={"font-light w-auto max-w-24 text-center text-xs mx-auto pb-2"}>{title}</Label>
        <div className={"inline-flex flex-wrap mt-[-0.5em] justify-center gap-2"}>
        { Object.entries(value).map(([key, val], idx) => {
            const [state, setState] = useState(val)
            useEffect(() => {
                const newValue = Object.assign({}, value)
                newValue[key] = state
                setValue(newValue)
            }, [state])
            return (<ConfigField key={`${title}:${val}:${idx}`} entry={state} title={val["title"] ? val["title"] : key} setEntry={setState}/>)
        })}
        </div>
    </div>)
}