import {Dispatch} from "react";
import { Switch } from "@/components/ui/switch"

export default function BooleanConfigField({value, setValue, title} : {value: boolean, setValue: Dispatch<boolean>, title: string}) {
    return (<div className={"flex flex-col"}>
        <label htmlFor={`${title}:bool`}>{title}</label>
        <Switch name={title} onCheckedChange={(newState) => setValue(newState)} defaultChecked={value}/>
    </div>)
}