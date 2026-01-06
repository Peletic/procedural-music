import {Dispatch} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


export default function StringConfigField({value, setValue, title}: {
    value: string,
    setValue: Dispatch<string>,
    title?: string
}) {
    return (<div className={"flex flex-col gap-2 align-middle border p-2 max-w-[15em] w-auto h-20"}>
        {
            title ?
                <Label className={"font-light text-xs"}>{title}</Label> : undefined
        }
        <Input type={"text"} value={value}
               onChange={(inputEvent) => setValue(inputEvent.currentTarget.value)}/>
    </div>)
}