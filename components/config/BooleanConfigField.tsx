import {Dispatch} from "react";
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label";


export default function BooleanConfigField({value, setValue, title}: {
    value: boolean,
    setValue: Dispatch<boolean>,
    title?: string
}) {
    return (<div className={""}>

        <Switch className={"h-5"} name={title} onCheckedChange={(newState) => setValue(newState)}
                defaultChecked={value}/>
    </div>)
}