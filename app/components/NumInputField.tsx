import {FormEventHandler} from "react";

export default function NumInputField({name, onInput, baseValue}: {
    name: string,
    onInput: FormEventHandler<HTMLInputElement>,
    baseValue: number
}) {

    return (
        <div className={"text-foreground w-fit h-fit flex flex-col mx-2 justify-center align-middle content-center raleway-text-regular p-2 border-blue-400/20 border-[1px]"}>
            <p className={"text-xs"}>{name}</p>
            <input className={"max-w-16 w-12 border-blue-400/20 border-t-[1px] rounded-none text-base dm-serif-text-regular"}
                   type={"number"} onInput={onInput} value={`${baseValue}`}/>
        </div>)
}