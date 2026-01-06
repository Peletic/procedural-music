import {Dispatch, useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import ConfigField from "@/components/config/ConfigField";


export default function ArrayConfigField({value, setValue, title} : {value: any[], setValue: Dispatch<any[]>, title?: string}) {
    return (<div className={"flex flex-col justify-items-center w-auto"}>
        <Label className={"font-light"}>{title}</Label>
        { value.map((val, idx) => {
            const [state, setState] = useState(val)
            useEffect(() => {
                const newValue = [...value]
                newValue[idx] = val
                setValue(newValue)
            }, [state])
            return (<ConfigField key={`${title}:${val}:${idx}`} entry={state} setEntry={setState}/>)
        })}
    </div>)
}