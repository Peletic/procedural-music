import React, {Dispatch, SetStateAction, useState} from "react";
import ConfigField from "@/components/config/ConfigField";

export default function ConfigSection({config, setConfig, children} : {config: Object, setConfig: Dispatch<SetStateAction<any>>, children : React.ReactNode}) {
    return (<div className={"text-foreground raleway-text-regular"}>
        <div className={"text-xl"}>
            {children}x
        </div>
        <div className={"raleway-text-light text-sm"}>
            {
                Object.entries(config).map(([key, val]) => {
                    // @ts-ignore
                    const [state, setState] = useState(val.value)
                    // @ts-ignore
                    return (<ConfigField key={`${val}:${key}`} entry={state} setEntry={setState} title={val.title}/>)
                })
            }
        </div>
    </div>)
}