import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import ConfigField from "@/components/config/ConfigField";

export default function ConfigSection({config, setConfig, children} : {config: { [p : string] : any }, setConfig: Dispatch<SetStateAction<any>>, children : React.ReactNode}) {
    return (<div className={"text-foreground raleway-text-regular h-fit bg-accent flex flex-col w-auto justify-items-center items-center rounded-xl"}>
        <div className={"text-xl dm-serif-text-regular pt-2 content-center w-auto text-center"}>
            {children}
        </div>
        <div className={"raleway-text-light text-sm inline-flex flex-wrap justify-items-center items-center justify-center w-auto py-4 gap-4"}>
            {
                Object.entries(config).map(([key, val]) => {
                    const [state, setState] = useState(val.value)
                    useEffect(() => {
                        const newCfg = Object.assign({}, config)
                        newCfg[key].value = state
                        setConfig(newCfg)
                    }, [state])

                    return (<ConfigField key={`${val}:${key}`} entry={state} setEntry={setState} title={val.title}/>)
                })
            }
        </div>
    </div>)
}