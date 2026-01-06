import {Dispatch} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


export default function NumberConfigField({value, setValue, title}: {
    value: number,
    setValue: Dispatch<number>,
    title?: string
}) {
    return (<div className={"flex flex-col gap-2 align-middle border p-2 max-w-[15em] w-full h-20"}>
        {
            title ?
            <Label className={"font-light text-xs"}>{title}</Label> : undefined
        }
        <Input type={"number"} value={value}
               onChange={(inputEvent) => setValue(inputEvent.currentTarget.valueAsNumber)}/>
    </div>)
}