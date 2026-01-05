import {Dispatch} from "react";
import BooleanConfigField from "@/components/config/BooleanConfigField";

export default function ConfigField({entry, setEntry, title} : {entry: any, setEntry: Dispatch<any>, title: string}) {
    switch (typeof entry) {
        case "boolean":
            return (<>
                <BooleanConfigField key={`${title}:${entry}`} value={entry} setValue={setEntry} title={title}/>
            </>)
    }
    return (<>

        </>)
}